import  { ReactNode } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import type { Profile } from '../types/profile';

interface MainLayoutProps {
  children: ReactNode;
  profile?: Profile;
}

export const MainLayout = ({ children, profile }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header profile={profile} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer profile={profile} />
    </div>
  );
};
 