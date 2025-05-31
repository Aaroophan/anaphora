import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { useConfettiStore } from '../../store/confettiStore';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import type { Achievement } from '../../types/profile';

interface AchievementListProps {
  achievements: Achievement[];
}

export const AchievementList = ({ achievements }: AchievementListProps) => {
  const { reducedMotion } = useAccessibilityStore();
  const { activate, deactivate, hasRun } = useConfettiStore();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && !hasRun) {
      controls.start('visible');
      activate();
      setTimeout(() => {
        deactivate();
      }, 5000);
    }
  }, [isInView, controls, activate, deactivate, hasRun]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0.05 : 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: reducedMotion ? 'tween' : 'spring',
        stiffness: 50,
        damping: 20,
      },
    },
  };

  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      variants={container}
      initial="hidden"
      animate={controls}
      className="space-y-6"
    >
      {achievements.map((achievement, index) => (
        <motion.div
          key={`${achievement.title}-${index}`}
          variants={item}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex gap-4 items-start"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {achievement.title}
              </h3>

              {achievement.date && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {achievement.date}
                </div>
              )}
            </div>

            {achievement.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {achievement.description}
              </p>
            )}

            {achievement.url && (
              <a
                href={achievement.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-primary text-sm font-medium hover:underline"
              >
                View Certificate
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
