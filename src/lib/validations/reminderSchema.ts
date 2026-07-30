import { z } from 'zod';

export const reminderSchema = z.object({
  application_id: z.string().uuid().nullable().optional(),
  title: z
    .string({ required_error: 'Hatırlatma başlığı zorunludur.' })
    .min(1, 'Başlık boş bırakılamaz.')
    .max(120, 'Başlık en fazla 120 karakter olabilir.'),
  description: z.string().max(300).nullable().optional(),
  due_date: z.string({ required_error: 'Tarih seçimi zorunludur.' }),
  is_completed: z.boolean().default(false),
});

export type ReminderFormValues = z.infer<typeof reminderSchema>;
