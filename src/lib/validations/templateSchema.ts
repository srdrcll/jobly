import { z } from 'zod';

export const templateCategoryEnum = z.enum([
  'CV / Özgeçmiş',
  'Ön Mektup',
  'Mülakat Takip',
  'E-posta',
]);

export const templateSchema = z.object({
  title: z
    .string({ required_error: 'Şablon başlığı zorunludur.' })
    .min(1, 'Başlık boş bırakılamaz.')
    .max(120, 'Başlık en fazla 120 karakter olabilir.'),
  category: templateCategoryEnum,
  description: z.string().max(300).nullable().optional(),
  content: z.string().nullable().optional(),
  usage_count: z.number().int().nonnegative().default(0),
  tags: z.array(z.string()).default([]),
});

export type TemplateFormValues = z.infer<typeof templateSchema>;
