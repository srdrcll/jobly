import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Star, 
  ExternalLink, 
  MapPin, 
  Globe, 
  Briefcase 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/Button';
import { CompanyItem } from '@/types';

const MOCK_COMPANIES: CompanyItem[] = [
  {
    id: 'c-1',
    name: 'Trendyol',
    industry: 'E-Ticaret & FinTech',
    location: 'İstanbul, Türkiye',
    rating: 4.8,
    openPositionsCount: 14,
    status: 'Applied',
    website: 'https://trendyol.com',
  },
  {
    id: 'c-2',
    name: 'Getir',
    industry: 'Hızlı Teslimat & Teknoloji',
    location: 'İstanbul / Amsterdam',
    rating: 4.6,
    openPositionsCount: 8,
    status: 'Contacted',
    website: 'https://getir.com',
  },
  {
    id: 'c-3',
    name: 'Stripe',
    industry: 'Finansal Altyapı',
    location: 'San Francisco / Remote',
    rating: 4.9,
    openPositionsCount: 22,
    status: 'Researching',
    website: 'https://stripe.com',
  },
  {
    id: 'c-4',
    name: 'Vercel',
    industry: 'Bulut Bilişim & Developer Tools',
    location: 'San Francisco / Global Remote',
    rating: 4.9,
    openPositionsCount: 6,
    status: 'Target',
    website: 'https://vercel.com',
  },
  {
    id: 'c-5',
    name: 'Insider',
    industry: 'Yapay Zeka & Pazarlama Teknoloji',
    location: 'İstanbul / Singapore',
    rating: 4.7,
    openPositionsCount: 11,
    status: 'Applied',
    website: 'https://useinsider.com',
  },
  {
    id: 'c-6',
    name: 'Linear',
    industry: 'Yazılım & Ürün Yönetimi',
    location: 'San Francisco / Remote',
    rating: 5.0,
    openPositionsCount: 4,
    status: 'Target',
    website: 'https://linear.app',
  },
];

export const CompaniesPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredCompanies = MOCK_COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        title="Şirketler"
        description="Hedeflediğiniz teknoloji şirketleri, kültür puanları ve açık pozisyon takibi."
        icon={Building2}
        badge={`${MOCK_COMPANIES.length} Hedef Şirket`}
        actionSlot={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}>
            Hedef Şirket Ekle
          </Button>
        }
      />

      <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-soft">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Şirket veya sektör ara..."
          />
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {filteredCompanies.length} şirket gösteriliyor
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-xl flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                      {company.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium block">
                      {company.industry}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" aria-hidden="true" />
                  <span>{company.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
                  <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{company.openPositionsCount} Açık Pozisyon</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 font-medium transition-colors"
              >
                <Globe className="w-3.5 h-3.5" aria-hidden="true" /> Website <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>

              <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {company.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
