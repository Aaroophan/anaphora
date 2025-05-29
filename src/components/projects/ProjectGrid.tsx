import  { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, Play } from 'lucide-react';
import { LazyLoad } from '../ui/LazyLoad';
import type { Project } from '../../types/profile';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const { reducedMotion } = useAccessibilityStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  if (!projects || projects.length === 0) {
    return <div className="text-gray-500 text-center py-10">No projects to display</div>;
  }

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project, index) => (
        <motion.div
          key={`${project.title}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            type: reducedMotion ? 'tween' : 'spring',
            stiffness: 50,
            damping: 20,
            delay: reducedMotion ? 0 : index * 0.05,
          }}
          whileHover={reducedMotion ? {} : { y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          {project.imageUrl && (
            <LazyLoad className="aspect-video">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            </LazyLoad>
          )}
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {project.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {project.description}
            </p>
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex gap-3 mt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                  aria-label="GitHub repository"
                >
                  <Github size={20} />
                </a>
              )}
              
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                  aria-label="Live demo"
                >
                  <ExternalLink size={20} />
                </a>
              )}
              
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                  aria-label="Video demo"
                >
                  <Play size={20} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
 