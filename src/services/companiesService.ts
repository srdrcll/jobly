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
      industry: validated.industry ?? null,
      location: validated.location ?? null,
      rating: validated.rating ?? null,
      open_positions_count: validated.open_positions_count ?? 0,
      status: validated.status ?? 'Target',
      website: validated.website || null,
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
};
