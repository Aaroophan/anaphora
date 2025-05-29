import  { motion } from 'framer-motion';

interface AboutProps {
  description: string;
}

export const About = ({ description }: AboutProps) => {
  const paragraphs = description.split('\n\n');

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center gradient-text">About Me</h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed whitespace-pre-line"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};
 