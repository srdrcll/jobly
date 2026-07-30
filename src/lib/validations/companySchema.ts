import { z } from 'zod';

export const companyStatusEnum = z.enum([
  'Target',
  'Applied',
  'Interviewed',
  'Offer',
  'Archived',
  'Researching',
  'Contacted',
]);

export type CompanyStatus = z.infer<typeof companyStatusEnum>;

export const companySchema = z.object({
  name: z.string().min(2, 'Şirket adı en az 2 karakter olmalıdır'),
  industry: z.string().optional().nullable(),
  website: z.string().url('Geçerli bir web sitesi URL’si giriniz').or(z.literal('')).optional().nullable(),
  location: z.string().optional().nullable(),
  company_size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).or(z.literal('')).optional().nullable(),
  contact_person: z.string().optional().nullable(),
  contact_email: z.string().email('Geçerli bir e-posta adresi giriniz').or(z.literal('')).optional().nullable(),
  contact_phone: z.string().optional().nullable(),
  linkedin_url: z.string().url('Geçerli bir LinkedIn URL’si giriniz').or(z.literal('')).optional().nullable(),
  career_page_url: z.string().url('Geçerli bir Kariyer Sayfası URL’si giriniz').or(z.literal('')).optional().nullable(),
  notes: z.string().optional().nullable(),
  status: companyStatusEnum.default('Target'),
  rating: z.number().min(1).max(5).optional().nullable(),
  is_favorite: z.boolean().default(false),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
