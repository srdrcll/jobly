import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCompanyDetailQuery, useToggleCompanyFavoriteMutation } from '@/hooks/queries/useCompaniesQuery';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { 
  getApplicationsForCompany, 
  calculateCompanyMetrics, 
  extractCompanyTimeline, 
  extractCompanyContacts 
} from '@/utils/companyAnalyticsUtils';
import { CompanyProfileOverview } from '@/components/companies/CompanyProfileOverview';
import { CompanyProfileMetrics } from '@/components/companies/CompanyProfileMetrics';
import { CompanyProfileTimeline } from '@/components/companies/CompanyProfileTimeline';
import { CompanyProfileContacts } from '@/components/companies/CompanyProfileContacts';
import { CompanyProfileRelatedApps } from '@/components/companies/CompanyProfileRelatedApps';
import { CompanyProfileAttachments } from '@/components/companies/CompanyProfileAttachments';
import { EditCompanyModal } from '@/components/companies/EditCompanyModal';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { DbCompany } from '@/types';

export const CompanyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Queries & Mutations
  const { data: company, isLoading: isCompanyLoading, isError: isCompanyError, error: companyError, refetch: refetchCompany } = useCompanyDetailQuery(id);
  const { data: allApplications = [], isLoading: isAppsLoading } = useApplicationsListQuery();
  const toggleFavoriteMutation = useToggleCompanyFavoriteMutation();

  // Edit Modal State
  const [selectedEdit, setSelectedEdit] = useState<DbCompany | null>(null);

  // Compute Company Applications & Relationship Analytics
  const companyApplications = useMemo(() => {
    if (!company) return [];
    return getApplicationsForCompany(company, allApplications);
  }, [company, allApplications]);

  const metrics = useMemo(() => calculateCompanyMetrics(companyApplications), [companyApplications]);
  const timelineEvents = useMemo(() => extractCompanyTimeline(companyApplications), [companyApplications]);
  const contacts = useMemo(() => (company ? extractCompanyContacts(company) : []), [company]);

  // Loading Skeleton State
  if (isCompanyLoading || isAppsLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto p-4 animate-pulse">
        <div className="h-8 w-48 bg-slate-800 rounded-xl" />
        <div className="h-44 bg-slate-800/50 rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  // Error State
  if (isCompanyError || !company) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center space-y-4">
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-rose-200">Şirket Profili Yüklenemedi</h3>
            <p className="text-xs text-rose-300/80">
              {companyError?.message || 'İstenen şirket kaydı bulunamadı veya silinmiş olabilir.'}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              onClick={() => navigate('/companies')}
            >
              Listeye Dön
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={() => refetchCompany()}
            >
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-6xl mx-auto">
      {/* Section 1: Company Profile Overview */}
      <CompanyProfileOverview
        company={company}
        onEdit={(comp) => setSelectedEdit(comp)}
        onToggleFavorite={(compId, status) => toggleFavoriteMutation.mutate({ id: compId, currentStatus: status })}
      />

      {/* Section 2: Application Relationship Statistics */}
      <CompanyProfileMetrics metrics={metrics} />

      {/* Section 3: 2-Column Grid for Timeline & Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompanyProfileTimeline timelineEvents={timelineEvents} />
        <CompanyProfileContacts contacts={contacts} />
      </div>

      {/* Section 4: Related Applications List */}
      <CompanyProfileRelatedApps applications={companyApplications} />

      {/* Section 5: Attachments & Document Infrastructure */}
      <CompanyProfileAttachments companyName={company.name} />

      {/* Edit Modal */}
      <EditCompanyModal
        company={selectedEdit}
        isOpen={Boolean(selectedEdit)}
        onClose={() => setSelectedEdit(null)}
      />
    </div>
  );
};

export default CompanyDetailPage;
