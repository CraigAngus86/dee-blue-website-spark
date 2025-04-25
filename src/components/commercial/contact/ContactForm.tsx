
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  interest: z.string({
    required_error: "Please select your area of interest",
  }),
  otherInterest: z.string().optional(),
  message: z.string().optional(),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      interest: "",
      otherInterest: "",
      message: "",
      gdprConsent: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real application, you would handle the form submission here
    console.log('Form submitted:', data);
    toast({
      title: "Enquiry Sent",
      description: "We'll be in touch with you soon.",
    });
    form.reset();
  };

  const showOtherField = form.watch("interest") === "other";

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
      <Heading level={2} color="primary" className="mb-4">
        Interested in Partnering With Us?
      </Heading>
      <Text color="muted" className="mb-6">
        Fill out the form below and we'll get back to you with more information about our sponsorship opportunities.
      </Text>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area of Interest</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="matchday">Match Day Sponsorship</SelectItem>
                    <SelectItem value="matchball">Matchball Sponsorship</SelectItem>
                    <SelectItem value="perimeter">Perimeter Sponsorship Boards</SelectItem>
                    <SelectItem value="player">Player Sponsorship</SelectItem>
                    <SelectItem value="standard">Standard Match Day Hospitality</SelectItem>
                    <SelectItem value="fanzone">Fanzone Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {showOtherField && (
            <FormField
              control={form.control}
              name="otherInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please specify</FormLabel>
                  <FormControl>
                    <Input placeholder="Please specify your interest" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us more about your requirements..." 
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gdprConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to Banks o' Dee FC processing my data in accordance with their privacy policy
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full md:w-auto">
            Send Enquiry
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
