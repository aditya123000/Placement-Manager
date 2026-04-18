export const defaultStudent = {
  name: "Demo Student",
  email: "demo@college.edu",
  dob: "2003-01-01",
  roll: "CSE2025001",
  password: "demo",
  phone: "+91 98765 43210",
  alternatePhone: "+91 91234 56780",
  gender: "Male",
  address: "Bengaluru, Karnataka",
  city: "Bengaluru",
  state: "Karnataka",
  branch: "Computer Science and Engineering",
  specialization: "Artificial Intelligence and Data Science",
  year: 4,
  section: "A",
  semester: 8,
  academicCGPA: 8.5,
  backlogs: 0,
  tenth: 90,
  twelfth: 85,
  diploma: 0,
  resumeVersion: "Resume_v6.pdf",
  portfolioUrl: "https://portfolio.example.com/demo-student",
  linkedinUrl: "https://linkedin.com/in/demo-student",
  githubUrl: "https://github.com/demo-student",
  leetcodeUrl: "https://leetcode.com/demo-student",
  preferredLocations: "Bengaluru, Hyderabad, Pune",
  expectedCtc: "10-14 LPA",
  willingToRelocate: true,
  internshipExperience: "6-month software engineering internship at Finverse.",
  certifications: "AWS Cloud Practitioner, Google Data Analytics",
  achievements: "Top 5 in Smart India Hackathon internal round.",
  technicalSkills: "React, Node.js, SQL, Python, DSA, System Design",
  softSkills: "Communication, ownership, presentation, stakeholder management",
  placementCoordinator: "Ananya Rao",
  mentorName: "Prof. Vivek Kumar",
  attendance: 92,
  noticeBoardOptIn: true,
  isPlaced: true,
  placedCategory: "Core",
  jobsOffered: 1,
  dreamApplicationsLeft: 1,
  profileCompletion: 92,
  profileHealth: "Strong",
  currentOffer: {
    company: "FinTech Pro",
    role: "Business Analyst",
    ctc: "9.5 LPA",
    joining: "2026-07-14",
  },
  myApplications: [
    {
      id: "fintech-pro-application",
      driveId: "fintech-pro",
      source: "drive",
      company: "FinTech Pro",
      role: "Business Analyst",
      status: "Interview",
      stage: "Interview",
      package: "9.5 LPA",
      location: "Bengaluru",
      appliedOn: "2026-03-28",
      nextStepDate: "2026-04-09",
      recruiter: "Campus Hiring Team",
      mode: "Hybrid",
      roleDescription:
        "Support product and growth teams with analytics, stakeholder reporting, and operational problem solving.",
      companyDescription:
        "FinTech Pro is a digital payments and lending platform hiring analysts for business intelligence and product operations.",
    },
  ],
};

