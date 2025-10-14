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
    name: "Olav Liljeberg", // Replace with actual name
    role: ["Project Manager", "Business Analyst", "Team Lead"], // Replace with actual roles
    location: "Oslo, Norway", // Replace with location
    bio: "Engasjert IT-student med omfattende kompetanse innen prosjektledelse, forretningssystemer og teknologi. Jeg har en helhetlig forståelse av hvordan teknologi kan optimalisere prosesser, støtte strategiske mål og skape verdi for virksomheter. Med erfaring fra prosjektplanlegging, systemanalyse, nettverksinfrastruktur og UI/UX-design bidrar jeg med struktur, teknisk dybde og et sterkt fokus på kvalitet i alle prosjekter.",
    skills: [
      "Projektledelse",
      "Agile/Scrum",
      "Waterfall",
      "Risikovurdering",
      "Kravspesifikasjon",
      "ERP-systemer",
      "CRM-systemer",
      "Business Model Canvas",
      "Prosesskartlegging",
      "Systemanalyse",
      "Datamodellering",
      "Nettverk (pfSense, VLAN, DNS)",
      "VPN & Cisco",
      "Proxmox",
      "Docker",
      "Portainer",
      "Java",
      "Python",
      "SQL",
      "MySQL",
      "MongoDB",
      "UI/UX Design",
      "Figma",
      "IntelliJ IDEA",
      "VS Code",
      "GitHub",
      "Trello",
      "Miro",
    ],
    avatar:
      "/syntax-flow2/images/olav.jpg", // REPLACE with your profile image URL
    highlights: [
      "Omfattende kompetanse innen prosjektledelse med Agile/Scrum og Waterfall-metodikk",
      "Ekspertise i forretningssystemer, ERP/CRM og prosesskartlegging",
      "Teknisk kompetanse innen nettverksinfrastruktur, virtualisering og programmering",
    ],
    experience: [
      {
        title: "Selger",
        company: "Skousen Hvitevarer",
        period: "Jun 2018 - Des 2019",
      },
      {
        title: "Spesialist på brannvern",
        company: "Firesafe AS",
        period: "Sep 2017 - Jan 2018",
      },
      {
        title: "Selger",
        company: "Elkjøp Nordic AS",
        period: "Okt 2016 - Sep 2017",
      },
      {
        title: "Leder av salgsteam",
        company: "Telesalg AS",
        period: "Jan 2016 - Apr 2016",
      },
      {
        title: "IT-konsulent",
        company: "Fredrikstad kommune",
        period: "Mai 2014 - Des 2015",
      },
      {
        title: "Salgskonsulent",
        company: "Graviton DA",
        period: "Aug 2010 - Des 2013",
      },
      {
        title: "Industrimekaniker",
        company: "NLI AS",
        period: "Sep 2008 - Sep 2010",
      },
    ],
    education: [
      {
        degree: "Bachelor i informasjonssystemer",
        institution: "Høgskolen i Østfold (HiØ)",
        year: "2023 - 2026",
      },
      {
        degree: "Årsstudium i filosofi",
        institution: "Universitetet i Agder (UiA)",
        year: "2021 - 2022",
      },
      {
        degree: "Forkurs for ingeniør (matematikk og fysikk)",
        institution: "Høgskolen i Østfold",
        year: "2020",
      },
    ],
    links: {
      email: "olav.lilje@gmail.com", // Replace with email
      github: "https://www.linkedin.com/in/olav-liljeberg-943306348/", // Replace or remove
      linkedin: "https://linkedin.com/in/yourprofile", // Replace or remove
    },
    contactInfo: {
      phone: "+47 944 86 477", // Replace with phone number
      email: "olav.lilje@gmail.com", // Replace with email
      address: "Fredrikstad, Norway", // Replace with address/city
    },
    cvUrl: "/path/to/your-cv.pdf", // REPLACE with actual CV PDF URL or remove
    projectIds: ["1", "2", "3"],
  },

  // TEAM MEMBER 2
  {
    id: "2",
    name: "Line Henriksen", // Replace with actual name
    role: ["Web Developer", "Project Manager"], // Replace with actual roles
    location: "Fredrikstad, Norway", // Replace with location
    bio: "My expertise lies at the intersection of technology, project management, and design – a place where I can create, develop, optimize, and deliver user-friendly solutions.",
    skills: [
      "Project Management",
      "Frontend Development",
      "CSS and Web Design",
      "Responsive Design",
      "UI/UX",
      "Figma",
      "SEO Optimization",
      "Team Collaboration",
      "Communication",
      "Problem-solving",
      "Flexibility",
      "Time Management",
      "Git/GitHub",
    ],
    avatar:
      "/syntax-flow2/images/Line.jpg", // REPLACE with your profile image URL
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
      email: "linehenriksen0.com", // Replace with email
      github: "https://github.com/Flowerafro", // Replace or remove
      linkedin: "https://linkedin.com/in/yourprofile", // Replace or remove
    },
    contactInfo: {
      phone: "+47 482 22 033", // Replace with phone number
      email: "linehenriksen0@gmail.com", // Replace with email
      address: "Fredrikstad, Norway", // Replace with address/city
    },
    cvUrl: "/src/assets/ResumeLH.pdf", // REPLACE with actual CV PDF URL or remove
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

  // TEAM MEMBER 4
  {
    id: "4",
    name: "Khalid", // Replace with actual name
    role: ["Developer", "Problem Solver"], // Replace with actual roles
    location: "Kolbotn, Norway", // Replace with location
    bio: "Jeg er lidenskapelig opptatt av kodeutvikling og problemløsning. Jeg liker å bygge prosjekter fra idé til ferdig løsning, og å lære nye teknologier underveis. Som lagspiller er jeg lett å samarbeide med, holder god kommunikasjon, sier ifra når det trengs, og er fleksibel i arbeidsmåten min.",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "React",
      "HTML",
      "CSS",
      "SQL",
      "Miro",
      "Trello",
      "Microsoft Power BI",
      "PowerApps",
      "Linux",
      "Datasikkerhet",
    ],
    avatar:
      "/syntax-flow2/images/khalid.jpg", // REPLACE with your profile image URL
    highlights: [
      "Ekspertise innen kodeutvikling og problemløsning",
      "Lidenskap for å bygge prosjekter fra idé til ferdig løsning",
      "Sterk lagspiller med god kommunikasjon og fleksibilitet",
    ],
    experience: [
      {
        title: "Software Developer", // Replace with job title
        company: "Tech Solutions", // Replace with company name
        period: "2022 - Present", // Replace with period
      },
      {
        title: "Junior Developer",
        company: "Startup Company",
        period: "2021 - 2022",
      },
    ],
    education: [
      {
        degree: "Bachelor i Informatikk", // Replace with degree
        institution: "Høgskolen i Østfold", // Replace with institution
        year: "2021", // Replace with year
      },
    ],
    links: {
      email: "your.email@example.com", // Replace with email
      github: "https://github.com/Khosman23", // Replace or remove
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

  // TEAM MEMBER 5
  {
    id: "5",
    name: "YOUR NAME HERE", // Replace with actual name
    role: ["UI/UX Designer", "Frontend Developer"], // Replace with actual roles
    location: "Bergen, Norway", // Replace with location
    bio: "PLACEHOLDER: Add your professional bio here. Describe your expertise, passion, and what you bring to the team.",
    skills: [
      "Figma",
      "Adobe Creative Suite",
      "React",
      "CSS",
      "JavaScript",
      "User Research",
      "Prototyping",
      "Design Systems",
      "Accessibility",
      "Responsive Design",
    ],
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400", // REPLACE with your profile image URL
    highlights: [
      "PLACEHOLDER: Add your first career highlight",
      "PLACEHOLDER: Add your second career highlight",
      "PLACEHOLDER: Add your third career highlight",
    ],
    experience: [
      {
        title: "Senior UI/UX Designer", // Replace with job title
        company: "Design Studio", // Replace with company name
        period: "2020 - Present", // Replace with period
      },
      {
        title: "Frontend Developer",
        company: "Web Agency",
        period: "2018 - 2020",
      },
    ],
    education: [
      {
        degree: "Master i Interaksjonsdesign", // Replace with degree
        institution: "Universitetet i Bergen", // Replace with institution
        year: "2018", // Replace with year
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
    projectIds: ["2", "3", "4"],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "CareConnect – Software Engineering-prosjekt (Høst 2024)",
    summary:
      "Tverrfaglig utviklingsprosjekt som kobler helsepersonell og pasienter gjennom integrert system for hjemmetjenester og helsesensorer",
    description:
      "CareConnect er et tverrfaglig utviklingsprosjekt gjennomført ved Høgskolen i Østfold. Målet var å designe og implementere en digital løsning som kobler helsepersonell og pasienter gjennom et integrert system for hjemmetjenester og helsesensorer.",
    goals: [
      "Utvikle et skalerbart og modulært system ved hjelp av heksagonal arkitektur",
      "Muliggjøre sikker datautveksling mellom IoT-enheter, database og brukergrensesnitt",
      "Fokusere på brukervennlighet og personvern",
      "Designe løsning for reell bruk i helsesektoren",
    ],
    responsibilities: [
      "Teamleder og koordinator med ansvar for struktur, planlegging og dokumentasjon",
      "Design av arkitektur og systemintegrasjon",
      "Testing av API-endepunkter og integrasjon mellom moduler",
      "Kommunikasjon mellom delprosjekter og leveranseoppfølging",
      "Deltakelse i systemutvikling og prosjektstyring",
    ],
    outcomes: [
      "Fungerende prototype og fullstendig dokumentert arkitektur",
      "Erfaring med systemutvikling og prosjektstyring",
      "Innsikt i teamledelse og komplekse systemdesign",
      "Forståelse for hvordan systemer kan designes for helsesektoren",
    ],
    tags: ["Healthcare", "IoT", "Software Engineering"],
    tech: [
      "Java",
      "Spring Boot",
      "Maven",
      "REST API",
      "MongoDB",
      "Docker",
      "Postman",
      "IntelliJ IDEA",
      "GitHub",
      "Figma",
      "PlantUML",
      "Visual Paradigm",
      "Trello",
      "Miro",
    ],
    teamMemberIds: ["1", "2", "3"],
    teamMemberRoles: {
      "1": ["Team Leader", "Project Manager", "System Architect"],
      "2": ["DevOps Engineer", "Infrastructure Specialist"],
      "3": ["Business Analyst", "Quality Assurance"]
    },
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1080",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    ],
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