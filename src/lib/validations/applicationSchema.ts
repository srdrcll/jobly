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

export const priorityEnum = z.enum(['Düşük', 'Orta', 'Yüksek', 'Kritik']);

export const TARGET_ROLE_OPTIONS = [
  'Business Analyst Intern',
  'Project Management Intern',
  'Digital Transformation Intern',
  'Product Intern',
  'Software Intern',
  'Business Analyst',
  'Project Manager',
  'Product Owner',
  'Software Engineer',
  'Diğer',
] as const;

export const applicationSchema = z.object({
  company_name: z
    .string({ required_error: 'Şirket adı zorunludur.' })
    .min(1, 'Şirket adı boş bırakılamaz.')
    .max(100, 'Şirket adı en fazla 100 karakter olabilir.'),
  position: z
    .string({ required_error: 'Pozisyon ünvanı zorunludur.' })
    .min(1, 'Pozisyon ünvanı boş bırakılamaz.')
    .max(120, 'Pozisyon ünvanı en fazla 120 karakter olabilir.'),
  target_role: z
    .string({ required_error: 'Hedef rol seçimi zorunludur.' })
    .min(1, 'Hedef rol seçimi zorunludur.'),
  status: applicationStatusEnum.default('applied'),
  company_id: z.string().uuid().nullable().optional(),
  location: z.string().max(100, 'Konum en fazla 100 karakter olabilir.').nullable().optional(),
  work_type: workTypeEnum.nullable().optional(),
  salary: z.string().max(80, 'Maaş bilgisi en fazla 80 karakter olabilir.').nullable().optional(),
  applied_date: z.string().nullable().optional(),
  job_url: z
    .string()
    .url('Geçerli bir web adresi (URL) giriniz.')
    .or(z.literal(''))
    .nullable()
    .optional(),
  contact_name: z.string().max(100).nullable().optional(),
  contact_email: z
    .string()
    .email('Geçerli bir e-posta adresi giriniz.')
    .or(z.literal(''))
    .nullable()
    .optional(),
  priority: priorityEnum.default('Orta').optional(),
  notes: z.string().max(1000, 'Notlar en fazla 1000 karakter olabilir.').nullable().optional(),
  notes_count: z.number().int().nonnegative().default(0),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
