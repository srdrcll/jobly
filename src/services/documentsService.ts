import { documentsRepository } from '@/repositories/documentsRepository';
import { documentSchema, DocumentFormValues } from '@/lib/validations/documentSchema';
import { DbDocument, DbDocumentUpdate } from '@/types';
import { AppError } from '@/lib/errors';

export const documentsService = {
  async fetchDocuments(): Promise<DbDocument[]> {
    return await documentsRepository.getAll();
  },

  async fetchDocumentsByApplication(applicationId: string): Promise<DbDocument[]> {
    if (!applicationId) throw new AppError('Geçersiz başvuru kimliği.');
    return await documentsRepository.getByApplicationId(applicationId);
  },

  async createDocument(userId: string, values: DocumentFormValues): Promise<DbDocument> {
    const validated = documentSchema.parse(values);

    return await documentsRepository.create({
      user_id: userId,
      application_id: validated.application_id ?? null,
      title: validated.title,
      file_path: validated.file_path,
      file_size: validated.file_size ?? null,
      file_type: validated.file_type ?? null,
    });
  },

  async updateDocument(id: string, payload: DbDocumentUpdate): Promise<DbDocument> {
    if (!id) throw new AppError('Güncellenecek belge seçilmedi.');
    return await documentsRepository.update(id, payload);
  },

  async deleteDocument(id: string): Promise<void> {
    if (!id) throw new AppError('Silinecek belge seçilmedi.');
    await documentsRepository.delete(id);
  },
};
