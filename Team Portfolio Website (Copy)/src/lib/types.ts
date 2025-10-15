export interface TeamMember {
  id: string;
  name: string;
  role: string[];
  location: string;
  bio: string | { no: string; en: string };
  skills: string[];
  avatar: string;
  highlights: string[];
  experience?: {
    title: string;
    company: string;
    period: string;
    description?: string | { no: string; en: string };
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
  summary: string | { no: string; en: string };
  description: string | { no: string; en: string };
  goals: string[] | { no: string[]; en: string[] };
  responsibilities: string[] | { no: string[]; en: string[] };
  outcomes: string[] | { no: string[]; en: string[] };
  tags: string[];
  tech: string[];
  teamMemberIds: string[];
  teamMemberRoles?: { [memberId: string]: string[] }; // Project-specific roles for each team member
  coverImage: string;
  images: string[];
  links?: {
    demo?: string;
    repo?: string;
    demoText?: string;
  };
}

export type Language = 'en' | 'no';
export type Page = 'home' | 'team' | 'projects' | 'profile' | 'project-detail' | 'fun';
