export interface SocialLink {
  name: string;
  href: string;
  icon: "linkedin" | "github" | "email" | "stopstalk";
}

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  location: string;
  roles: {
    title: string;
    startDate: string;
    endDate: string;
    duration: string;
    description: string;
    responsibilities: string[];
    achievements: string[];
    technologies: string[];
  }[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  isSample?: boolean;
  period?: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startYear: string;
  endYear: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  isPlaceholder?: boolean;
}

export interface Achievement {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  isPlaceholder?: boolean;
}
