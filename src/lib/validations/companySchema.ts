import { z } from 'zod';

export const companyStatusEnum = z.enum([
  'Target',
  'Researching',
  'Applied',
  'Contacted',
]);

export const companySchema = z.object({
  name: z
    .string({ required_error: 'Şirket adı zorunludur.' })
    .min(1, 'Şirket adı boş bırakılamaz.')
    .max(100, 'Şirket adı en fazla 100 karakter olabilir.'),
  industry: z.string().max(80).nullable().optional(),
  location: z.string().max(100).nullable().optional(),
  rating: z
    .number()
    .min(0, 'Puan 0\'dan küçük olamaz.')
    .max(5, 'Puan 5\'ten büyük olamaz.')
    .nullable()
    .optional(),
  open_positions_count: z.number().int().nonnegative().default(0),
  status: companyStatusEnum.default('Target'),
  website: z.string().url('Geçerli bir web adresi girin.').or(z.literal('')).nullable().optional(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
