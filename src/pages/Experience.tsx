import  { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ExperienceSlider } from '../components/experience/ExperienceSlider';
import { Spinner } from '../components/ui/Spinner';
import { mockProfile } from '../mock/mockData';
import type { Profile } from '../types/profile';
import { ProfileSchema } from '../types/profile';

export const Experience = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, we would fetch from Supabase here
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Using mock data
        const data = username ? { ...mockProfile, username } : mockProfile;
        
        if (!data) {
          throw new Error('Profile not found');
        }
        
        // Validate data with Zod
        const validatedProfile = ProfileSchema.parse(data);
        setProfile(validatedProfile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [username]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={40} />
      </div>
    );
  }
  
  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-2">Error</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          {error || "Couldn't load experience"}
        </p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10 min-h-screen bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Experience</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          My professional journey and work history
        </p>
        
        {profile.experiences && profile.experiences.length > 0 ? (
          <ExperienceSlider experiences={profile.experiences} />
        ) : (
          <div className="text-center py-20 text-gray-500">
            No experience to display yet
          </div>
        )}
      </div>
    </div>
  );
};
 