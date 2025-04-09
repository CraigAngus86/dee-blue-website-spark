
import React, { useState } from "react";
import Section from "@/components/ui/layout/Section";
import Container from "@/components/ui/layout/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple email validation
    if (!email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setEmail("");
      // Reset success state after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 800);
  };

  return (
    <Section
      background="primary-gradient"
      spacing="lg"
      className="relative overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content side */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-4">
              Stay Updated with Banks o&apos; Dee FC
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-4">
              Get exclusive news, ticket alerts, and special offers
            </p>
          </div>

          {/* Form side */}
          <div className="lg:w-1/2 w-full">
            {status === "success" ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 mb-4">
                  <Check className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-montserrat font-semibold text-white mb-2">
                  Thank you for subscribing!
                </h3>
                <p className="text-white/80">
                  You&apos;ll now receive our latest updates.
                </p>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="Your email address"
                      required
                      aria-required="true"
                      className={`bg-white/20 text-white placeholder:text-white/60 border-white/30 focus:border-accent ${
                        status === "error" ? "border-red-400" : ""
                      }`}
                    />
                    {status === "error" && (
                      <div className="text-red-300 text-sm flex items-center mt-1">
                        <AlertCircle size={14} className="mr-1" />
                        {errorMessage}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-dark text-primary font-semibold transition-colors"
                    disabled={isSubmitting || !email}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                  
                  <p className="text-xs text-white/70 text-center mt-4">
                    By subscribing, you agree to our{" "}
                    <a
                      href="/privacy-policy"
                      className="text-accent hover:underline focus:underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>

      {/* Background decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl" />
    </Section>
  );
};

export default NewsletterSection;
