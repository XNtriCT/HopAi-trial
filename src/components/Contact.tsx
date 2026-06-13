import React, { useState, useRef } from 'react';
import { LineReveal } from './TextEffects/LineReveal';
import { DrawingLine } from './DrawingLine';
import { Magnetic } from './Magnetic';
import { use3DTilt } from '../hooks/use3DTilt';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  organization: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  country: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
      resolver: zodResolver(formSchema)
  });

  const detailsCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  use3DTilt(detailsCardRef, '.icon-parallax');
  use3DTilt(formCardRef);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 scroll-mt-24 bg-transparent relative overflow-hidden">
      {/* Top layout boundary line */}
      <DrawingLine className="absolute top-0 inset-x-0" />

      <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" alt="ambient" className="w-full h-full object-cover opacity-10 blur-sm" />
          <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
           <LineReveal 
              text="Connect With HOP AI Foundation" 
              as="h2"
              className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6"
           />
           <p className="text-lg text-muted-foreground font-body">
              Whether you are a nonprofit leader, donor, volunteer, technology professional, educator, researcher, or potential partner, we would love to hear from you.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Details Card */}
            <div 
               ref={detailsCardRef}
               className="lg:col-span-2 interactive-card p-8 md:p-12 rounded-3xl border border-border/40 flex flex-col justify-between"
               style={{ transformStyle: 'preserve-3d' }}
            >
                <div>
                   <h3 className="text-2xl font-display font-bold text-foreground mb-8">Get in Touch</h3>
                   
                   <div className="flex flex-col gap-8">
                       <div className="flex gap-4 items-start">
                           <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 text-primary icon-parallax">
                               <MapPin size={20} />
                           </div>
                           <div>
                               <p className="font-bold text-foreground mb-1">Address</p>
                               <p className="text-muted-foreground text-sm leading-relaxed">
                                   Building No 58/1518(1), Alu ninna Vila,<br/>
                                   Poonkulam, Thiruvananthapuram,<br/>
                                   Kerala, India, 695522
                               </p>
                           </div>
                       </div>
                       
                       <div className="flex gap-4 items-start">
                           <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 text-primary icon-parallax">
                               <Phone size={20} />
                           </div>
                           <div>
                               <p className="font-bold text-foreground mb-1">Phone</p>
                               <p className="text-muted-foreground text-sm">+91 80754 61489</p>
                           </div>
                       </div>
                       
                       <div className="flex gap-4 items-start">
                           <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 text-primary icon-parallax">
                               <Mail size={20} />
                           </div>
                           <div>
                               <p className="font-bold text-foreground mb-1">Email</p>
                               <p className="text-muted-foreground text-sm">foundation.hopai@gmail.com</p>
                           </div>
                       </div>
                   </div>
                </div>

                <div className="mt-12 h-48 rounded-xl overflow-hidden relative border border-border/40">
                    <iframe 
                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126285.50974895662!2d76.84073356857147!3d8.487711463991206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05baddf3333333%3A0x6b10292bbf5a92!2sThiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                       className="w-full h-full border-0 grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                       allowFullScreen={false} 
                       loading="lazy" 
                       referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            {/* Contact Form */}
            <div 
               ref={formCardRef}
               className="lg:col-span-3 interactive-card p-8 md:p-12 rounded-3xl border border-border/40"
               style={{ transformStyle: 'preserve-3d' }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                           <label className="text-sm font-medium text-foreground/80">Name *</label>
                           <input 
                              {...register("name")} 
                              className={cn(
                                 "bg-background border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
                                 errors.name ? "border-red-500 focus:ring-red-500" : "border-border"
                              )}
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-sm font-medium text-foreground/80">Organization</label>
                           <input 
                              {...register("organization")} 
                              className="bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                           />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                           <label className="text-sm font-medium text-foreground/80">Email *</label>
                           <input 
                              {...register("email")} 
                              type="email"
                              className={cn(
                                 "bg-background border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
                                 errors.email ? "border-red-500 focus:ring-red-500" : "border-border"
                              )}
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-sm font-medium text-foreground/80">Phone</label>
                           <input 
                              {...register("phone")} 
                              className="bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                           />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                         <label className="text-sm font-medium text-foreground/80">Subject *</label>
                         <select 
                            {...register("subject")} 
                            className={cn(
                                 "bg-background border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none",
                                 errors.subject ? "border-red-500 focus:ring-red-500" : "border-border"
                              )}
                         >
                             <option value="">Select a topic...</option>
                             <option value="Training Programs">Training Programs</option>
                             <option value="Partnerships">Partnerships</option>
                             <option value="Consulting">Consulting</option>
                             <option value="Research">Research</option>
                             <option value="Volunteering">Volunteering</option>
                             <option value="Media">Media</option>
                             <option value="Donations">Donations</option>
                             <option value="General Inquiry">General Inquiry</option>
                         </select>
                    </div>

                    <div className="flex flex-col gap-2">
                         <label className="text-sm font-medium text-foreground/80">Message *</label>
                         <textarea 
                            {...register("message")} 
                            rows={5}
                            className={cn(
                                 "bg-background border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none",
                                 errors.message ? "border-red-500 focus:ring-red-500" : "border-border"
                              )}
                         ></textarea>
                    </div>

                    <Magnetic>
                       <button 
                           type="submit" 
                           disabled={isSubmitting}
                           className="bg-primary hover:bg-primary/95 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 border border-primary/30 cursor-pointer w-full"
                       >
                           <span className="magnetic-text block flex items-center justify-center gap-2">
                              {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                           </span>
                       </button>
                    </Magnetic>

                    {submitted && (
                       <div className="p-4 bg-primary/10 border border-primary/20 text-primary rounded-lg text-center font-medium">
                          Thank you! Your message has been sent successfully.
                       </div>
                    )}
                </form>
            </div>
        </div>
      </div>
    </section>
  );
}
