import { motion } from 'framer-motion';
import { ExperienceSlider } from '../components/experience/ExperienceSlider';
import { EducationTimeline } from '../components/education/EducationTimeline';
import { mockProfile } from '../mock/mockData';
import { portfolioData } from '../data/portfolio';
import Setting from '../utils/Settings';

export const Experience = () => {
  const { Experiences, Education } = Setting.getUserData().Experiences;

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
        className="text-3xl font-bold text-center mb-12 gradient-text"
      >
        Experience & Education
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Work Experience
          </h2>
          <ExperienceSlider experiences={Experiences || []} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Education
          </h2>
          <EducationTimeline education={Education || []} />
        </div>
      </div>
    </motion.div>
  );
};
