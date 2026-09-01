import { z } from 'zod';

export const interviewTypeEnum = z.enum(['Online', 'On-site', 'Phone', 'Hybrid']);
export const interviewResultEnum = z.enum(['Pending', 'Passed', 'Failed', 'Offer']);

export const interviewSchema = z.object({
  application_id: z.string().optional().nullable(),
  company_name: z.string()
    .min(1, 'Şirket adı zorunludur')
    .min(2, 'Şirket adı en az 2 karakter olmalıdır'),
  position: z.string()
    .min(1, 'Pozisyon adı zorunludur')
    .min(2, 'Pozisyon adı en az 2 karakter olmalıdır'),
  stage: z.string().min(2, 'Mülakat aşaması seçiniz veya yazınız').default('İK Görüşmesi'),
  type: interviewTypeEnum.default('Online'),
  date: z.string().min(1, 'Mülakat tarihi zorunludur'),
  time: z.string().min(1, 'Mülakat saati zorunludur').default('14:00'),
  duration_minutes: z.coerce.number().min(15, 'Süre en az 15 dakika olmalıdır').default(45),
  interviewer_name: z.string().optional().nullable(),
  interviewer_role: z.string().optional().nullable(),
  meeting_link: z.string().url('Geçerli bir toplantı URL’si giriniz').or(z.literal('')).optional().nullable(),
  location: z.string().optional().nullable(),
  prep_notes: z.string().optional().nullable(),
  interview_notes: z.string().optional().nullable(),
  result: interviewResultEnum.default('Pending'),
  follow_up_date: z.string().optional().nullable(),
});

export type InterviewFormValues = z.infer<typeof interviewSchema>;
