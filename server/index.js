import express from "express";
import cors from "cors";
import multer from "multer";
import { getState, updateState, appendEmailLog } from "./store.js";
import {
  buildCalendarEvents,
  buildEligibility,
  buildMatchScore,
  extractTextFromResume,
  parseResumeText,
} from "./placement.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const port = 4000;
const clients = new Set();

app.use(cors());
app.use(express.json());

const enrichUser = (user, state) => {
  const drives = state.drives.map((drive) => ({
    ...drive,
    applicationStatus:
      user.myApplications?.find((application) => application.driveId === drive.id)?.status ||
      "Not Applied",
    isSaved: user.wishlist?.includes(drive.id) || false,
    eligibility: buildEligibility(user, drive),
    matchScore: buildMatchScore(user, drive),
  }));

  return {
    ...user,
    calendarEvents: buildCalendarEvents(user, state.drives),
    drives,
    offCampusJobs: state.offCampusJobs,
    notifications: state.notifications.filter((item) => item.userId === user.id),
  };
};

const broadcast = (event, payload) => {
  const data = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  clients.forEach((client) => client.write(data));
};

const createNotification = (state, userId, title, message, type = "general") => {
  const notification = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    userId,
    channel: "in-app,email",
    title,
    message,
    createdAt: new Date().toISOString(),
    read: false,
    type,
  };

  state.notifications.unshift(notification);
  appendEmailLog(`${userId} | ${title} | ${message}`);
  broadcast("notification", notification);
};

app.get("/api/events", (request, response) => {
  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Connection", "keep-alive");
  response.flushHeaders();
  response.write("event: connected\ndata: {\"ok\":true}\n\n");
  clients.add(response);

  request.on("close", () => {
    clients.delete(response);
  });
});

app.post("/api/auth/login", (request, response) => {
  const { name, password } = request.body;
  const state = getState();
  const user = state.users.find(
    (item) => item.name === name && item.password === password,
  );

  if (!user) {
    response.status(401).json({ message: "Invalid credentials" });
    return;
  }

  response.json({ user: enrichUser(user, state) });
});

