import type {
  Achievement,
  Certification,
  EducationItem,
  ExperienceItem,
  Project,
  SkillCategory,
  SocialLink,
  Testimonial,
} from "@/types";

/**
 * Profile sourced from LinkedIn resume PDF (Profile.pdf) and
 * https://www.linkedin.com/in/shahriar-newaz/
 * Items marked PLACEHOLDER / isSample / isPlaceholder should be replaced with verified details.
 */
export const siteConfig = {
  name: "Shahriar Newaz",
  firstName: "Shahriar",
  lastName: "Newaz",
  title: "Software Engineer",
  currentRole: "Software Engineer @ SELISE Digital Platforms",
  headline: "Software Engineer at SELISE · ASP.NET Core, JavaScript & TypeScript",
  location: "Bangladesh",
  email: "shahriar.shh@gmail.com",
  website: "https://shahriarnewaz.dev",
  yearsOfExperience: 4,
  summary:
    "Software Engineer at SELISE Digital Platforms with a strong foundation in ASP.NET Core, JavaScript, and TypeScript. Experienced in building modern web applications and passionate about problem-solving through competitive programming—recognized across ICPC and university programming contests in Bangladesh.",
  // PLACEHOLDER: Expand with a first-person About summary from LinkedIn once available
  careerOverview:
    "Since April 2022, I have been contributing as a Software Engineer at SELISE Digital Platforms—a global IT consulting and software development company headquartered in Zürich with delivery teams in Bangladesh and beyond. Before and alongside professional work, I competed in national and regional programming contests, including ICPC Asia Dhaka Regional.",
  interests: [
    "Full-stack web development",
    "ASP.NET Core backends",
    "TypeScript / JavaScript",
    "Competitive programming",
    "Problem solving & algorithms",
    "Clean, maintainable software",
  ],
  strengths: [
    "ASP.NET Core development",
    "JavaScript & TypeScript",
    "Analytical problem solving",
    "Competitive programming mindset",
    "Continuous learning",
    "Collaborative delivery",
  ],
  languages: [
    { name: "English", level: "Professional working" },
    { name: "Bangla", level: "Native or bilingual" },
  ],
};

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shahriar-newaz/",
    icon: "linkedin",
  },
  {
    name: "Email",
    href: "mailto:shahriar.shh@gmail.com",
    icon: "email",
  },
  {
    name: "StopStalk",
    href: "https://www.stopstalk.com/user/profile/shahriar321",
    icon: "stopstalk",
  },
  // PLACEHOLDER: Add GitHub URL when available
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: "github",
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const experiences: ExperienceItem[] = [
  {
    id: "selise",
    company: "SELISE Digital Platforms",
    companyUrl: "https://www.selisegroup.com/",
    location: "Bangladesh",
    roles: [
      {
        title: "Software Engineer",
        startDate: "Apr 2022",
        endDate: "Present",
        duration: "4 yrs 4 mos",
        description:
          "Software Engineer at SELISE Digital Platforms (SELISE Group)—a consulting and software development company delivering strategy, platform development, and application management for global clients.",
        // PLACEHOLDER: Replace with your real day-to-day responsibilities from LinkedIn
        responsibilities: [
          "Develop and maintain production software using ASP.NET Core, JavaScript, and TypeScript",
          "Collaborate with cross-functional teams on client digital platforms",
          "Participate in design, implementation, testing, and delivery cycles",
          "Contribute to code quality, reviews, and continuous improvement",
        ],
        // PLACEHOLDER: Add verified achievements
        achievements: [
          "Ongoing contribution to SELISE engineering delivery since April 2022",
          "Applied competitive programming strengths to practical software problem-solving",
        ],
        technologies: ["ASP.NET Core", "JavaScript", "TypeScript"],
      },
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "layout",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 88 },
      // PLACEHOLDER levels / stack details — refine to match your real stack
      { name: "HTML / CSS", level: 85 },
      { name: "Modern SPA patterns", level: 78 },
    ],
  },
  {
    name: "Backend",
    icon: "server",
    skills: [
      { name: "ASP.NET Core", level: 92 },
      { name: "C# / .NET", level: 88 },
      { name: "REST APIs", level: 85 },
      { name: "Server-side architecture", level: 80 },
    ],
  },
  {
    name: "Cloud",
    icon: "cloud",
    // PLACEHOLDER category — expand with Azure/AWS if applicable
    skills: [
      { name: "Cloud-ready .NET apps", level: 72 },
      { name: "CI/CD familiarity", level: 70 },
    ],
  },
  {
    name: "Databases",
    icon: "database",
    // PLACEHOLDER — confirm SQL Server / PostgreSQL / etc.
    skills: [
      { name: "SQL / Relational DBs", level: 80 },
      { name: "Entity Framework (typical .NET)", level: 75 },
    ],
  },
  {
    name: "DevOps",
    icon: "cog",
    // PLACEHOLDER
    skills: [
      { name: "Git", level: 88 },
      { name: "Agile delivery", level: 82 },
    ],
  },
  {
    name: "Languages",
    icon: "code",
    skills: [
      { name: "C#", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 90 },
      { name: "Algorithms / CP", level: 85 },
    ],
  },
  {
    name: "Tools",
    icon: "wrench",
    skills: [
      { name: "Visual Studio / VS Code", level: 90 },
      { name: "Competitive programming platforms", level: 85 },
      { name: "StopStalk tracking", level: 80 },
    ],
  },
];

