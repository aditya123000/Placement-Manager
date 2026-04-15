import { PDFParse } from "pdf-parse";

const knownSkills = [
  "React",
  "Node.js",
  "Express",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "DSA",
  "Machine Learning",
  "PyTorch",
  "AWS",
  "Docker",
  "Git",
  "Data Analysis",
  "System Design",
  "Testing",
  "API",
];

const normalize = (value = "") => value.toLowerCase();

export const extractTextFromResume = async (file) => {
  if (!file) {
    return "";
  }

  const fileName = normalize(file.originalname);
  if (file.mimetype === "application/pdf" || fileName.endsWith(".pdf")) {
    const parser = new PDFParse({ data: file.buffer });
    const parsed = await parser.getText();
    await parser.destroy();
    return parsed.text || "";
  }

  return file.buffer.toString("utf8");
};

export const parseResumeText = (text, fileName) => {
  const normalized = normalize(text);
  const cgpaMatch = text.match(/cgpa[^0-9]*([0-9]+(?:\.[0-9]+)?)/i);
  const projectMatches = text.match(/projects?[\s\S]{0,200}/i);

  const extractedSkills = knownSkills.filter((skill) =>
    normalized.includes(skill.toLowerCase()),
  );

  const extractedProjects = projectMatches
    ? projectMatches[0]
        .split(/\n|•|-|:/)
        .map((item) => item.trim())
        .filter((item) => item && item.length > 4 && !/project/i.test(item))
        .slice(0, 3)
    : [];

  return {
    fileName,
    extractedSkills,
    extractedCgpa: cgpaMatch ? Number(cgpaMatch[1]) : 0,
    extractedProjects,
    lastParsedAt: new Date().toISOString(),
  };
};

export const buildEligibility = (user, drive) => {
  let score = 100;
  const improvements = [];

  if (Number(user.academicCGPA) < Number(drive.eligibility)) {
    score -= 25;
    improvements.push(`raise CGPA to ${drive.eligibility}+`);
  }

  if (Number(user.backlogs) > Number(drive.maxBacklogs ?? 0)) {
    score -= 20;
    improvements.push(`clear backlogs to ${drive.maxBacklogs}`);
  }

  if (drive.allowedBranches?.length && !drive.allowedBranches.includes(user.branch)) {
    score -= 20;
    improvements.push("target companies open for your branch");
  }

  const resumeSkills = user.resumeData?.extractedSkills ?? [];
  const matchedSkills = drive.skills.filter((skill) =>
    resumeSkills.some((resumeSkill) =>
      normalize(resumeSkill).includes(normalize(skill)) ||
      normalize(skill).includes(normalize(resumeSkill)),
    ),
  );

  if (matchedSkills.length === 0) {
    score -= 20;
    improvements.push(`add ${drive.skills.slice(0, 2).join(" and ")} to your project skill set`);
  } else if (matchedSkills.length < Math.ceil(drive.skills.length / 2)) {
    score -= 10;
    improvements.push(`strengthen ${drive.skills.filter((skill) => !matchedSkills.includes(skill)).slice(0, 2).join(" and ")}`);
  }

  const hasPastApplication = (user.myApplications ?? []).some(
    (application) => application.company === drive.company,
  );

  if (hasPastApplication) {
    score -= 5;
    improvements.push("avoid duplicate company applications");
  }

  return {
    eligiblePercent: Math.max(score, 0),
    matchedSkills,
    improvements,
    summary:
      score >= 80
        ? `You're ${Math.max(score, 0)}% eligible.`
        : `You're ${Math.max(score, 0)}% eligible. Improve ${improvements[0] || "your profile"} to qualify.`,
  };
};

export const buildMatchScore = (user, drive) => {
  const eligibility = buildEligibility(user, drive);
  const resumeSkills = user.resumeData?.extractedSkills ?? [];
  const skillCoverage = drive.skills.length
    ? Math.round((eligibility.matchedSkills.length / drive.skills.length) * 100)
    : 0;
  const cgpaBoost = Number(user.academicCGPA) >= Number(drive.eligibility) ? 10 : 0;
  const branchBoost = drive.allowedBranches?.includes(user.branch) ? 10 : 0;

  return Math.min(
    100,
    Math.round(eligibility.eligiblePercent * 0.6 + skillCoverage * 0.25 + cgpaBoost + branchBoost),
  );
};

export const buildCalendarEvents = (user, drives) => {
  const applicationEvents = (user.myApplications ?? []).flatMap((application) => {
    const items = [];

    if (application.nextStepDate) {
      items.push({
        id: `${application.id}-next-step`,
        title: `${application.company} ${application.stage || "Next Step"}`,
        date: application.nextStepDate,
        type: "application",
      });
    }

    return items;
  });

  const driveEvents = drives.map((drive) => ({
    id: `${drive.id}-drive`,
    title: `${drive.company} test / drive schedule`,
    date: drive.driveDate,
    type: "drive",
  }));

  return [...applicationEvents, ...driveEvents].sort((a, b) => a.date.localeCompare(b.date));
};