export const driveSeeds = [
  {
    id: "tech-innovate",
    company: "Tech Innovate",
    role: "Software Development Engineer",
    category: "Core",
    type: "Full Time",
    mode: "Hybrid",
    location: "Bengaluru / Hyderabad",
    date: "2026-04-20",
    driveDate: "2026-04-12",
    slots: 18,
    package: "11 LPA",
    eligibility: 7,
    maxBacklogs: 0,
    bond: "No bond",
    rounds: "OA, Technical 1, Technical 2, HR",
    skills: ["React", "Node.js", "DSA", "SQL"],
    description:
      "Work on customer-facing product engineering, distributed services, and modern internal tooling.",
  },
  {
    id: "global-titans",
    company: "Global Titans",
    role: "Data Scientist",
    category: "Dream",
    type: "Full Time",
    mode: "Onsite",
    location: "Gurugram",
    date: "2026-04-15",
    driveDate: "2026-04-10",
    slots: 10,
    package: "18 LPA",
    eligibility: 8.5,
    maxBacklogs: 0,
    bond: "No bond",
    rounds: "Assessment, Case Study, Technical, Leadership",
    skills: ["Python", "ML", "SQL", "Statistics"],
    description:
      "Join the AI and analytics team working on production data science pipelines for enterprise decision systems.",
  },
  {
    id: "future-services",
    company: "Future Services",
    role: "Graduate Engineer Trainee",
    category: "Mass",
    type: "Full Time",
    mode: "Onsite",
    location: "PAN India",
    date: "2026-04-25",
    driveDate: "2026-04-17",
    slots: 120,
    package: "4.5 LPA",
    eligibility: 6,
    maxBacklogs: 1,
    bond: "12 months",
    rounds: "Aptitude, Coding, Interview",
    skills: ["Problem Solving", "Communication", "Basics of CS"],
    description:
      "A large fresher hiring program across support, QA, operations, and engineering tracks.",
  },
  {
    id: "infra-tech",
    company: "Infra Tech",
    role: "Network Engineer",
    category: "Core",
    type: "Full Time",
    mode: "Onsite",
    location: "Chennai",
    date: "2026-04-30",
    driveDate: "2026-04-22",
    slots: 14,
    package: "8 LPA",
    eligibility: 7.5,
    maxBacklogs: 0,
    bond: "No bond",
    rounds: "Technical Test, Ops Round, HR",
    skills: ["Networks", "Linux", "Cloud", "Security"],
    description:
      "Design and support enterprise-grade network infrastructure, observability, and cloud systems.",
  },
  {
    id: "robo-corp",
    company: "Robo Corp",
    role: "AI Intern + PPO",
    category: "Dream",
    type: "Internship",
    mode: "Hybrid",
    location: "Pune",
    date: "2026-04-06",
    driveDate: "2026-04-11",
    slots: 8,
    package: "14 LPA PPO",
    eligibility: 8,
    maxBacklogs: 0,
    bond: "No bond",
    rounds: "Portfolio Review, Technical, Research Discussion",
    skills: ["Computer Vision", "PyTorch", "Robotics", "Git"],
    description:
      "Contribute to robotics software, computer vision workflows, and model evaluation with a PPO track.",
  },
  {
    id: "fintech-pro",
    company: "FinTech Pro",
    role: "Business Analyst",
    category: "Core",
    type: "Full Time",
    mode: "Hybrid",
    location: "Bengaluru",
    date: "2026-04-22",
    driveDate: "2026-04-14",
    slots: 20,
    package: "9.5 LPA",
    eligibility: 7,
    maxBacklogs: 0,
    bond: "No bond",
    rounds: "Aptitude, Case Study, HR",
    skills: ["Excel", "SQL", "Analytics", "Communication"],
    description:
      "Support data-backed product decisions in lending, payments, and fintech operations.",
  },
  {
    id: "alpha-systems",
    company: "Alpha Systems",
    role: "Quality Engineering Analyst",
    category: "Mass",
    type: "Full Time",
    mode: "Hybrid",
    location: "Noida",
    date: "2026-04-28",
    driveDate: "2026-04-19",
    slots: 42,
    package: "5.2 LPA",
    eligibility: 6,
    maxBacklogs: 1,
    bond: "18 months",
    rounds: "Test, QA Round, HR",
    skills: ["Testing", "Automation Basics", "API Validation"],
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
    mode: "Onsite",
    compensation: "Market competitive",
    applyBy: "2026-04-30",
    skills: ["DSA", "Algorithms", "C++ / Java / Python"],
    link: "https://careers.google.com/",
    description:
      "Work with platform teams on high-scale systems, internal developer tooling, and reliability improvements.",
  },
  {
    id: "microsoft-cloud",
    company: "Microsoft",
    role: "Cloud Support Associate",
    location: "Hyderabad",
    mode: "Hybrid",
    compensation: "8-10 LPA",
    applyBy: "2026-04-25",
    skills: ["Azure", "Troubleshooting", "Networking"],
    link: "https://careers.microsoft.com/",
    description:
      "Help enterprise customers operate Azure workloads with strong troubleshooting and communication skills.",
  },
  {
    id: "amazon-sde",
    company: "Amazon",
    role: "SDE Intern",
    location: "Chennai",
    mode: "Onsite",
    compensation: "Intern stipend + PPO",
    applyBy: "2026-04-28",
    skills: ["Java", "Problem Solving", "Systems Thinking"],
    link: "https://amazon.jobs/",
    description:
      "Build scalable services and internal tooling with strong coding fundamentals and bias for action.",
  },
  {
    id: "tcs-nqt",
    company: "TCS NQT",
    role: "National Qualifier Trainee",
    location: "PAN India",
    mode: "Onsite",
    compensation: "3.5-7 LPA",
    applyBy: "2026-05-05",
    skills: ["Aptitude", "Coding", "Communication"],
    link: "https://www.tcs.com/careers",
    description:
      "Entry-level hiring route with aptitude, coding, and communication rounds for large-scale fresher intake.",
  },
];

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "fa-chart-line" },
  { id: "profile", label: "Student Profile", icon: "fa-user-graduate" },
  { id: "drives", label: "Drive Management", icon: "fa-building" },
  { id: "applications", label: "Application Tracker", icon: "fa-file-circle-check" },
  { id: "analytics", label: "Analytics", icon: "fa-chart-pie" },
  { id: "calendar", label: "Calendar", icon: "fa-calendar-days" },
  { id: "preparation", label: "Placement Prep", icon: "fa-laptop-code" },
  { id: "off-campus", label: "Off-Campus", icon: "fa-briefcase" },
  { id: "resources", label: "Resources", icon: "fa-life-ring" },
  { id: "policy", label: "Policy & Privacy", icon: "fa-book-open" },
];

export const coordinatorNavItems = [
  { id: "dashboard", label: "Overview", icon: "fa-chart-line" },
  { id: "operations", label: "Placement Operations", icon: "fa-briefcase" },
  { id: "analytics", label: "Institution Analytics", icon: "fa-chart-pie" },
  { id: "calendar", label: "Cycle Calendar", icon: "fa-calendar-days" },
  { id: "resources", label: "Knowledge Base", icon: "fa-life-ring" },
  { id: "policy", label: "Policy & Privacy", icon: "fa-book-open" },
];

