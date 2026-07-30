import React, { useState } from 'react';
import { User, Mail, Phone, Linkedin, Search } from 'lucide-react';
import { CompanyContact } from '@/utils/companyAnalyticsUtils';
import { Input } from '@/components/ui/Input';

interface CompanyProfileContactsProps {
  contacts: CompanyContact[];
}

export const CompanyProfileContacts: React.FC<CompanyProfileContactsProps> = ({ contacts }) => {
  const [search, setSearch] = useState('');

  const filteredContacts = contacts.filter((c) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      c.name.toLowerCase().includes(q) ||
      (c.position && c.position.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
  });

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">İletişim Kişileri (Contacts)</h3>
            <p className="text-xs text-slate-400">İK yöneticileri ve teknik yönlendirici kişileri</p>
          </div>
        </div>

        {contacts.length > 0 && (
          <div className="w-full sm:w-64">
            <Input
              placeholder="İletişim kişisi ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>
        )}
      </div>

      {filteredContacts.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-1">
          <p className="text-xs font-bold text-slate-400">Kayıtlı İletişim Kişisi Bulunmuyor</p>
          <p className="text-[11px] text-slate-500">Şirket düzenleme formundan İK yetkilisi ekleyebilirsiniz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-xs">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{contact.name}</h4>
                  <p className="text-[11px] text-slate-400">{contact.position || 'İK Temsilcisi'}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 space-y-1 text-xs">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 text-indigo-400 hover:underline">
                    <Mail className="w-3.5 h-3.5" />
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 text-slate-300 hover:underline">
                    <Phone className="w-3.5 h-3.5 text-purple-400" />
                    {contact.phone}
                  </a>
                )}
                {contact.linkedinUrl && (
                  <a
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-indigo-400 hover:underline"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn Profili
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
