export interface TeamMember {
  id: string;
  name: string;
  role: string[];
  location: string;
  bio: string;
  skills: string[];
  avatar: string;
  highlights: string[];
  experience?: {
    title: string;
    company: string;
    period: string;
  }[];
  education?: {
    degree: string;
    institution: string;
    year: string;
  }[];
  links: {
    email?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
  cvUrl?: string; // URL to downloadable CV PDF
  projectIds: string[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  goals: string[];
  responsibilities: string[];
  outcomes: string[];
  tags: string[];
  tech: string[];
  teamMemberIds: string[];
  coverImage: string;
  images: string[];
  links?: {
    demo?: string;
    repo?: string;
  };
}

export type Language = 'en' | 'no';
export type Page = 'home' | 'team' | 'projects' | 'contact' | 'profile' | 'project-detail' | 'fun';
