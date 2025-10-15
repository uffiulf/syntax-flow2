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
    bio: {
      no: "Engasjert IT-student med omfattende kompetanse innen prosjektledelse, forretningssystemer og teknologi. Jeg har en helhetlig forståelse av hvordan teknologi kan optimalisere prosesser, støtte strategiske mål og skape verdi for virksomheter. Med erfaring fra prosjektplanlegging, systemanalyse, nettverksinfrastruktur og UI/UX-design bidrar jeg med struktur, teknisk dybde og et sterkt fokus på kvalitet i alle prosjekter.",
      en: "Engaged IT student with comprehensive expertise in project management, business systems and technology. I have a holistic understanding of how technology can optimize processes, support strategic goals and create value for businesses. With experience from project planning, systems analysis, network infrastructure and UI/UX design, I contribute with structure, technical depth and a strong focus on quality in all projects."
    },
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
        title: "Teamleder – Project Management",
        company: "HiØ",
        period: "Høst 2025",
        description: "Leder et team på 7 studenter i et tverrfaglig prosjektarbeid med fokus på planlegging, risikohåndtering og leveranse etter Agile og Waterfall-prinsipper."
      },
      {
        title: "Teamleder – Digital markedsføring",
        company: "HiØ",
        period: "Høst 2025",
        description: "Leder et team på 3 personer i utvikling av digital kampanje og markedsstrategi for et fiktivt produkt."
      },
      {
        title: "Teamleder – Kommunikasjonsdesign",
        company: "HiØ",
        period: "Høst 2025",
        description: "Leder et team på 4 personer i design og produksjon av en digital kommunikasjonsløsning med fokus på struktur, idéutvikling og samarbeid."
      },
      {
        title: "Teamleder – Informasjonssikkerhet",
        company: "HiØ",
        period: "Høst 2025",
        description: "Leder et team på 3 personer i et fagprosjekt med fokus på sikkerhetsanalyse, sårbarhetsvurdering og tiltak for bedre informasjonssikkerhet."
      },
      {
        title: "Deltaker – Forretningssystemer",
        company: "HiØ",
        period: "Vår 2025",
        description: "Deltok i et team på 5 studenter som analyserte Powers servicehåndteringsprosess for garantisaker. Brukte BPMN-modellering og Business Model Canvas for prosessforbedring."
      },
      {
        title: "Deltaker – UI Designprosjekt",
        company: "HiØ",
        period: "Vår 2025",
        description: "Utviklet brukergrensesnitt for en fiktiv applikasjon. Fokus på brukervennlighet, prototyping og visuell kommunikasjon."
      },
      {
        title: "Deltaker – Databasesystemer",
        company: "HiØ",
        period: "Vår 2024",
        description: "Utviklet relasjonsdatabaser med SQL og ER-modellering. Knyttet databaser til applikasjoner i praksis."
      },
      {
        title: "Deltaker – Software Engineering og Testing",
        company: "HiØ",
        period: "Høst 2024",
        description: "Utviklet og testet programvareløsning i team på 5. Erfaring med systemarkitektur (MVC og hexagonal design), kravspesifikasjon og CI/CD-prosesser i tverrfaglig utviklingsmiljø."
      },
      {
        title: "Deltaker – Innføring i design av digitale produkter",
        company: "HiØ",
        period: "Høst 2023",
        description: "Arbeidet i gruppe på 3 med Design Thinking og idéutvikling for digitale konsepter. Fokus på brukerinvolvering og iterativ designprosess."
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
      github: "https://github.com/uffiulf", // Replace or remove
      linkedin: "https://www.linkedin.com/in/olav-liljeberg-943306348/", // Replace or remove
    },
    contactInfo: {
      phone: "+47 944 86 477", // Replace with phone number
      email: "olav.lilje@gmail.com", // Replace with email
      address: "Fredrikstad, Norway", // Replace with address/city
    },
    cvUrl: "/path/to/your-cv.pdf", // REPLACE with actual CV PDF URL or remove
    projectIds: ["1", "5", "6", "7", "8"],
  },

  // TEAM MEMBER 2
  {
    id: "2",
    name: "Line Henriksen", // Replace with actual name
    role: ["Utvikler", "Designer UX/UI", "Frontend Developer"], // Replace with actual roles
    location: "Fredrikstad, Norway", // Replace with location
    bio: {
      no: "En resultatorientert og løsningsfokusert fagperson med sterk evne til å kombinere teknologi, prosjektledelse og design. Kjent for høy effektivitet, struktur og enestående gjennomføringsevne. Har bred erfaring innen prosjektkoordinering, design thinking, frontendutvikling og digital markedsføring. Kommunikasjon og dokumentasjon er blant de største styrkene, noe som sikrer klare prosesser og solide leveranser i alle prosjektfaser. En drivende kraft i teamarbeid som bidrar til å skape fremdrift, kvalitet og målbare resultater.",
      en: "A results-oriented and solution-focused professional with strong ability to combine technology, project management and design. Known for high efficiency, structure and outstanding execution capability. Has broad experience in project coordination, design thinking, frontend development and digital marketing. Communication and documentation are among the greatest strengths, ensuring clear processes and solid deliveries in all project phases. A driving force in teamwork that contributes to creating progress, quality and measurable results."
    },
    skills: [
      "Project Management",
      "Coordination",
      "Event Production",
      "Logistics",
      "Design Thinking",
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
      "API Integration",
      "JavaScript",
      "TypeScript",
      "React",
      "HTML",
      "Digital Marketing",
      "Sanity CMS",
      "MYSQL",
      "Cloudflare",
    ],
    avatar:
      "/syntax-flow2/images/Line.jpg",
    highlights: [
      "Etablerte standardiserte digitale systemer for kjøre- og fremdriftsplaner (via Google Docs/Excel) for å effektivisere informasjonsflyt og sikre umiddelbar tilgjengelighet for alle team.",
      "Initierte og ledet overgangen til bookingsystemet ABOSS, inkludert dataoverføring og Change Management-opplæring av teamet, for å digitalisere kontrakt- og bookinghåndtering",
    ],
    experience: [
      {
        title: "Metro Driver",
        company: "Sporveien AS",
        period: "2020 - 2025",
      },
      {
        title: "Project Leader: Trolljegern",
        company: "Høgskolen i Østfold: UI-Design Project",
        period: "2025",
      },
      {
        title: "Web Developer: Daily Bugle - a digital news platform",
        company: "Høgskolen i Østfold: Kommunikasjonsdesign",
        period: "2024",
      },
      {
        title: "Grafisk Designer: Laftemannen",
        company: "Høgskolen i Østfold: Grafisk Design",
        period: "2025",
      },
      {
        title: "Production Manager",
        company: "Parkteatret Scene AS",
        period: "2013 - 2020",
      },
      {
        title: "Office and Booking Agent",
        company: "Backstage Management & Production",
        period: "2017 - 2019",
      },
      {
        title: "Arena Producer",
        company: "Ultima Festival",
        period: "2019",
      },
      {
        title: "Volunteer Coordinator",
        company: "Tons of Rock Festival",
        period: "2019",
      },
      {
        title: "Merch sales",
        company: "Desertfest: London",
        period: "2019 - 2022",
      },
      {
        title: "Production Manager",
        company: "Høstsabbat Festival",
        period: "2017 - 2020",
      },
      {
        title: "Artist Transport and Accommodation",
        company: "Findings Festival",
        period: "2017 - 2018",
      },
      {
        title: "Bar and Inventory Driver",
        company: "Slottsfjell Festival",
        period: "2017",
      },
      {
        title: "Production Crew and Host",
        company: "Konsertforeningen: Blårollinger",
        period: "2014 - 2018",
      },
      {
        title: "Assistant Manager and Cafe Staff",
        company: "Cafe Fresko",
        period: "2014 - 2016",
      },
      {
        title: "Bartender and Waitress",
        company: "Cafe Stolen",
        period: "2011 - 2013",
      },
      {
        title: "Restaurant worker",
        company: "IKEA FOOD Slependen",
        period: "2009 - 2011",
      },
    ],
    education: [
      {
        degree: "Bachelor i informasjonssystemer",
        institution: "Høgskolen i Østfold (HiØ)",
        year: "2023 - 2026",
      },
      {
        degree: "Diploma i Prosjektledelse",
        institution:
          "Nordic Institute for Stage and Studio (NISS)",
        year: "2013",
      },
      {
        degree: "Year Study in Nutrition Science",
        institution:
          "Bjørknes Høyskole",
        year: "2016",
      },
      {
        degree: "Year Study in Social Nutrition Studies",
        institution:
          "Høgskolen i Oslo & Akershus (HiOA)",
        year: "2017",
      },
    ],
    links: {
      email: "linehenriksen0@gmail.com",
      github: "https://github.com/Flowerafro",
      linkedin: "https://www.linkedin.com/in/line-henriksen-542a44290/",
      website: "https://flowerafro.github.io/application-cv/",
    },
    contactInfo: {
      phone: "+47 482 22 033", // Replace with phone number
      email: "linehenriksen0@gmail.com", // Replace with email
      address: "Fredrikstad, Norway", // Replace with address/city
    },
    cvUrl: "/src/assets/ResumeLH.pdf", // REPLACE with actual CV PDF URL or remove
    projectIds: ["5", "6", "7"],
  },

  // TEAM MEMBER 3
  {
    id: "3",
    name: "André Moore", // Replace with actual name
    role: ["Business Analyst", "Quality Assurance (QA)", "IT-risikokonsulent"], // Replace with actual roles
    location: "Halden, Norway", // Replace with location
    bio: {
      no: "Min ekspertise ligger i systematisk feilsøking og analyse av komplekse tekniske problemer. Jeg brenner for å identifisere rotårsaker og utvikle robuste løsninger som sikrer stabil og sikker drift. Lidenskapen min er å omsette teknisk innsikt til praktiske og effektive løsninger som hjelper både teamet og sluttbrukeren.",
      en: "My expertise lies in systematic troubleshooting and analysis of complex technical problems. I am passionate about identifying root causes and developing robust solutions that ensure stable and secure operations. My passion is to translate technical insight into practical and effective solutions that help both the team and end users."
    },
    skills: [
      "Javascript",
      "Figma",
      "Cisco",
      "Feilsøking",
      "Front End",
      "Kundebehandling",
      "Systemanalyse",
      "Prosesskartlegging",
      "Quality Assurance",
      "IT-risikokonsulent",
      "Business Analysis",
    ],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400", // REPLACE with your profile image URL
    highlights: [
      "Systematisk feilsøking og analyse av komplekse tekniske problemer",
      "Identifisering av rotårsaker og utvikling av robuste løsninger",
      "Omsetting av teknisk innsikt til praktiske og effektive løsninger",
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
        degree: "Bachelor i informasjonssystemer", // Replace with degree
        institution: "Høgskolen i Østfold (HiØ)", // Replace with institution
        year: "2023 - 2026", // Replace with year
      },
    ],
    links: {
      email: "andre-moore@hotmail.com", // Replace with email
      github: "https://github.com/AndreMooore", // Replace or remove
      linkedin: "https://www.linkedin.com/in/andr%C3%A9-moore-670401389", // Replace or remove
    },
    contactInfo: {
      phone: "+47 952 55 517", // Replace with phone number
      email: "andre-moore@hotmail.com", // Replace with email
      address: "Halden, Norway", // Replace with address/city
    },
    cvUrl: "/path/to/your-cv.pdf", // REPLACE with actual CV PDF URL or remove
    projectIds: ["5", "6", "7"],
  },

  // TEAM MEMBER 4
  {
    id: "4",
    name: "Khalid Hassan Osman", // Replace with actual name
    role: ["Utvikler", "Lowcode"], // Replace with actual roles
    location: "Kolbotn, Norway", // Replace with location
    bio: {
      no: "Jeg er lidenskapelig opptatt av kodeutvikling og problemløsning. Jeg liker å bygge prosjekter fra idé til ferdig løsning, og å lære nye teknologier underveis. Som lagspiller er jeg lett å samarbeide med, holder god kommunikasjon, sier ifra når det trengs, og er fleksibel i arbeidsmåten min.",
      en: "I am passionate about code development and problem solving. I enjoy building projects from idea to finished solution, and learning new technologies along the way. As a team player, I am easy to collaborate with, maintain good communication, speak up when needed, and am flexible in my working methods."
    },
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
        degree: "Bachelor i informasjonssystemer", // Replace with degree
        institution: "Høgskolen i Østfold (HiØ)", // Replace with institution
        year: "2023 - 2026", // Replace with year
      },
    ],
    links: {
      email: "khalid.h.osman@hiof.no", // Replace with email
      github: "https://github.com/Khosman23", // Replace or remove
      linkedin: "https://linkedin.com/in/yourprofile", // Replace or remove
    },
    contactInfo: {
      phone: "N/A", // Replace with phone number
      email: "khalid.h.osman@hiof.no", // Replace with email
      address: "Oslo, Norway", // Replace with address/city
    },
    cvUrl: "/path/to/your-cv.pdf", // REPLACE with actual CV PDF URL or remove
    projectIds: ["7"],
  },

  // TEAM MEMBER 5
  {
    id: "5",
    name: "Ludvig Valter Angell Uteng", // Replace with actual name
    role: ["Utvikler", "Backend Developer", "Frontend Developer"], // Replace with actual roles
    location: "Soul, Korea", // Replace with location
    bio: {
      no: "Erfaren utvikler med bred kompetanse innen både backend og frontend utvikling. Spesialisert i Java, JavaScript, React og moderne webteknologier. Har erfaring med fullstack-utvikling og brenner for å skape robuste og brukervennlige løsninger.",
      en: "Experienced developer with broad expertise in both backend and frontend development. Specialized in Java, JavaScript, React and modern web technologies. Has experience with fullstack development and is passionate about creating robust and user-friendly solutions."
    },
    skills: [
      "Java",
      "JavaScript",
      "React",
      "HTML",
      "CSS",
      "Kotlin",
      "Backend Development",
      "Frontend Development",
      "Full Stack Development",
      "Web Development",
    ],
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400", // REPLACE with your profile image URL
    highlights: [
      "Fullstack-utvikler med kompetanse innen både backend og frontend",
      "Spesialisert i Java, JavaScript og React-utvikling",
      "Erfaring med moderne webteknologier og utviklingsmetodikk",
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
        degree: "Bachelor i informatikk", // Replace with degree
        institution: "Høgskolen i Østfold (HiØ)", // Replace with institution
        year: "2023 - 2026", // Replace with year
      },
    ],
    links: {
      email: "ludvig.v.uteng@hiof.no", // Replace with email
      github: "https://github.com/Valtyr-Angel", // Replace or remove
      linkedin: "https://linkedin.com/in/ludvig-valter-angell-uteng", // Replace or remove
    },
    contactInfo: {
      phone: "N/A", // Replace with phone number
      email: "ludvig.v.uteng@hiof.no", // Replace with email
      address: "Soul, Korea", // Replace with address/city
    },
    cvUrl: "/path/to/your-cv.pdf", // REPLACE with actual CV PDF URL or remove
    projectIds: ["1"    ],
  },
 
];