app.post("/api/auth/register", (request, response) => {
  try {
    const { name, email, dob, roll, password } = request.body;

    if (!name || !email || !dob || !roll || !password) {
      response.status(400).json({ message: "Missing required registration fields" });
      return;
    }

    const state = updateState((current) => {
      if (current.users.some((user) => user.roll === roll || user.email === email)) {
        throw new Error("Account already exists");
      }

      current.users.push({
        id: roll,
        name,
        email,
        dob,
        roll,
        password,
        phone: "",
        alternatePhone: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        branch: "",
        specialization: "",
        year: 0,
        section: "",
        semester: 0,
        academicCGPA: 0,
        backlogs: 0,
        tenth: 0,
        twelfth: 0,
        diploma: 0,
        resumeVersion: "",
        portfolioUrl: "",
        linkedinUrl: "",
        githubUrl: "",
        leetcodeUrl: "",
        preferredLocations: "",
        expectedCtc: "",
        willingToRelocate: true,
        internshipExperience: "",
        certifications: "",
        achievements: "",
        technicalSkills: "",
        softSkills: "",
        placementCoordinator: "",
        mentorName: "",
        attendance: 0,
        noticeBoardOptIn: true,
        isPlaced: false,
        placedCategory: null,
        jobsOffered: 0,
        dreamApplicationsLeft: 2,
        profileCompletion: 20,
        profileHealth: "Needs completion",
        currentOffer: null,
        wishlist: [],
        resumeData: null,
        myApplications: [],
      });
      return current;
    });

    const created = state.users.find((user) => user.roll === roll);
    response.status(201).json({ user: enrichUser(created, state) });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

app.get("/api/bootstrap/:userId", (request, response) => {
  const state = getState();
  const user = state.users.find((item) => item.id === request.params.userId);

  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  response.json({ user: enrichUser(user, state) });
});

app.patch("/api/profile/:userId", (request, response) => {
  const state = updateState((current) => {
    const user = current.users.find((item) => item.id === request.params.userId);
    if (!user) {
      throw new Error("User not found");
    }

    Object.assign(user, request.body);
    return current;
  });

  const user = state.users.find((item) => item.id === request.params.userId);
  response.json({ user: enrichUser(user, state) });
});

app.post("/api/resume/:userId", upload.single("resume"), async (request, response) => {
  try {
    const resumeText = await extractTextFromResume(request.file);
    const parsedResume = parseResumeText(resumeText, request.file?.originalname || "resume");

    const state = updateState((current) => {
      const user = current.users.find((item) => item.id === request.params.userId);
      if (!user) {
        throw new Error("User not found");
      }

      user.resumeVersion = parsedResume.fileName;
      user.resumeData = parsedResume;
      if (parsedResume.extractedCgpa) {
        user.academicCGPA = Math.max(user.academicCGPA || 0, parsedResume.extractedCgpa);
      }
      createNotification(
        current,
        user.id,
        "Resume parsed successfully",
        "Skills, CGPA, and project highlights were extracted and match scores were refreshed.",
        "resume",
      );
      return current;
    });

    const user = state.users.find((item) => item.id === request.params.userId);
    response.json({ user: enrichUser(user, state) });
  } catch (error) {
    response.status(500).json({ message: "Resume parsing failed", detail: error.message });
  }
});

app.post("/api/drives/:driveId/apply", (request, response) => {
  const state = updateState((current) => {
    const user = current.users.find((item) => item.id === request.body.userId);
    const drive = current.drives.find((item) => item.id === request.params.driveId);

    if (!user || !drive) {
      throw new Error("User or drive not found");
    }

    if (!user.myApplications.some((item) => item.driveId === drive.id)) {
      user.myApplications.push({
        id: `${drive.id}-application`,
        driveId: drive.id,
        source: "drive",
        company: drive.company,
        role: drive.role,
        status: "Applied",
        stage: "Applied",
        package: drive.package,
        location: drive.location,
        appliedOn: new Date().toISOString().slice(0, 10),
        nextStepDate: drive.driveDate,
        recruiter: `${drive.company} Campus Team`,
        mode: drive.mode,
        roleDescription: drive.description,
        companyDescription: drive.description,
      });
    }

    createNotification(
      current,
      user.id,
      "Application submitted",
      `${drive.company} application added to your tracker.`,
      "application",
    );
    return current;
  });

  const user = state.users.find((item) => item.id === request.body.userId);
  response.json({ user: enrichUser(user, state) });
});

app.patch("/api/applications/:applicationId/status", (request, response) => {
  const stages = ["Applied", "Shortlisted", "OA", "Interview", "Offer", "Rejected"];
  const state = updateState((current) => {
    const user = current.users.find((item) => item.id === request.body.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const application = user.myApplications.find((item) => item.id === request.params.applicationId);
    if (!application) {
      throw new Error("Application not found");
    }

    const currentIndex = stages.indexOf(application.status);
    const nextIndex = Math.min(currentIndex + 1, stages.length - 1);
    application.status = stages[nextIndex];
    application.stage = stages[nextIndex];
    application.nextStepDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    createNotification(
      current,
      user.id,
      "Application status updated",
      `${application.company} moved to ${application.status}.`,
      "application",
    );
    return current;
  });

  const user = state.users.find((item) => item.id === request.body.userId);
  response.json({ user: enrichUser(user, state) });
});

app.post("/api/drives/:driveId/wishlist", (request, response) => {
  const state = updateState((current) => {
    const user = current.users.find((item) => item.id === request.body.userId);
    const drive = current.drives.find((item) => item.id === request.params.driveId);
    if (!user || !drive) {
      throw new Error("User or drive not found");
    }

    const wishlist = new Set(user.wishlist || []);
    if (wishlist.has(drive.id)) {
      wishlist.delete(drive.id);
    } else {
      wishlist.add(drive.id);
      createNotification(
        current,
        user.id,
        "Drive saved to wishlist",
        `${drive.company} is now bookmarked for later review.`,
        "wishlist",
      );
    }
    user.wishlist = [...wishlist];
    return current;
  });

  const user = state.users.find((item) => item.id === request.body.userId);
  response.json({ user: enrichUser(user, state) });
});

app.get("/api/notifications/:userId", (request, response) => {
  const state = getState();
  response.json({
    notifications: state.notifications.filter((item) => item.userId === request.params.userId),
  });
});

app.patch("/api/notifications/:notificationId/read", (request, response) => {
  const state = updateState((current) => {
    const notification = current.notifications.find((item) => item.id === request.params.notificationId);
    if (notification) {
      notification.read = true;
    }
    return current;
  });

  response.json({
    notifications: state.notifications.filter((item) => item.userId === request.body.userId),
  });
});

app.get("/api/calendar/:userId", (request, response) => {
  const state = getState();
  const user = state.users.find((item) => item.id === request.params.userId);
  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  response.json({ events: buildCalendarEvents(user, state.drives) });
});

app.listen(port, () => {
  console.log(`Placement Manager API running on http://localhost:${port}`);
});
