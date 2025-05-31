import { useState, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import type { Profile } from '../../types/profile';

interface ContactFormProps {
  profile: Profile;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm = ({ profile }: ContactFormProps) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const { reducedMotion } = useAccessibilityStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus('submitting');

    try {
      // Simulate form submission with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Reset form and show success message
      if (formRef.current) {
        formRef.current.reset();
      }

      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setStatus('success');

      // Reset status after delay
      setTimeout(() => {
        setStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Get in Touch
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="input"
            value={formState.name}
            onChange={handleChange}
            disabled={status !== 'idle'}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
            value={formState.email}
            onChange={handleChange}
            disabled={status !== 'idle'}
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="input"
          value={formState.subject}
          onChange={handleChange}
          disabled={status !== 'idle'}
        />
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="input resize-none"
          value={formState.message}
          onChange={handleChange}
          disabled={status !== 'idle'}
        />
      </div>

      <div>
        <motion.button
          type="submit"
          className={`w-full px-6 py-3 rounded-md flex items-center justify-center transition-colors ${status === 'success'
              ? 'bg-green-600 hover:opacity-90'
              : status === 'error'
                ? 'bg-red-600 hover:opacity-90'
                : 'bg-primary hover:opacity-90'
            } text-white`}
          disabled={status !== 'idle'}
          whileHover={reducedMotion ? {} : { scale: 1.02 }}
          whileTap={reducedMotion ? {} : { scale: 0.98 }}
        >
          {status === 'idle' && (
            <>Send Message <Send className="ml-2 h-4 w-4" /></>
          )}

          {status === 'submitting' && (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </div>
          )}

          {status === 'success' && (
            <>Message Sent <Check className="ml-2 h-4 w-4" /></>
          )}

          {status === 'error' && (
            <>Try Again <AlertCircle className="ml-2 h-4 w-4" /></>
          )}
        </motion.button>
      </div>

      {status === 'success' && (
        <p className="mt-4 text-sm text-green-600 dark:text-green-400 text-center">
          Thanks for reaching out! I'll get back to you soon.
        </p>
      )}

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
        You can also reach me directly at{' '}
        <a href={`mailto:${profile.contact_email || ''}`} className="text-primary hover:underline">
          {profile.contact_email}
        </a>
      </p>
    </motion.form>
  );
};