export const getNavItemsForRole = (role) =>
  role === "coordinator" ? coordinatorNavItems : navItems;

export const policySections = [
  {
    title: "Information We Collect",
    items: [
      "Identity data such as name, email, roll number, phone numbers, and department.",
      "Academic records including CGPA, current semester, backlog status, and school marks.",
      "Placement-readiness metadata such as resume version, skill profile, certifications, and preferred job locations.",
      "Operational records including applications, interview stages, recruiter updates, and support tickets.",
    ],
  },
  {
    title: "Why We Collect It",
    items: [
      "To evaluate eligibility for campus drives and enforce placement policy rules fairly.",
      "To help students track applications, interview schedules, and required documents from one workspace.",
      "To give placement officers consolidated analytics on conversion, branch performance, and company pipeline health.",
    ],
  },
  {
    title: "Security & Governance",
    items: [
      "This frontend demo stores data in browser localStorage and does not connect to a live backend.",
      "A production version should add role-based access control, encrypted API transport, and audit logging.",
      "Sensitive student documents should be uploaded to managed object storage with signed access URLs.",
    ],
  },
  {
    title: "Operational Retention",
    items: [
      "Profiles remain editable by students throughout the active placement cycle.",
      "Application history should be retained for placement reporting, compliance, and accreditation records.",
      "Institutions should publish a deletion and grievance workflow for post-graduation records.",
    ],
  },
];

export const announcements = [
  {
    title: "Resume review window closes soon",
    body: "Final resume shortlist for Dream roles closes on 10 Apr. Upload your latest PDF and update portfolio links.",
    tone: "amber",
  },
  {
    title: "Mock interview batch published",
    body: "AI/ML and full-stack practice panels are scheduled this week for final-year students.",
    tone: "blue",
  },
  {
    title: "Placement policy update",
    body: "Mass-to-Core-to-Dream upgrade rules are visible under the policy section with examples and edge cases.",
    tone: "green",
  },
];

export const timelineMilestones = [
  { title: "Profile verification", owner: "Student Affairs", status: "Completed", date: "2026-03-25" },
  { title: "Resume quality review", owner: "Placement Cell", status: "In Progress", date: "2026-04-08" },
  { title: "Mock interview cycle", owner: "Alumni Panel", status: "Scheduled", date: "2026-04-11" },
  { title: "Offer release readiness", owner: "Recruitment Ops", status: "Pending", date: "2026-05-02" },
];

export const analyticsCards = [
  { label: "Students Registered", value: "2,184", note: "+12% from last cycle" },
  { label: "Active Recruiters", value: "46", note: "18 Dream, 15 Core, 13 Mass" },
  { label: "Offer Conversion", value: "68%", note: "Interview to offer ratio" },
  { label: "Highest Package", value: "28 LPA", note: "AI research role" },
];

export const branchPerformance = [
  { branch: "CSE", registered: 420, eligible: 386, placed: 301, avgPackage: "10.8 LPA" },
  { branch: "IT", registered: 310, eligible: 282, placed: 208, avgPackage: "8.9 LPA" },
  { branch: "ECE", registered: 268, eligible: 241, placed: 174, avgPackage: "7.6 LPA" },
  { branch: "EEE", registered: 210, eligible: 176, placed: 121, avgPackage: "6.4 LPA" },
];

export const preparationModules = [
  {
    title: "Aptitude Sprint",
    progress: 85,
    focus: "Quantitative aptitude, logical reasoning, verbal ability",
    nextSession: "2026-04-06",
  },
  {
    title: "DSA Interview Track",
    progress: 72,
    focus: "Arrays, graphs, trees, dynamic programming, problem patterns",
    nextSession: "2026-04-08",
  },
  {
    title: "Communication Lab",
    progress: 64,
    focus: "Introductions, HR storytelling, group discussions, email etiquette",
    nextSession: "2026-04-09",
  },
];

export const supportResources = [
  {
    title: "Resume & SOP Review",
    owner: "Career Services",
    description: "Structured review slots for resumes, cover letters, and graduate statements.",
    action: "Book a review",
  },
  {
    title: "Placement FAQ",
    owner: "Training and Placement Office",
    description: "Policy clarifications, company categories, job acceptance rules, and bond FAQs.",
    action: "Read handbook",
  },
  {
    title: "Mentor Connect",
    owner: "Alumni Network",
    description: "Domain-focused mentoring for product, data, analytics, QA, and consulting tracks.",
    action: "Request mentor",
  },
];

export const techStack = [
  "React 18",
  "Vite 5",
  "JavaScript (ES Modules)",
  "Responsive CSS architecture",
  "Browser localStorage persistence",
  "Component-based feature structure",
];
