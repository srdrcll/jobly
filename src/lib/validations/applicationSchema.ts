import { z } from 'zod';

export const applicationStatusEnum = z.enum([
  'saved',
  'applied',
  'interview',
  'case_study',
  'offer',
  'rejected',
]);

export const workTypeEnum = z.enum(['Remote', 'Hybrid', 'On-site']);

export const applicationSchema = z.object({
  company_name: z
    .string({ required_error: 'Şirket adı zorunludur.' })
    .min(1, 'Şirket adı boş bırakılamaz.')
    .max(100, 'Şirket adı en fazla 100 karakter olabilir.'),
  position: z
    .string({ required_error: 'Pozisyon ünvanı zorunludur.' })
    .min(1, 'Pozisyon ünvanı boş bırakılamaz.')
    .max(120, 'Pozisyon ünvanı en fazla 120 karakter olabilir.'),
  company_id: z.string().uuid().nullable().optional(),
  location: z.string().max(100, 'Konum en fazla 100 karakter olabilir.').nullable().optional(),
  work_type: workTypeEnum.nullable().optional(),
  salary: z.string().max(80, 'Maaş bilgisi en fazla 80 karakter olabilir.').nullable().optional(),
  status: applicationStatusEnum.default('applied'),
  applied_date: z.string().nullable().optional(),
  notes_count: z.number().int().nonnegative().default(0),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
