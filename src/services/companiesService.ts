import { companiesRepository } from '@/repositories/companiesRepository';
import { companySchema, CompanyFormValues } from '@/lib/validations/companySchema';
import { DbCompany, DbCompanyUpdate } from '@/types';
import { AppError } from '@/lib/errors';

export const companiesService = {
  async fetchCompanies(): Promise<DbCompany[]> {
    return await companiesRepository.getAll();
  },

  async fetchCompanyById(id: string): Promise<DbCompany | null> {
    if (!id) throw new AppError('Geçersiz şirket kimliği.');
    return await companiesRepository.getById(id);
  },

  async createCompany(userId: string, values: CompanyFormValues): Promise<DbCompany> {
    const validated = companySchema.parse(values);

    return await companiesRepository.create({
      user_id: userId,
      name: validated.name,
      industry: validated.industry || null,
      location: validated.location || null,
      rating: validated.rating || null,
      open_positions_count: 0,
      status: validated.status || 'Target',
      website: validated.website || null,
      company_size: validated.company_size || null,
      contact_person: validated.contact_person || null,
      contact_email: validated.contact_email || null,
      contact_phone: validated.contact_phone || null,
      linkedin_url: validated.linkedin_url || null,
      career_page_url: validated.career_page_url || null,
      notes: validated.notes || null,
      is_favorite: validated.is_favorite ?? false,
    });
  },

  async updateCompany(id: string, payload: DbCompanyUpdate): Promise<DbCompany> {
    if (!id) throw new AppError('Güncellenecek şirket seçilmedi.');
    return await companiesRepository.update(id, payload);
  },

  async deleteCompany(id: string): Promise<void> {
    if (!id) throw new AppError('Silinecek şirket seçilmedi.');
    await companiesRepository.delete(id);
  },

  async toggleFavorite(id: string, currentStatus: boolean): Promise<DbCompany> {
    if (!id) throw new AppError('Şirket kimliği bulunamadı.');
    return await companiesRepository.update(id, { is_favorite: !currentStatus });
  },
};
