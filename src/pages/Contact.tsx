import { motion } from 'framer-motion';
import { ContactForm } from '../components/contact/ContactForm';
import { mockProfile } from '../mock/mockData';
import { MapPin, Mail, Phone, Link } from 'lucide-react';

export const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-center mb-2 gradient-text"
      >
        Contact Me
      </motion.h1>

      <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
        Feel free to reach out for opportunities or collaborations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Get In Touch
          </h2>

          <div className="space-y-6 mb-8">
            {mockProfile.contact_email && (
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h3>
                  <a href={`mailto:${mockProfile.contact_email}`} className="text-gray-900 dark:text-white hover:text-primary">
                    {mockProfile.contact_email}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</h3>
                <a href="tel:+94768505131" className="text-gray-900 dark:text-white hover:text-primary">
                  +94 768 505 131
                </a>
              </div>
            </div>

            {mockProfile.location && (
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h3>
                  <p className="text-gray-900 dark:text-white">
                    {mockProfile.location}
                  </p>
                </div>
              </div>
            )}

            {mockProfile.social_links && mockProfile.social_links.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Link className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Social</h3>
                  <div className="space-y-1">
                    {mockProfile.social_links.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-900 dark:text-white hover:text-primary"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <ContactForm profile={mockProfile} />
      </div>
    </motion.div>
  );
};
