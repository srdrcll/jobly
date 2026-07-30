import { templatesRepository } from '@/repositories/templatesRepository';
import { templateSchema, TemplateFormValues } from '@/lib/validations/templateSchema';
import { DbTemplate, DbTemplateUpdate } from '@/types';
import { AppError } from '@/lib/errors';

export const templatesService = {
  async fetchTemplates(): Promise<DbTemplate[]> {
    return await templatesRepository.getAll();
  },

  async fetchTemplateById(id: string): Promise<DbTemplate | null> {
    if (!id) throw new AppError('Geçersiz şablon kimliği.');
    return await templatesRepository.getById(id);
  },

  async createTemplate(userId: string, values: TemplateFormValues): Promise<DbTemplate> {
    const validated = templateSchema.parse(values);

    return await templatesRepository.create({
      user_id: userId,
      title: validated.title,
      category: validated.category,
      description: validated.description ?? null,
      content: validated.content ?? null,
      usage_count: validated.usage_count ?? 0,
      tags: validated.tags ?? [],
    });
  },

  async updateTemplate(id: string, payload: DbTemplateUpdate): Promise<DbTemplate> {
    if (!id) throw new AppError('Güncellenecek şablon seçilmedi.');
    return await templatesRepository.update(id, payload);
  },

  async deleteTemplate(id: string): Promise<void> {
    if (!id) throw new AppError('Silinecek şablon seçilmedi.');
    await templatesRepository.delete(id);
  },
};
