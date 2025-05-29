import  { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout } from 'lucide-react';
import { Hero } from '../components/profile/Hero';
import { ExperienceSlider } from '../components/experience/ExperienceSlider';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { TechGrid } from '../components/skills/TechGrid';
import { EducationTimeline } from '../components/education/EducationTimeline';
import { AchievementList } from '../components/achievements/AchievementList';
import { ContactForm } from '../components/contact/ContactForm';
import { Spinner } from '../components/ui/Spinner';
import { useThemeStore } from '../store/themeStore';
import { mockProfile } from '../mock/mockData';
import type { Profile } from '../types/profile';
import { ProfileSchema } from '../types/profile';

export const Home = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setTheme } = useThemeStore();
  
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, we would fetch from Supabase here
        // const { data, error } = await supabase.rpc('getProfileByUsername', { username_param: username });
        
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Using mock data
        const data = username ? { ...mockProfile, username } : mockProfile;
        
        if (!data) {
          throw new Error('Profile not found');
        }
        
        // Validate data with Zod
        const validatedProfile = ProfileSchema.parse(data);
        setProfile(validatedProfile);
        
        // Set theme if available
        if (validatedProfile.theme) {
          setTheme({
            primaryColor: validatedProfile.theme.primaryColor,
            secondaryColor: validatedProfile.theme.secondaryColor,
            motionStyle: validatedProfile.theme.motionStyle,
          });
          
          // Update CSS variables
          document.documentElement.style.setProperty('--primary-color', validatedProfile.theme.primaryColor);
          document.documentElement.style.setProperty('--secondary-color', validatedProfile.theme.secondaryColor || '#9333EA');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [username, setTheme]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spinner size={40} />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Layout size={48} className="text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          {error || "We couldn't find the profile you're looking for."}
        </p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-10">
      {/* Hero Section */}
      <Hero profile={profile} />
      
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center gradient-text">
            Projects
          </h2>
          {profile.projects && <ProjectGrid projects={profile.projects} />}
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center gradient-text">
            Experience
          </h2>
          {profile.experiences && <ExperienceSlider experiences={profile.experiences} />}
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center gradient-text">
            Skills
          </h2>
          {profile.skills && <TechGrid skills={profile.skills} />}
        </div>
      </section>
      
      {/* Education Section */}
      {profile.education && profile.education.length > 0 && (
        <section id="education" className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center gradient-text">
              Education
            </h2>
            <EducationTimeline education={profile.education} />
          </div>
        </section>
      )}
      
      {/* Achievements Section */}
      {profile.achievements && profile.achievements.length > 0 && (
        <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center gradient-text">
              Achievements
            </h2>
            <AchievementList achievements={profile.achievements} />
          </div>
        </section>
      )}
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-center gradient-text">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-10 max-w-xl mx-auto">
            Feel free to reach out if you have any questions or want to discuss potential opportunities.
          </p>
          <ContactForm profile={profile} />
        </div>
      </section>
    </div>
  );
};
 