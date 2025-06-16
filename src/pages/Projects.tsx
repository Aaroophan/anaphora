import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { portfolioData } from '../data/portfolio';
import { Project } from '../types/profile';
import Setting from '../utils/Settings';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Convert portfolio data projects to profile type projects
  useEffect(() => {
    const convertedProjects = Setting.getUserData().Projects.map(project => ({
      title: project.Name,
      description: project.Description,
      imageUrl: project.Image,
      githubUrl: project.Links.find(link => link.Name === 'GitHub')?.Href,
      demoUrl: project.Links.find(link => link.Name === 'Link')?.Href,
      videoUrl: project.Links.find(link => link.Name === 'Demo')?.Href,
      technologies: project.Technologies.split(', '),
      date: project.Date
    }));

    setProjects(convertedProjects);
  }, []);

  // Get unique technologies for filter options
  const technologies = [
    ...new Set(
      projects
        .flatMap(project => project.technologies || [])
        .filter(Boolean)
    ),
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project =>
      project.technologies?.includes(activeFilter)
    );

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
        Projects
      </motion.h1>

      <p className="text-gray-600 dark:text-gray-300 text-center mb-10">
        Here are some of the projects I've worked on.
      </p>

      {/* Filter */}
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        <button
          className={`px-4 py-2 rounded-full text-sm ${activeFilter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            } transition-colors`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>

        {technologies.map(tech => (
          <button
            key={tech}
            className={`px-4 py-2 rounded-full text-sm ${activeFilter === tech
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              } transition-colors`}
            onClick={() => setActiveFilter(tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      <ProjectGrid projects={filteredProjects} />
    </motion.div>
  );
};
