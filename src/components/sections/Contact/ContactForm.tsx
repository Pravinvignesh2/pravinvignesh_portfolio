import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './ContactForm.module.css';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha: string; // Honeypot spam trap
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'unconfigured' | 'error'>(
    'idle'
  );
  const [serverMessage, setServerMessage] = useState<string>('');
  const [lastSubmittedHash, setLastSubmittedHash] = useState<string>('');

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    } else if (formData.name.trim().length > 100) {
      errs.name = 'Name must be under 100 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject line is required.';
    } else if (formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Message content is required.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    } else if (formData.message.trim().length > 3000) {
      errs.message = 'Message exceeds 3,000 character limit.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on user edit
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Duplicate submission prevention
    const currentHash = `${formData.name}-${formData.email}-${formData.message}`;
    if (currentHash === lastSubmittedHash && status === 'success') {
      return;
    }

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setServerMessage(data.message || 'Thank you! Your message was delivered successfully.');
        setLastSubmittedHash(currentHash);
      } else if (data.configured === false) {
        // Transparent notice when RESEND_API_KEY is not yet provisioned
        setStatus('unconfigured');
        setServerMessage(
          data.message ||
            'Email delivery provider is awaiting configuration (RESEND_API_KEY). You can send directly using your mail client.'
        );
      } else {
        setStatus('error');
        setServerMessage(data.message || 'Unable to deliver message. Please try direct email.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus('error');
      setServerMessage(
        'Network error connecting to contact service. Please check your connection or email directly.'
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      _gotcha: '',
    });
    setErrors({});
    setStatus('idle');
    setServerMessage('');
  };

  return (
    <div className={styles.formWrapper}>
      {/* Feedback Alert Banners */}
      {status === 'success' && (
        <div className={`${styles.alertBox} ${styles.alertSuccess}`} role="alert">
          <CheckCircle2 size={20} className={styles.alertIcon} />
          <div>
            <strong>Message Received!</strong>
            <p>{serverMessage}</p>
            <button type="button" className={styles.resetButton} onClick={handleReset}>
              <RefreshCw size={12} />
              <span>Send another message</span>
            </button>
          </div>
        </div>
      )}

      {status === 'unconfigured' && (
        <div className={`${styles.alertBox} ${styles.alertNotice}`} role="alert">
          <AlertCircle size={20} className={styles.alertIcon} color="var(--color-accent)" />
          <div>
            <strong>Setup Notice: Direct Dispatch Ready</strong>
            <p>{serverMessage}</p>
            <div style={{ marginTop: 8 }}>
              <a
                href={`mailto:pravinvignesh2502@gmail.com?subject=${encodeURIComponent(
                  formData.subject || 'Portfolio Inquiry'
                )}&body=${encodeURIComponent(formData.message)}`}
                className={styles.resetButton}
                style={{ color: 'var(--color-accent)' }}
              >
                <Mail size={14} />
                <span>Open in Mail Client to Send Directly</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className={`${styles.alertBox} ${styles.alertError}`} role="alert">
          <AlertTriangle size={20} className={styles.alertIcon} />
          <div>
            <strong>Submission Issue</strong>
            <p>{serverMessage}</p>
          </div>
        </div>
      )}

      {/* Main Form */}
      {status !== 'success' && (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Honeypot Spam Trap */}
          <input
            type="text"
            name="_gotcha"
            value={formData._gotcha}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            className={styles.honeypot}
            aria-hidden="true"
          />

          <div className={styles.formGrid}>
            {/* Full Name */}
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-name" className={styles.label}>
                <span>
                  Your Name <span className={styles.requiredStar}>*</span>
                </span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                aria-required="true"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                disabled={status === 'loading'}
              />
              {errors.name && (
                <span id="contact-name-error" className={styles.errorMessage} role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-email" className={styles.label}>
                <span>
                  Email Address <span className={styles.requiredStar}>*</span>
                </span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. jane@company.com"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                disabled={status === 'loading'}
              />
              {errors.email && (
                <span id="contact-email-error" className={styles.errorMessage} role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-subject" className={styles.label}>
              <span>
                Subject <span className={styles.requiredStar}>*</span>
              </span>
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Software Engineering Opportunity / Collaboration"
              className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
              aria-required="true"
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
              disabled={status === 'loading'}
            />
            {errors.subject && (
              <span id="contact-subject-error" className={styles.errorMessage} role="alert">
                {errors.subject}
              </span>
            )}
          </div>

          {/* Message Content */}
          <div className={styles.fieldGroup}>
            <label htmlFor="contact-message" className={styles.label}>
              <span>
                Message <span className={styles.requiredStar}>*</span>
              </span>
              <span className={styles.charCount}>{formData.message.length} / 3000</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, team, or opportunity..."
              className={`${styles.textarea} ${errors.message ? styles.textareaError : ''}`}
              aria-required="true"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              maxLength={3000}
              disabled={status === 'loading'}
            />
            {errors.message && (
              <span id="contact-message-error" className={styles.errorMessage} role="alert">
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit Row */}
          <div className={styles.submitRow}>
            <Button
              variant="accent"
              size="lg"
              type="submit"
              disabled={status === 'loading'}
              iconRight={<Send size={16} />}
            >
              {status === 'loading' ? 'Sending Message...' : 'Send Message'}
            </Button>

            <span className={styles.privacyNotice}>
              Direct delivery to Pravinvignesh P. Zero marketing spam.
            </span>
          </div>
        </form>
      )}
    </div>
  );
};
