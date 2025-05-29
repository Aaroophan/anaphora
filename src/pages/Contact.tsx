import  { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Mail, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { ContactForm } from '../components/contact/ContactForm';
import { Spinner } from '../components/ui/Spinner';
import { mockProfile } from '../mock/mockData';
import type { Profile } from '../types/profile';
import { ProfileSchema } from '../types/profile';

export const Contact = () => {
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
          {error || "Couldn't load contact information"}
        </p>
      </div>
    );
  }
  
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-20 pb-10 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Contact</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Get in touch with me for collaborations or opportunities
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h2>
              
              <div className="space-y-4">
                {profile.contact_email && (
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <a href={`mailto:${profile.contact_email}`} className="text-gray-900 dark:text-white hover:text-primary">
                        {profile.contact_email}
                      </a>
                    </div>
                  </div>
                )}
                
                {profile.location && (
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-gray-900 dark:text-white">{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {profile.social_links && profile.social_links.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Social Media
                </h2>
                
                <div className="space-y-4">
                  {profile.social_links.map((link) => (
                    <div key={link.platform} className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {getSocialIcon(link.platform)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{link.platform}</p>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:text-primary">
                          {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <ContactForm profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
};
 