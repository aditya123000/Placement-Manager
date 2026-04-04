export const defaultStudent = {
  name: "Demo Student",
  email: "demo@college.edu",
  dob: "2000-01-01",
  roll: "CSE2025001",
  password: "demo",
  phone: "123-456-7890",
  gender: "Male",
  address: "Demo Address, City",
  branch: "CSE",
  year: 4,
  academicCGPA: 8.5,
  backlogs: 0,
  tenth: 90,
  twelfth: 85,
  isPlaced: true,
  placedCategory: "Core",
  jobsOffered: 1,
  myApplications: [],
};

export const driveSeeds = [
  {
    id: "tech-innovate",
    company: "Tech Innovate",
    role: "Software Developer",
    category: "Core",
    date: "2026-04-20",
    eligibility: 7,
    description:
      "Work on product engineering, scalable systems, and modern web platforms.",
  },
  {
    id: "global-titans",
    company: "Global Titans",
    role: "Data Scientist",
    category: "Dream",
    date: "2026-04-15",
    eligibility: 8.5,
    description:
      "Join the AI and analytics team working on production data science pipelines.",
  },
  {
    id: "future-services",
    company: "Future Services",
    role: "Graduate Engineer Trainee",
    category: "Mass",
    date: "2026-04-25",
    eligibility: 6,
    description:
      "A broad fresher hiring program across support, QA, and engineering tracks.",
  },
  {
    id: "infra-tech",
    company: "Infra Tech",
    role: "Network Engineer",
    category: "Core",
    date: "2026-04-30",
    eligibility: 7.5,
    description:
      "Design and support enterprise-grade network infrastructure and cloud systems.",
  },
  {
    id: "robo-corp",
    company: "Robo Corp",
    role: "AI Intern",
    category: "Dream",
    date: "2026-04-18",
    eligibility: 8,
    description:
      "Contribute to robotics software, computer vision workflows, and model evaluation.",
  },
  {
    id: "fintech-pro",
    company: "FinTech Pro",
    role: "Business Analyst",
    category: "Core",
    date: "2026-04-22",
    eligibility: 7,
    description:
      "Support data-backed product decisions in lending, payments, and fintech operations.",
  },
  {
    id: "alpha-systems",
    company: "Alpha Systems",
    role: "QA Tester",
    category: "Mass",
    date: "2026-04-28",
    eligibility: 6,
    description:
      "Test enterprise applications with a focus on reliability, automation, and release quality.",
  },
];

export const offCampusJobs = [
  {
    id: "google-se",
    company: "Google",
    role: "Software Engineer Intern",
    location: "Bengaluru",
    applyBy: "2026-04-30",
    link: "https://careers.google.com/",
    description:
      "Work with platform teams on high-scale systems and developer tooling.",
  },
  {
    id: "microsoft-cloud",
    company: "Microsoft",
    role: "Cloud Support Associate",
    location: "Hyderabad",
    applyBy: "2026-04-25",
    link: "https://careers.microsoft.com/",
    description:
      "Help enterprise customers operate Azure workloads with strong troubleshooting skills.",
  },
  {
    id: "amazon-sde",
    company: "Amazon",
    role: "SDE Intern",
    location: "Chennai",
    applyBy: "2026-04-28",
    link: "https://amazon.jobs/",
    description:
      "Build scalable services and internal tooling with strong coding fundamentals.",
  },
  {
    id: "tcs-nqt",
    company: "TCS NQT",
    role: "National Qualifier Trainee",
    location: "PAN India",
    applyBy: "2026-05-05",
    link: "https://www.tcs.com/careers",
    description:
      "Entry-level hiring route with aptitude, coding, and communication rounds.",
  },
];

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "fa-chart-line" },
  { id: "profile", label: "My Profile", icon: "fa-user-graduate" },
  { id: "drives", label: "Company Drives", icon: "fa-building" },
  { id: "applications", label: "My Applications", icon: "fa-file-circle-check" },
  { id: "off-campus", label: "Off-Campus Jobs", icon: "fa-briefcase" },
  { id: "policy", label: "Policy Page", icon: "fa-book-open" },
];

export const policySections = [
  {
    title: "Information We Collect",
    items: [
      "Personal details such as name, phone number, email, gender, and address.",
      "Academic details including CGPA, branch, year of study, and backlogs.",
      "School background details such as 10th and 12th percentages.",
      "Placement activity records and application history.",
    ],
  },
  {
    title: "Why We Collect It",
    items: [
      "To determine drive eligibility and maintain fair placement rules.",
      "To personalize the student dashboard and application experience.",
      "To keep placement officers and students aligned on application status.",
    ],
  },
  {
    title: "Data Protection",
    items: [
      "This demo stores data in browser localStorage only.",
      "No third-party trackers are used in the app itself.",
      "Students can update their profile details at any time.",
    ],
  },
];
