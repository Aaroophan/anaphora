import { motion } from 'framer-motion';
import { Layout, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <Layout className="w-16 h-16 text-primary" />
          </div>

          <motion.h1
            className="text-7xl font-bold text-primary mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }}
          >
            404
          </motion.h1>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Page Not Found
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-10">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <motion.a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};
