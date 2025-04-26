
'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contactSchema';
import { supabase } from '@/integrations/supabase/client';

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(formData);

    // Store in Supabase
    const { error } = await supabase
      .from('sponsor_contacts')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        notes: validatedData.message,
      });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit form. Please try again.' 
    };
  }
}
