
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ContactForm = () => {
  const [formState, setFormState] = React.useState({
    fullName: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // In a real application, we would send this data to an API
    alert('Thank you for your message. Our team will contact you shortly.');
    setFormState({
      fullName: '',
      email: '',
      company: '',
      message: ''
    });
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 font-montserrat">
        Get in Touch
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formState.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formState.company}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formState.message}
            onChange={handleChange}
            required
          />
        </div>
        
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
