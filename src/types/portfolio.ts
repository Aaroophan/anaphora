import  { z } from 'zod';

export const SocialLinkSchema = z.object({
  Name: z.string(),
  Icon: z.string(),
  Href: z.string()
});

export const ProjectLinkSchema = z.object({
  Name: z.string(),
  Icon: z.string(),
  Href: z.string()
});

export const ProjectSchema = z.object({
  Image: z.string(),
  Name: z.string(),
  Links: z.array(ProjectLinkSchema),
  Date: z.string(),
  Description: z.string(),
  Technologies: z.string()
});

export const ExperienceSchema = z.object({
  Image: z.string(),
  Title: z.string(),
  Company: z.string(),
  JobType: z.string(),
  Location: z.string(),
  LocationType: z.string(),
  Date: z.string(),
  Description: z.array(z.string())
});

export const EducationSchema = z.object({
  Image: z.string(),
  Name: z.string(),
  Title: z.string(),
  Date: z.string(),
  Description: z.array(z.string())
});

export const CertificateSchema = z.object({
  Image: z.string(),
  Name: z.string(),
  Provider: z.string(),
  Date: z.string(),
  Credential: z.object({
    Name: z.string(),
    Link: z.string()
  })
});

export const ReferenceSchema = z.object({
  Name: z.string(),
  Education: z.string().nullable(),
  Job: z.string(),
  Company: z.string(),
  Phone: z.string(),
  Email: z.string()
});

export const TechnologyCategorySchema = z.tuple([
  z.string(),
  z.array(z.tuple([z.string(), z.string()]))
]);

export const PortfolioSchema = z.object({
  Main: z.object({
    Image: z.string(),
    Greeting: z.string(),
    Name: z.string(),
    Tags: z.array(z.string()),
    Links: z.array(SocialLinkSchema),
    Backgrounds: z.array(z.string()),
    Images: z.array(z.string())
  }),
  About: z.object({
    Description: z.string()
  }),
  Technologies: z.array(TechnologyCategorySchema),
  Projects: z.array(ProjectSchema),
  Experiences: z.array(ExperienceSchema),
  Educations: z.array(EducationSchema),
  Certificates: z.array(CertificateSchema),
  References: z.array(ReferenceSchema)
});

export type Portfolio = z.infer<typeof PortfolioSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type ProjectLink = z.infer<typeof ProjectLinkSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type TechnologyCategory = z.infer<typeof TechnologyCategorySchema>;
 