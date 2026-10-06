'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true);
        toast.success('Message sent! Our editorial team will review it shortly.');
        setFormData({
          name: '',
          email: '',
          subject: 'General inquiry',
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
      <div className="bg-white border border-[#E4E7EB] rounded-[20px] p-8 text-center shadow-xs">
        <div className="w-16 h-16 rounded-full bg-[#E8F2EB] text-[#007A58] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="h-2 mb-2">Message received!</h3>
        <p className="text-body text-[#5B6470] mb-6 max-w-md mx-auto">
          Thanks for reaching out to buybestforyou. A member of our editorial staff typically replies within 2 business days.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="btn-secondary text-[14px]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E4E7EB] rounded-[20px] p-6 lg:p-8 shadow-xs">
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="field">
            <label htmlFor="contact-name" className="label">
              Your name <span className="text-[#B84A14]">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className="input"
            />
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="contact-email" className="label">
              Email address <span className="text-[#B84A14]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="input"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="field">
          <label htmlFor="contact-subject" className="label">
            Subject
          </label>
          <select
            id="contact-subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="input bg-white cursor-pointer"
          >
            <option value="General inquiry">General inquiry</option>
            <option value="Spotted an error / Correction">Spotted an error / Correction</option>
            <option value="Pitch an article / Guest author">Pitch an article / Guest author</option>
            <option value="Affiliate or business question">Affiliate or business question</option>
          </select>
        </div>

        {/* Message */}
        <div className="field">
          <label htmlFor="contact-message" className="label">
            Message <span className="text-[#B84A14]">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us what's on your mind. If reporting a factual error or broken link, please include the URL."
            className="textarea"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-cta text-[15px] py-3 px-8 w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
