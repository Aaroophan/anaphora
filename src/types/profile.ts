import  { z } from 'zod';

export const SocialLinkSchema = z.object({
  platform: z.string(),
  url: z.string().url(),
  icon: z.string().optional(),
});

export const TechnologySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  category: z.enum(['Frontend', 'Backend', 'Design', 'Database', 'Mobile', '3D', 'DevOps', 'Other']),
});

export const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  logo: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string(),
  technologies: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  technologies: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export const AchievementSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
});

export const ThemeSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string().optional(),
  motionStyle: z.enum(['spring', 'tween', 'inertia']).optional(),
  darkMode: z.boolean().optional(),
});

export const ProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  full_name: z.string(),
  headline: z.string(),
  bio: z.string(),
  location: z.string(),
  avatar_url: z.string().nullable(),
  contact_email: z.string().email().nullable(),
  social_links: z.array(SocialLinkSchema).nullable(),
  experiences: z.array(ExperienceSchema).nullable(),
  projects: z.array(ProjectSchema).nullable(),
  skills: z.array(TechnologySchema).nullable(),
  education: z.array(EducationSchema).nullable(),
  achievements: z.array(AchievementSchema).nullable(),
  theme: ThemeSchema.nullable(),
  updated_at: z.string(),
  created_at: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type Technology = z.infer<typeof TechnologySchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
 