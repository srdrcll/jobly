import { z } from 'zod';

export const documentSchema = z.object({
  application_id: z.string().uuid().nullable().optional(),
  title: z
    .string({ required_error: 'Belge başlığı zorunludur.' })
    .min(1, 'Başlık boş bırakılamaz.')
    .max(120, 'Başlık en fazla 120 karakter olabilir.'),
  file_path: z.string({ required_error: 'Dosya yolu zorunludur.' }).min(1),
  file_size: z.number().int().positive().nullable().optional(),
  file_type: z.string().nullable().optional(),
});

export type DocumentFormValues = z.infer<typeof documentSchema>;