export const projects: Project[] = [
  {
    id: "1",
    title: "CareConnect – Software Engineering-prosjekt (Høst 2024)",
    summary: {
      no: "Tverrfaglig utviklingsprosjekt som kobler helsepersonell og pasienter gjennom integrert system for hjemmetjenester og helsesensorer",
      en: "Interdisciplinary development project connecting healthcare personnel and patients through an integrated system for home services and health sensors"
    },
    description: {
      no: "CareConnect er et tverrfaglig utviklingsprosjekt gjennomført ved Høgskolen i Østfold. Målet var å designe og implementere en digital løsning som kobler helsepersonell og pasienter gjennom et integrert system for hjemmetjenester og helsesensorer.",
      en: "CareConnect is an interdisciplinary development project conducted at Østfold University College. The goal was to design and implement a digital solution that connects healthcare personnel and patients through an integrated system for home services and health sensors."
    },
    goals: {
      no: [
        "Utvikle et skalerbart og modulært system ved hjelp av heksagonal arkitektur",
        "Muliggjøre sikker datautveksling mellom IoT-enheter, database og brukergrensesnitt",
        "Fokusere på brukervennlighet og personvern",
        "Designe løsning for reell bruk i helsesektoren",
      ],
      en: [
        "Develop a scalable and modular system using hexagonal architecture",
        "Enable secure data exchange between IoT devices, database and user interface",
        "Focus on user-friendliness and privacy",
        "Design solution for real use in the healthcare sector",
      ]
    },
    responsibilities: {
      no: [
        "Teamleder og koordinator med ansvar for struktur, planlegging og dokumentasjon",
        "Design av arkitektur og systemintegrasjon",
        "Testing av API-endepunkter og integrasjon mellom moduler",
        "Kommunikasjon mellom delprosjekter og leveranseoppfølging",
        "Deltakelse i systemutvikling og prosjektstyring",
      ],
      en: [
        "Team leader and coordinator with responsibility for structure, planning and documentation",
        "Architecture design and system integration",
        "Testing of API endpoints and integration between modules",
        "Communication between sub-projects and delivery follow-up",
        "Participation in system development and project management",
      ]
    },
    outcomes: {
      no: [
        "Fungerende prototype og fullstendig dokumentert arkitektur",
        "Erfaring med systemutvikling og prosjektstyring",
        "Innsikt i teamledelse og komplekse systemdesign",
        "Forståelse for hvordan systemer kan designes for helsesektoren",
      ],
      en: [
        "Working prototype and fully documented architecture",
        "Experience with system development and project management",
        "Insight into team leadership and complex system design",
        "Understanding of how systems can be designed for the healthcare sector",
      ]
    },
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
    teamMemberIds: ["1", "5"],
    teamMemberRoles: {
      "1": ["Team Leader", "Project Manager", "System Architect"],
      "5": ["Backend Developer", "Full Stack Developer"]
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
    title: "Project Management: Oplero (Ongoing)",
    summary: {
      no: "Oplero er en smart læringsplattform som transformerer undervisning ved å gjøre den inkluderende og effektiv. Den fjerner administrativ byrde for forelesere gjennom automatisert gruppeinndeling, samtidig som den sikrer lik tilgang til læringsinnhold for alle studenter via GDPR-kompatible opptak, teksting og AI-verktøy.",
      en: "Oplero is a smart learning platform that transforms teaching by making it inclusive and effective. It removes administrative burden from lecturers through automated group allocation, while ensuring equal access to learning content for all students via GDPR-compliant recordings, transcription and AI tools."
    },
    description: {
      no: "Oplero er en GDPR-kompatibel digital læringsplattform utviklet for å adressere kritiske utfordringer i høyere utdanning, spesielt mangelen på fleksibilitet, tilgjengelighet og ineffektiv administrativ praksis. Prosjektets kjernefokus er å bygge en robust løsning som ivaretar både studenters læringsbehov og foreleseres administrative byrde.",
      en: "Oplero is a GDPR-compliant digital learning platform developed to address critical challenges in higher education, particularly the lack of flexibility, accessibility and inefficient administrative practices. The project's core focus is to build a robust solution that addresses both students' learning needs and lecturers' administrative burden."
    },
    goals: {
      no: [
        "Tilgjengelighet og Inkludering",
        "Automatisert Effektivitet",
        "Engasjement og Innsikt",
        "Sikre overholdelse GDPR",
      ],
      en: [
        "Accessibility and Inclusion",
        "Automated Efficiency",
        "Engagement and Insight",
        "Ensure GDPR compliance",
      ]
    },
    responsibilities: {
      no: [
        "Utvikling av Kjernefunksjonalitet - Utvikle AI-motor for sanntidsteksting og transkripsjon. Kode algoritmen for preferansebasert auto-gruppeinndeling. Bygge modul for anonym spørsmålschat",
        "Sikre Compliance og Sikkerhet - Implementere kryptering av lagrede data. Etablere prosedyrer for Feide/2FA autentisering. Utføre juridisk gjennomgang for full GDPR-kompatibilitet",
        "Design og Brukeropplevelse - Utvikle rollebasert UI (Analytisk for foreleser, Forenklet for student). Sikre Universell Utforming i hele plattformen.",
        "Infrastruktur og Ytelse - Sette opp skylagring og database (SQL/NoSQL). Teste ytelsen mot 200 samtidige brukere."
      ],
      en: [
        "Core Functionality Development - Develop AI engine for real-time transcription and transcription. Code algorithm for preference-based auto-group allocation. Build module for anonymous question chat",
        "Ensure Compliance and Security - Implement encryption of stored data. Establish procedures for Feide/2FA authentication. Conduct legal review for full GDPR compliance",
        "Design and User Experience - Develop role-based UI (Analytical for lecturer, Simplified for student). Ensure Universal Design throughout the platform.",
        "Infrastructure and Performance - Set up cloud storage and database (SQL/NoSQL). Test performance against 200 concurrent users."
      ]
    },
    outcomes: {
      no: [
        "Økt Effektivitet for Foreleser - Reduksjon av administrativ tid brukt på gruppeinndeling (Timer spart). Økt tilfredshet med arbeidshverdagen (Stressfri gruppesamarbeid).",
        "Bedre Læringsutbytte - Økning i studentenes gjennomføringsgrad og redusert frafall/stryk. Høyere score på læringsutbyttemålinger.",
        "Forbedret Tilgjengelighet - 100% av innholdet er tilgjengelig for studenter uavhengig av fravær eller språkbarriere (Fleksibel og tilpasset læring)",
        "Strategisk Verdi for Institusjonen - Forsterket omdømme som en digital og studentvennlig institusjon. Redusert juridisk risiko knyttet til håndtering av videoopptak og personvern.",
        "Pedagogisk Kvalitet - Økt studentengasjement målt gjennom bruksdata i Oplero Engage. Forbedret formidlingsevne hos foreleser (kvalitativt mål).",
      ],
      en: [
        "Increased Efficiency for Lecturers - Reduction of administrative time spent on group allocation (Hours saved). Increased satisfaction with working day (Stress-free group collaboration).",
        "Better Learning Outcomes - Increase in students' completion rate and reduced dropout/failure. Higher scores on learning outcome measurements.",
        "Improved Accessibility - 100% of content is accessible to students regardless of absence or language barriers (Flexible and adapted learning)",
        "Strategic Value for the Institution - Strengthened reputation as a digital and student-friendly institution. Reduced legal risk related to handling video recordings and privacy.",
        "Pedagogical Quality - Increased student engagement measured through usage data in Oplero Engage. Improved communication skills in lecturers (qualitative measure).",
      ]
    },
    tags: ["Education", "GDPR", "Availability", "AI", "Automation", "Efficiency", "Engagement"],
    tech: [
      "React",
      "TypeScript",
      "MySQL",
      "Cloud storage",
      "AI speech-to-text",
      "Desktop & Mobile App (IOS/Android)",
      "2FA/Feide Authentication",
      "Hendelsesloggging",
    ],
    teamMemberIds: ["1", "2", "3", "4"],
    coverImage:
      "https://cdn.pixabay.com/photo/2020/10/17/15/14/girl-5662435_1280.jpg",
    images: [
      "https://cdn.pixabay.com/photo/2023/01/02/21/11/conference-7693055_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557399_1280.jpg",
    ],
  },
  {
    id: "3",
    title: "Power – Forretningssystemer (Høst 2024)",
    summary: {
      no: "Et omfattende gruppeprosjekt i faget Forretningssystemer ved Høgskolen i Østfold som analyserte hvordan bedriften Power bruker ERP- og forretningssystemer for å skape verdi og effektivisere interne prosesser.",
      en: "A comprehensive group project in the Business Systems course at Østfold University College that analyzed how the company Power uses ERP and business systems to create value and streamline internal processes."
    },
    description: {
      no: "Power – Forretningssystemer (Høst 2024) var et omfattende gruppeprosjekt i faget Forretningssystemer ved Høgskolen i Østfold. Oppgaven gikk ut på å analysere hvordan bedriften Power bruker ERP- og forretningssystemer for å skape verdi og effektivisere interne prosesser.",
      en: "Power – Business Systems (Fall 2024) was a comprehensive group project in the Business Systems course at Østfold University College. The task was to analyze how the company Power uses ERP and business systems to create value and streamline internal processes."
    },
    goals: {
      no: [
        "Å forstå hvordan et forretningssystem støtter bedriftens strategiske mål",
        "Kartlegge hvordan moduler som CRM, SCM og HR påvirker verdiløftet og forretningsmodellen",
        "Analysere sammenhenger i Business Model Canvas",
        "Dokumentere prosesser og deres effekt på forretningsverdien",
      ],
      en: [
        "Understand how a business system supports the company's strategic goals",
        "Map how modules such as CRM, SCM and HR affect value proposition and business model",
        "Analyze relationships in Business Model Canvas",
        "Document processes and their effect on business value",
      ]
    },
    responsibilities: {
      no: [
        "Bidro med analyse av ERP-moduler",
        "Sammenhenger i Business Model Canvas",
        "Dokumentasjon av prosesser",
        "Gruppesamarbeid og koordinering",
      ],
      en: [
        "Contributed with analysis of ERP modules",
        "Relationships in Business Model Canvas",
        "Process documentation",
        "Group collaboration and coordination",
      ]
    },
    outcomes: {
      no: [
        "Prosjektet resulterte i en helhetlig modell som viser hvordan Power utnytter ERP-systemer for å styrke kundeverdi",
        "Verdifull erfaring innen systemanalyse, forretningsforståelse og prosessforbedring",
        "Forbedret effektivitet og bærekraft i Power's forretningsmodell",
        "Dyb forståelse av hvordan forretningssystemer støtter strategiske mål",
      ],
      en: [
        "The project resulted in a comprehensive model showing how Power utilizes ERP systems to strengthen customer value",
        "Valuable experience in systems analysis, business understanding and process improvement",
        "Improved efficiency and sustainability in Power's business model",
        "Deep understanding of how business systems support strategic goals",
      ]
    },
    tags: ["Business Analysis", "ERP", "Process Improvement"],
    tech: [
      "Microsoft 365",
      "Miro",
      "Visual Paradigm",
      "Excel",
      "Word",
      "PowerPoint",
    ],
    teamMemberIds: ["3", "1", "2"],
    teamMemberRoles: {
      "3": ["Business Analyst", "IT-risikokonsulent"],
      "1": ["Project Coordinator", "Team Lead"],
      "2": ["System Analyst", "Documentation Specialist"]
    },
    coverImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1080",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    ],
  },
  {
    id: "4",
    title: "Trolljegeren – UI-designprosjekt (Vår 2025)",
    summary: {
      no: "Et omfattende UI-designprosjekt gjennomført ved Høgskolen i Østfold for å utvikle en digital løsning som øker engasjementet rundt Trollstien og Ormtjernhytta i Halden. Prosjektet resulterte i en fungerende prototype av en mobilapp som bruker gamification for å motivere barn til å utforske naturen.",
      en: "A comprehensive UI design project conducted at Østfold University College to develop a digital solution that increases engagement around Trollstien and Ormtjernhytta in Halden. The project resulted in a working prototype of a mobile app that uses gamification to motivate children to explore nature."
    },
    description: {
      no: "Trolljegeren – UI-designprosjekt (Vår 2025) var et omfattende UI-designprosjekt gjennomført ved Høgskolen i Østfold for å utvikle en digital løsning som øker engasjementet rundt Trollstien og Ormtjernhytta i Halden. Prosjektet resulterte i en fungerende prototype av en mobilapp som bruker gamification for å motivere barn til å utforske naturen.",
      en: "Trolljegeren – UI Design Project (Spring 2025) was a comprehensive UI design project conducted at Østfold University College to develop a digital solution that increases engagement around Trollstien and Ormtjernhytta in Halden. The project resulted in a working prototype of a mobile app that uses gamification to motivate children to explore nature."
    },
    goals: {
      no: [
        "Å skape økt glede og aktivitet blant barn i alderen 8–11 år gjennom en spillifisert løsning",
        "Kombinere natur, kultur og teknologi i en engasjerende opplevelse",
        "Bygge bro mellom fysisk aktivitet og digital underholdning",
        "Utvikle to spillmoduser: 'Jeger' og 'Utforsker'",
      ],
      en: [
        "Create increased joy and activity among children aged 8-11 through a gamified solution",
        "Combine nature, culture and technology in an engaging experience",
        "Build bridges between physical activity and digital entertainment",
        "Develop two game modes: 'Hunter' and 'Explorer'",
      ]
    },
    responsibilities: [
      "Deltok i innsiktsarbeid og idégenerering",
      "Design av brukeropplevelse og testing",
      "Bidro i utvikling av spillmekanikk og fargepalett",
      "Prototyping i Figma og dokumentasjon",
      "Usability testing og think-aloud-metode",
    ],
    outcomes: [
      "Komplett prototype med to spillmoduser som begge ble testet og evaluert av målgruppen",
      "Svært positive tilbakemeldinger fra målgruppen (barn 8-11 år)",
      "Løsningen viser hvordan gamification kan brukes til å øke deltakelse og opplevelsesverdi",
      "Verdifull erfaring innen UI/UX design og brukertesting",
    ],
    tags: ["UI/UX Design", "Gamification", "Prototyping", "Mobile App"],
    tech: [
      "Figma",
      "Miro",
      "Trello",
      "Canva",
      "Google Docs",
      "Google Forms",
      "ChatGPT",
      "Gemini",
      "Sora",
      "Design Thinking",
      "Usability Testing",
    ],
    teamMemberIds: ["1", "2", "3"],
    teamMemberRoles: {
      "1": ["UX Designer", "Game Mechanic Specialist"],
      "2": ["Project Manager", "UI Designer", "Prototyping Specialist"],
      "3": ["Developer", "Testing Coordinator"]
    },
    coverImage:
      "/syntax-flow2/images/logoUbg.png",
    images: [
      "/syntax-flow2/images/explorer.png",
      "/syntax-flow2/images/hunter.png",
    ],
    links: {
      demo: "https://flowerafro.github.io/Trolljegern/",
      demoText: "Trolljegeren Teaser",
    },
  },
  {
    id: "7",
    title: "Oplero – Prosjektledelse (Høst 2025)",
    summary: {
      no: "Et pågående prosjekt i faget Prosjektledelse ved Høgskolen i Østfold. Oplero er en digital plattform for forelesninger, sanntidssamarbeid og AI-drevne læringsverktøy.",
      en: "An ongoing project in the Project Management course at Østfold University College. Oplero is a digital platform for lectures, real-time collaboration and AI-driven learning tools."
    },
    description: {
      no: "Oplero – Prosjektledelse (Høst 2025) er et pågående prosjekt i faget Prosjektledelse ved Høgskolen i Østfold. Oplero er en digital plattform for forelesninger, sanntidssamarbeid og AI-drevne læringsverktøy.",
      en: "Oplero – Project Management (Fall 2025) is an ongoing project in the Project Management course at Østfold University College. Oplero is a digital platform for lectures, real-time collaboration and AI-driven learning tools."
    },
    goals: [
      "Å utvikle en pilot for Høgskolen i Østfold som kombinerer forelesningsopptak, gruppefunksjoner og sanntidsinteraksjon mellom studenter og forelesere",
      "Implementere gruppeinndeling og AI-assistent",
      "Sikre GDPR-kompatibel databehandling",
      "Levere en fungerende prototype",
    ],
    responsibilities: [
      "Prosjektleder – ansvarlig for planlegging, koordinering og leveranse",
      "Team Lead og koordinering",
      "Scrum Master og prosjektmedarbeid",
      "Design Lead og prosjektmedarbeid",
      "Prosjektmedarbeid og DesignTeam",
    ],
    outcomes: [
      "Prosjektet er i utvikling og skal resultere i en prototype med implementert gruppeinndeling",
      "AI-assistent og GDPR-kompatibel databehandling",
      "Digital plattform for forelesninger og sanntidssamarbeid",
      "Pilot for Høgskolen i Østfold",
    ],
    tags: ["Project Management", "AI", "Education", "In Progress"],
    tech: [
      "Miro",
      "Trello",
      "Figma",
      "Microsoft 365",
      "ChatGPT",
      "Gemini",
      "Sora",
    ],
    teamMemberIds: ["1", "3", "2", "4"],
    teamMemberRoles: {
      "1": ["Team Lead"],
      "3": ["Scrum Master", "Prosjektmedarbeider"],
      "2": ["Design Lead", "Prosjektmedarbeider"],
      "4": ["Prosjektmedarbeider", "DesignTeam"]
    },
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1080",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    ],
  },
  {
    id: "8",
    title: "Treningsprogramsystem – Database og Systemdesign",
    summary: {
      no: "Et database- og systemdesignprosjekt utviklet for å håndtere treningsplaner, øvelser og resultater mellom trenere og utøvere. Systemet legger til rette for individuell oppfølging, logging av resultater og visuell progresjonsanalyse.",
      en: "A database and system design project developed to handle training plans, exercises and results between trainers and athletes. The system facilitates individual follow-up, result logging and visual progression analysis."
    },
    description: {
      no: "Treningsprogramsystem – Database og Systemdesign er et database- og systemdesignprosjekt utviklet for å håndtere treningsplaner, øvelser og resultater mellom trenere og utøvere. Systemet legger til rette for individuell oppfølging, logging av resultater og visuell progresjonsanalyse.",
      en: "Training Program System – Database and System Design is a database and system design project developed to handle training plans, exercises and results between trainers and athletes. The system facilitates individual follow-up, result logging and visual progression analysis."
    },
    goals: [
      "Å utforme en relasjonsdatabase i MySQL som støtter opprettelse og administrasjon av treningsplaner",
      "Implementere funksjoner for logging, progresjon og tilgangsstyring",
      "Sikre dataintegritet med relasjoner og fremmednøkler",
      "Støtte individuell oppfølging og visuell progresjonsanalyse",
    ],
    responsibilities: [
      "Utvikler – ansvarlig for hele prosjektet",
      "Kravspesifikasjon og systemutforming",
      "Databaseutforming og ER-modellering",
      "1NF–3NF normalisering",
      "Testing og implementering",
    ],
    outcomes: [
      "En fullstendig database i MySQL med tabeller for brukere, treningsplaner, øvelser og logger",
      "Implementert med relasjoner og fremmednøkler for å sikre dataintegritet",
      "Funksjoner for logging og progresjon",
      "Tilgangsstyring mellom trenere og utøvere",
    ],
    tags: ["Database", "MySQL", "System Design", "Completed"],
    tech: [
      "MySQL Workbench",
      "SQL",
      "ER-modellering",
      "1NF–3NF normalisering",
      "Database Design",
    ],
    teamMemberIds: ["1"],
    teamMemberRoles: {
      "1": ["Utvikler"]
    },
    coverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    ],
  },
];