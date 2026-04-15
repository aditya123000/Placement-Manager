import fs from "node:fs";
import path from "node:path";
import { defaultStudent, driveSeeds, offCampusJobs } from "../src/features/placement/data.js";

const dataDirectory = path.resolve("server", "data");
const databasePath = path.join(dataDirectory, "db.json");
const emailLogPath = path.join(dataDirectory, "email.log");

const ensureDirectory = () => {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }
};

const seedState = () => ({
  users: [
    {
      ...defaultStudent,
      id: defaultStudent.roll,
      wishlist: ["global-titans", "robo-corp"],
      resumeData: {
        fileName: defaultStudent.resumeVersion,
        extractedSkills: ["React", "Node.js", "SQL", "Python", "DSA", "System Design"],
        extractedCgpa: defaultStudent.academicCGPA,
        extractedProjects: [
          "Campus placement workflow platform",
          "Fintech analytics dashboard",
          "Resume match scoring assistant",
        ],
        lastParsedAt: "2026-04-04T12:00:00.000Z",
      },
    },
  ],
  drives: driveSeeds.map((drive, index) => ({
    ...drive,
    allowedBranches:
      drive.category === "Dream"
        ? ["Computer Science and Engineering", "Information Technology", "Electronics and Communication Engineering"]
        : ["Computer Science and Engineering", "Information Technology", "Electronics and Communication Engineering", "Electrical and Electronics Engineering"],
    createdAt: `2026-04-0${(index % 4) + 1}T09:00:00.000Z`,
  })),
  offCampusJobs,
  notifications: [
    {
      id: "seed-dream-company",
      userId: defaultStudent.roll,
      channel: "in-app,email",
      title: "New Dream company added",
      message: "Robo Corp launched an AI Intern + PPO drive. Match score updated from your resume profile.",
      createdAt: "2026-04-05T08:00:00.000Z",
      read: false,
      type: "drive",
    },
    {
      id: "seed-deadline-alert",
      userId: defaultStudent.roll,
      channel: "in-app,email",
      title: "Deadline in 24 hrs",
      message: "Robo Corp closes applications on 06 Apr 2026. Apply now if you want to be considered.",
      createdAt: "2026-04-05T09:00:00.000Z",
      read: false,
      type: "deadline",
    },
  ],
});

const loadState = () => {
  ensureDirectory();
  if (!fs.existsSync(databasePath)) {
    const seeded = seedState();
    fs.writeFileSync(databasePath, JSON.stringify(seeded, null, 2));
    return seeded;
  }

  return JSON.parse(fs.readFileSync(databasePath, "utf8"));
};

let state = loadState();

export const getState = () => state;

export const persistState = () => {
  ensureDirectory();
  fs.writeFileSync(databasePath, JSON.stringify(state, null, 2));
};

export const updateState = (updater) => {
  state = updater(state);
  persistState();
  return state;
};

export const appendEmailLog = (entry) => {
  ensureDirectory();
  const line = `[${new Date().toISOString()}] ${entry}\n`;
  fs.appendFileSync(emailLogPath, line);
};
