import { z } from 'zod';

export const ThemeSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  motionStyle: z.enum(['spring', 'tween', 'inertia'])
});

export const SocialLinkSchema = z.object({
  platform: z.string(),
  url: z.string().url(),
  icon: z.string().optional()
});

export const TechnologySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  category: z.string()
});

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  githubUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  technologies: z.array(z.string()).optional(),
  featured: z.boolean().optional().default(false),
  date: z.string().optional()
});

export const ExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  location: z.string().optional(),
  remote: z.boolean().optional(),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  description: z.array(z.string()),
  logo: z.string().optional()
});

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  gpa: z.number().optional(),
  description: z.array(z.string()).optional(),
  logo: z.string().optional()
});

export const AchievementSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  icon: z.string().optional()
});

export const ProfileSchema = z.object({
  username: z.string(),
  full_name: z.string(),
  headline: z.string(),
  bio: z.string(),
  location: z.string().optional(),
  contact_email: z.string().email().optional(),
  avatar_url: z.string().url().optional(),
  cover_image: z.string().url().optional(),
  social_links: z.array(SocialLinkSchema).optional(),
  technologies: z.array(TechnologySchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  experiences: z.array(ExperienceSchema).optional(),
  education: z.array(EducationSchema).optional(),
  achievements: z.array(AchievementSchema).optional(),
  theme: ThemeSchema.optional()
});

export type Theme = z.infer<typeof ThemeSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type Technology = z.infer<typeof TechnologySchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
