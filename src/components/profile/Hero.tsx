import  { motion } from 'framer-motion';
import { MapPin, Mail, ArrowDown } from 'lucide-react';
import { AvatarScene } from '../avatar/AvatarScene';
import type { Profile } from '../../types/profile';
import { useAccessibilityStore } from '../../store/accessibilityStore';

interface HeroProps {
  profile: Profile;
}

export const Hero = ({ profile }: HeroProps) => {
  const { reducedMotion } = useAccessibilityStore();
  
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: reducedMotion ? 'tween' : 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" 
         style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwdGVjaCUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzQ4NDY0ODA4fDA&ixlib=rb-4.1.0)', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(255,255,255,0.9)' }}>
      <motion.div 
        className="max-w-4xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div variants={item} className="flex-shrink-0">
            <AvatarScene username={profile.username} size={200} />
          </motion.div>
          
          <div>
            <motion.h1 variants={item} className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              {profile.full_name}
            </motion.h1>
            
            <motion.div variants={item} className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {profile.headline}
            </motion.div>
            
            <motion.p variants={item} className="text-gray-600 dark:text-gray-300 mb-6">
              {profile.bio}
            </motion.p>
            
            <motion.div variants={item} className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 mb-8">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span>{profile.location}</span>
                </div>
              )}
              
              {profile.contact_email && (
                <a href={`mailto:${profile.contact_email}`} className="flex items-center gap-1 hover:text-primary">
                  <Mail size={18} />
                  <span>{profile.contact_email}</span>
                </a>
              )}
            </motion.div>
            
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToProjects}
                className="btn btn-primary flex items-center gap-2"
              >
                View Projects <ArrowDown size={16} />
              </button>
              
              <a 
                href={profile.social_links?.find(link => link.platform.toLowerCase() === 'github')?.url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn border border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600"
              >
                GitHub Profile
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
 