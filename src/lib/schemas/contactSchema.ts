
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().optional(),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy." }),
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
