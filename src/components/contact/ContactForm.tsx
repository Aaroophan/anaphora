import  { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import type { Profile } from '../../types/profile';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface ContactFormProps {
  profile: Profile;
}

export const ContactForm = ({ profile }: ContactFormProps) => {
  const { reducedMotion } = useAccessibilityStore();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          className="input"
          disabled={status === 'submitting' || status === 'success'}
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
          className="input"
          disabled={status === 'submitting' || status === 'success'}
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          required
          className="input"
          disabled={status === 'submitting' || status === 'success'}
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={6}
          className="input resize-none"
          disabled={status === 'submitting' || status === 'success'}
        />
      </div>
      
      <div>
        <motion.button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
          whileHover={reducedMotion ? {} : { scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'idle' && (
            <>
              Send Message <Send size={16} />
            </>
          )}
          
          {status === 'submitting' && (
            <>
              Sending...
            </>
          )}
          
          {status === 'success' && (
            <>
              Message Sent <Check size={16} />
            </>
          )}
          
          {status === 'error' && (
            <>
              Try Again <AlertCircle size={16} />
            </>
          )}
        </motion.button>
      </div>
      
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-green-600 dark:text-green-400"
        >
          Your message has been sent! We'll get back to you soon.
        </motion.p>
      )}
      
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-red-600 dark:text-red-400"
        >
          There was an error sending your message. Please try again.
        </motion.p>
      )}
    </motion.form>
  );
};
 