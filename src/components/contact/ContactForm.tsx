'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please provide your name and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: formData.subject || 'General inquiry',
          message: formData.message || '(No message provided)'
        })
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true);
        toast.success('Message sent! Our editorial team will review it shortly.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-[var(--r-card-feature)] border border-border bg-white text-center py-12 px-6 shadow-xs">
        <div className="w-14 h-14 rounded-full bg-tint-home-bg text-positive flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          ✓
        </div>
        <h3 className="text-[24px] leading-[30px] font-extrabold text-ink mb-2">Message received!</h3>
        <p className="text-[16px] leading-[24px] text-muted mb-6 max-w-md mx-auto">
          Thanks for reaching out to buybestforyou. A member of our editorial staff typically replies within 2 business days.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="rounded-full border border-border bg-white px-5 py-2.5 text-[14px] font-semibold text-ink hover:bg-surface-muted transition-colors cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[var(--r-card-feature)] border border-border bg-white p-6 lg:p-8 space-y-5 shadow-xs">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-[14px] font-semibold text-ink">
          Your name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-[var(--r-input)] border border-border-input bg-white px-4 py-3 text-[15px] leading-[22px] text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent transition-all"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-[14px] font-semibold text-ink">
          Your email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-[var(--r-input)] border border-border-input bg-white px-4 py-3 text-[15px] leading-[22px] text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent transition-all"
        />
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-subject" className="text-[14px] font-semibold text-ink">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full rounded-[var(--r-input)] border border-border-input bg-white px-4 py-3 text-[15px] leading-[22px] text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent transition-all"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-[14px] font-semibold text-ink">
          Your message <span className="text-muted font-normal text-[13px]">(optional)</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-[var(--r-input)] border border-border-input bg-white px-4 py-3 text-[15px] leading-[22px] text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent transition-all resize-y"
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-ink text-white hover:opacity-90 transition-opacity px-8 py-3 text-[15px] font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </div>
    </form>
  );
}
