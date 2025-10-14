import { TeamMember, Project } from "./types";

// =================================================================
// TEAM MEMBERS - EASY CUSTOMIZATION PLACEHOLDERS
// =================================================================
// To customize: Replace placeholder values with actual data
// - avatar: URL to profile image (recommend 400x400px)
// - cvUrl: Direct link to PDF file (optional)
// - All text fields support both English and Norwegian
// =================================================================

export const teamMembers: TeamMember[] = [
  // TEAM MEMBER 1
  {
    id: "1",
    name: "YOUR NAME HERE", // Replace with actual name
    role: ["Developer", "Designer"], // Replace with actual roles
    location: "Oslo, Norway", // Replace with location
    bio: "PLACEHOLDER: Add your professional bio here. Describe your expertise, passion, and what you bring to the team.",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Figma",
      "UI/UX Design",
      "Next.js",
      "Tailwind CSS",
    ],
    avatar:
      "https://images.unsplash.com/photo-1622475444932-f1b0bf96ecff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTk0NDU2NzZ8MA&ixlib=rb-4.1.0&q=80&w=400", // REPLACE with your profile image URL
    highlights: [
      "PLACEHOLDER: Add your first career highlight",
      "PLACEHOLDER: Add your second career highlight",
      "PLACEHOLDER: Add your third career highlight",
    ],
    experience: [
      {
        title: "Senior Full-Stack Developer", // Replace with your job title
        company: "Tech Solutions AS", // Replace with company name
        period: "2021 - Present", // Replace with period
      },
      {
        title: "Frontend Developer",
        company: "Digital Agency",
        period: "2019 - 2021",
      },
    ],
    education: [
      {
        degree: "M.Sc. Computer Science", // Replace with your degree
        institution: "University of Oslo", // Replace with institution
        year: "2019", // Replace with graduation year
      },
    ],
    links: {
      email: "your.email@example.com", // Replace with email
      github: "https://github.com/yourusername", // Replace or remove
      linkedin: "https://linkedin.com/in/yourprofile", // Replace or remove
    },
    contactInfo: {
      phone: "+47 123 45 678", // Replace with phone number
      email: "your.email@example.com", // Replace with email
      address: "Oslo, Norway", // Replace with address/city
    },
    cvUrl: "/path/to/your-cv.pdf", // REPLACE with actual CV PDF URL or remove
    projectIds: ["1", "2", "3"],
  },

  // TEAM MEMBER 2
  {
    id: "2",
    name: "YOUR NAME HERE", // Replace with actual name
    role: ["DevOps"], // Replace with actual roles
    location: "Bergen, Norway", // Replace with location
    bio: "PLACEHOLDER: Add your professional bio here. Describe your expertise, passion, and what you bring to the team.",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "Linux",
      "Python",
      "Monitoring",
    ],
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400", // REPLACE with your profile image URL
    highlights: [
      "PLACEHOLDER: Add your first career highlight",
      "PLACEHOLDER: Add your second career highlight",
      "PLACEHOLDER: Add your third career highlight",
    ],
    experience: [
      {
        title: "Senior DevOps Engineer", // Replace with job title
        company: "Cloud Systems", // Replace with company name
        period: "2020 - Present", // Replace with period
      },
      {
        title: "Systems Administrator",
        company: "IT Services",
        period: "2017 - 2020",
      },
    ],
    education: [
      {
        degree: "B.Sc. Information Technology", // Replace with degree
        institution:
          "Norwegian University of Science and Technology", // Replace with institution
        year: "2017", // Replace with year
      },
    ],
    links: {
      email: "your.email@example.com", // Replace with email
      github: "https://github.com/yourusername", // Replace or remove
      linkedin: "https://linkedin.com/in/yourprofile", // Replace or remove
    },
    contactInfo: {
      phone: "+47 987 65 432", // Replace with phone number
      email: "your.email@example.com", // Replace with email
      address: "Bergen, Norway", // Replace with address/city
    },
    cvUrl: "/path/to/your-cv.pdf", // REPLACE with actual CV PDF URL or remove
    projectIds: ["1", "3", "4"],
  },

  // TEAM MEMBER 3
  {
    id: "3",
    name: "YOUR NAME HERE", // Replace with actual name
    role: ["Project Manager"], // Replace with actual roles
    location: "Trondheim, Norway", // Replace with location
    bio: "PLACEHOLDER: Add your professional bio here. Describe your expertise, passion, and what you bring to the team.",
    skills: [
      "Agile",
      "Scrum",
      "Jira",
      "Stakeholder Management",
      "Product Strategy",
      "Risk Management",
      "Team Leadership",
    ],
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400", // REPLACE with your profile image URL
    highlights: [
      "PLACEHOLDER: Add your first career highlight",
      "PLACEHOLDER: Add your second career highlight",
      "PLACEHOLDER: Add your third career highlight",
    ],
    experience: [
      {
        title: "Senior Project Manager", // Replace with job title
        company: "Innovation Lab", // Replace with company name
        period: "2019 - Present", // Replace with period
      },
      {
        title: "Product Owner",
        company: "Startup Hub",
        period: "2016 - 2019",
      },
    ],
    education: [
      {
        degree: "M.B.A.", // Replace with degree
        institution: "BI Norwegian Business School", // Replace with institution
        year: "2016", // Replace with year
      },
    ],
    links: {
      email: "your.email@example.com", // Replace with email
      linkedin: "https://linkedin.com/in/yourprofile", // Replace or remove
    },
    contactInfo: {
      phone: "+47 555 12 345", // Replace with phone number
      email: "your.email@example.com", // Replace with email
      address: "Trondheim, Norway", // Replace with address/city
    },
    cvUrl: "/path/to/your-cv.pdf", // REPLACE with actual CV PDF URL or remove
    projectIds: ["1", "2", "4"],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Effektivisering av kundesupport: En case studie av POWER",
    summary:
      "Modern e-commerce solution with real-time inventory management",
    description:
      "A comprehensive e-commerce platform built for a leading Nordic retailer, featuring real-time inventory tracking, multi-currency support, and advanced analytics.",
    goals: [
      "Create a scalable platform to handle 100K+ concurrent users",
      "Implement real-time inventory synchronization across 50+ stores",
      "Provide comprehensive analytics and reporting tools",
      "Ensure GDPR compliance and data security",
    ],
    responsibilities: [
      "Full-stack development using React and Node.js",
      "Database design and optimization",
      "API development and integration with third-party services",
      "DevOps setup with AWS and Docker",
      "UI/UX design and user testing",
    ],
    outcomes: [
      "40% increase in online sales within first quarter",
      "99.9% uptime achieved",
      "Average page load time under 1.5 seconds",
      "Successfully processed 1M+ transactions in first year",
    ],
    tags: ["E-commerce", "Web", "Enterprise"],
    tech: [
      "React",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Redis",
    ],
    teamMemberIds: ["1", "2", "3", "5"],
    coverImage:
      "https://images.unsplash.com/photo-1676792519027-7c42006d7b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzU5NTA3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1676792519027-7c42006d7b4a?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    ],
    links: {
      demo: "https://demo.example.com",
    },
  },
  {
    id: "2",
    title: "Healthcare Portal",
    summary:
      "Patient management system with secure data handling",
    description:
      "A secure healthcare portal enabling patients to access medical records, book appointments, and communicate with healthcare providers.",
    goals: [
      "Provide secure access to medical records",
      "Streamline appointment booking process",
      "Enable secure patient-doctor communication",
      "Ensure HIPAA and GDPR compliance",
    ],
    responsibilities: [
      "Frontend development with focus on accessibility",
      "Secure API development",
      "Integration with existing healthcare systems",
      "Security auditing and compliance",
      "User research and UX design",
    ],
    outcomes: [
      "50K+ active users in first 6 months",
      "Reduced appointment no-shows by 30%",
      "Achieved full HIPAA compliance",
      "95% user satisfaction rating",
    ],
    tags: ["Healthcare", "Web", "Security"],
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "AWS",
      "Encryption",
    ],
    teamMemberIds: ["1", "3", "4", "5"],
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1080",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800",
    ],
  },
  {
    id: "3",
    title: "Analytics Dashboard",
    summary:
      "Real-time data visualization platform for business intelligence",
    description:
      "A powerful analytics dashboard providing real-time insights into business metrics with customizable widgets and reports.",
    goals: [
      "Create intuitive data visualization tools",
      "Support real-time data streaming",
      "Enable custom report generation",
      "Provide role-based access control",
    ],
    responsibilities: [
      "Frontend development with complex visualizations",
      "Real-time data pipeline setup",
      "Database optimization for analytics queries",
      "Infrastructure scaling and monitoring",
      "Dashboard UI/UX design",
    ],
    outcomes: [
      "Processing 1M+ data points per minute",
      "Reduced report generation time from hours to seconds",
      "Adopted by 100+ teams across organization",
      "Winner of internal innovation award",
    ],
    tags: ["Analytics", "Dashboard", "Data"],
    tech: [
      "React",
      "D3.js",
      "Python",
      "Kafka",
      "ClickHouse",
      "Kubernetes",
    ],
    teamMemberIds: ["1", "2", "4", "6"],
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    ],
    links: {
      demo: "https://analytics.example.com",
      repo: "https://github.com/example/analytics",
    },
  },
  {
    id: "4",
    title: "Mobile Banking App",
    summary:
      "Secure mobile banking application with biometric authentication",
    description:
      "A modern mobile banking application offering secure transactions, budget tracking, and personalized financial insights.",
    goals: [
      "Provide secure and convenient mobile banking",
      "Implement biometric authentication",
      "Offer personal finance management tools",
      "Ensure compliance with banking regulations",
    ],
    responsibilities: [
      "Mobile app development for iOS and Android",
      "Security implementation and testing",
      "Backend API development",
      "Cloud infrastructure setup",
      "User experience design and testing",
    ],
    outcomes: [
      "200K+ downloads in first 3 months",
      "Zero security breaches",
      "4.8/5 star rating on app stores",
      "Reduced customer service calls by 25%",
    ],
    tags: ["Mobile", "Finance", "Security"],
    tech: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Biometrics",
      "Encryption",
    ],
    teamMemberIds: ["2", "3", "4", "6"],
    coverImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1080",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    ],
  },
];