export const projects: Project[] = [
  // PLACEHOLDER / SAMPLE: Infer from SELISE role — replace with real project case studies
  {
    id: "selise-platforms",
    title: "Enterprise Digital Platforms",
    description:
      "Sample project card based on SELISE Digital Platforms work—building and maintaining client-facing software with ASP.NET Core and modern TypeScript/JavaScript front ends.",
    features: [
      "ASP.NET Core service development",
      "TypeScript / JavaScript UI integration",
      "Collaborative agile delivery",
      "Production support & iteration",
    ],
    techStack: ["ASP.NET Core", "TypeScript", "JavaScript", "C#"],
    image: "/projects/modelon-impact.svg",
    isSample: true,
    period: "2022 – Present",
  },
  {
    id: "api-services",
    title: "RESTful .NET API Services",
    description:
      "Sample project illustrating typical ASP.NET Core API work—secure endpoints, data access, and integration with frontend clients.",
    features: [
      "REST API design & implementation",
      "Typed contracts with TypeScript clients",
      "Validation and error handling",
      "Maintainable layered structure",
    ],
    techStack: ["ASP.NET Core", "C#", "TypeScript", "SQL"],
    image: "/projects/genai-rag.svg",
    isSample: true,
    period: "2022 – Present",
  },
  {
    id: "cp-practice",
    title: "Competitive Programming Practice",
    description:
      "Ongoing algorithmic problem-solving tracked via StopStalk—rooted in ICPC and university contest experience across Bangladesh.",
    features: [
      "ICPC Asia Dhaka Regional participation (2018)",
      "University fest contest awards (2019–2020)",
      "Google Kickstart 2021 certification",
      "StopStalk submission tracking",
    ],
    techStack: ["C++ / Algorithms", "Data Structures", "Problem Solving"],
    image: "/projects/sportsbook.svg",
    liveUrl: "https://www.stopstalk.com/user/profile/shahriar321",
    period: "2018 – Present",
  },
];

export const education: EducationItem[] = [
  {
    id: "iiuc",
    school: "International Islamic University Chittagong",
    // PLACEHOLDER: Confirm exact degree title (e.g. B.Sc. in CSE)
    degree: "Bachelor's degree",
    field: "Computer Science & Engineering (inferred)",
    location: "Chittagong, Bangladesh",
    startYear: "2016",
    endYear: "2021",
    highlights: [
      "Studied March 2016 – September 2021",
      "Active in university & regional programming contests",
      "IIUC Programming Contest 2020 — Honors & Awards",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "kickstart-2021",
    name: "Google Kickstart 2021",
    issuer: "Google",
    year: "2021",
  },
  {
    id: "icpcid",
    name: "ICPCID",
    issuer: "ICPC",
    year: "—",
  },
];

export const achievements: Achievement[] = [
  { id: "years", label: "Years at SELISE", value: 4, suffix: "+" },
  { id: "awards", label: "Contest Honors", value: 5 },
  { id: "certs", label: "Certifications", value: 2 },
  { id: "langs", label: "Languages", value: 2 },
];

/** Contest honors from LinkedIn PDF — shown in Achievements / About context */
export const honors = [
  "ICPC Asia Dhaka Regional Contest 2018",
  "BUET CSE Fest 2019",
  "IIUC Programming Contest 2020",
  "CUET CSE Fest 2019",
  "EDU CSE Fest 2020",
];

export const testimonials: Testimonial[] = [
  // PLACEHOLDER: Replace with real LinkedIn recommendations
  {
    id: "placeholder-1",
    name: "Colleague Name",
    role: "Software Engineer",
    company: "SELISE Digital Platforms",
    quote:
      "Placeholder testimonial — replace with a verified LinkedIn recommendation about collaboration and delivery quality.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    name: "Team Lead Name",
    role: "Engineering Lead",
    company: "SELISE Digital Platforms",
    quote:
      "Placeholder testimonial — replace with feedback on problem-solving, ownership, and technical growth.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    name: "Peer Name",
    role: "Full-Stack Developer",
    company: "Previous collaboration",
    quote:
      "Placeholder testimonial — add a peer note on TypeScript/.NET work or contest mentoring.",
    isPlaceholder: true,
  },
];
