import  { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import type { Achievement } from '../../types/profile';
import { useConfettiStore } from '../../store/confettiStore';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface AchievementListProps {
  achievements: Achievement[];
}

export const AchievementList = ({ achievements }: AchievementListProps) => {
  const { reducedMotion } = useAccessibilityStore();
  const { activate, hasRun } = useConfettiStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (isInView && !hasRun) {
      activate();
    }
  }, [isInView, hasRun, activate]);
  
  if (!achievements || achievements.length === 0) {
    return <div className="text-gray-500 text-center py-10">No achievements to display</div>;
  }

  return (
    <div ref={containerRef} className="space-y-6 py-6">
      {achievements.map((achievement, index) => (
        <motion.div
          key={`${achievement.title}-${index}`}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{
            type: reducedMotion ? 'tween' : 'spring',
            stiffness: 50,
            damping: 20,
            delay: reducedMotion ? 0 : index * 0.1,
          }}
          className="flex gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="flex-shrink-0 text-primary">
            <Award size={24} />
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {achievement.title}
            </h3>
            
            {achievement.date && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {achievement.date}
              </p>
            )}
            
            {achievement.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {achievement.description}
              </p>
            )}
            
            {achievement.url && (
              <a
                href={achievement.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                View <ExternalLink size={16} />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
 