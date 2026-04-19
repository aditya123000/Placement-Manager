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
const applicationStages = ["Applied", "Shortlisted", "OA", "Interview", "Offer", "Rejected"];

app.use(cors());
app.use(express.json());

const enrichUser = (user, state) => {
  if (user.role === "coordinator") {
    const students = state.users.filter((item) => item.role !== "coordinator");
    const applications = students.flatMap((item) => item.myApplications || []);
    const placed = students.filter((item) => item.isPlaced).length;
    const openDrives = state.drives.filter((drive) => new Date(drive.date) >= new Date()).length;

    return {
      ...user,
      management: {
        metrics: {
          totalStudents: students.length,
          placedStudents: placed,
          placementRate: students.length ? Math.round((placed / students.length) * 100) : 0,
          activeDrives: openDrives,
          applicationsTracked: applications.length,
        },
        students: students.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          roll: item.roll,
          branch: item.branch,
          academicCGPA: item.academicCGPA,
          backlogs: item.backlogs,
          profileCompletion: item.profileCompletion,
          profileHealth: item.profileHealth,
          jobsOffered: item.jobsOffered,
          isPlaced: item.isPlaced,
          placedCategory: item.placedCategory,
          currentOffer: item.currentOffer,
          applicationsCount: (item.myApplications || []).length,
        })),
        drives: state.drives,
        audits: (state.audits || []).slice(0, 120),
      },
      notifications: state.notifications.filter((item) => item.userId === user.id),
    };
  }

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

const ensureCoordinator = (state, userId) => {
  const actor = state.users.find((item) => item.id === userId);
  if (!actor || actor.role !== "coordinator") {
    throw new Error("Coordinator access required");
  }

  return actor;
};

const addAudit = (state, actor, action, targetType, targetId, detail) => {
  if (!state.audits) {
    state.audits = [];
  }

  state.audits.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    actorId: actor?.id || "system",
    actorName: actor?.name || "System",
    action,
    targetType,
    targetId,
    detail,
    createdAt: new Date().toISOString(),
  });
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
    const {
      name,
      email,
      dob,
      roll,
      officeId,
      designation,
      password,
      role,
    } = request.body;
    const accountRole = role === "coordinator" ? "coordinator" : "student";
    const accountId = accountRole === "coordinator" ? officeId : roll;

    if (!name || !email || !password) {
      response.status(400).json({ message: "Missing required registration fields." });
      return;
    }

    if (accountRole === "student" && (!dob || !roll)) {
      response.status(400).json({ message: "Student registration requires date of birth and roll number." });
      return;
    }

    if (accountRole === "coordinator" && (!officeId || !designation)) {
      response.status(400).json({ message: "Coordinator registration requires office ID and designation." });
      return;
    }

    const state = updateState((current) => {
      if (current.users.some((user) => user.id === accountId || user.email === email)) {
        throw new Error("Account already exists");
      }

      current.users.push({
        id: accountId,
        role: accountRole,
        name,
        email,
        dob: accountRole === "student" ? dob : "",
        roll: accountRole === "student" ? roll : officeId,
        password,
        phone: "",
        alternatePhone: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        branch: accountRole === "student" ? "" : "Placement Office",
        specialization: accountRole === "student" ? "" : designation,
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
      const actor = { id: accountId, name };
      addAudit(current, actor, "registered", "user", accountId, `Registered a new ${accountRole} account.`);
      return current;
    });

    const created = state.users.find((user) => user.id === accountId);
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
    addAudit(current, user, "profile_updated", "user", user.id, "Updated profile fields.");
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
      addAudit(current, user, "resume_uploaded", "user", user.id, `Uploaded ${parsedResume.fileName}.`);
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
    addAudit(current, user, "applied_drive", "drive", drive.id, `Applied to ${drive.company}.`);
    return current;
  });

  const user = state.users.find((item) => item.id === request.body.userId);
  response.json({ user: enrichUser(user, state) });
});

app.post("/api/drives/:driveId/unapply", (request, response) => {
  try {
    const state = updateState((current) => {
      const user = current.users.find((item) => item.id === request.body.userId);
      const drive = current.drives.find((item) => item.id === request.params.driveId);

      if (!user || !drive) {
        throw new Error("User or drive not found");
      }

      user.myApplications = (user.myApplications || []).filter(
        (item) => item.driveId !== drive.id,
      );

      createNotification(
        current,
        user.id,
        "Application withdrawn",
        `${drive.company} application was removed from your tracker.`,
        "application",
      );
      addAudit(current, user, "application_withdrawn", "drive", drive.id, `Withdrew from ${drive.company}.`);

      return current;
    });

    const user = state.users.find((item) => item.id === request.body.userId);
    response.json({ user: enrichUser(user, state) });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

app.patch("/api/applications/:applicationId/status", (request, response) => {
  const state = updateState((current) => {
    const user = current.users.find((item) => item.id === request.body.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const application = user.myApplications.find((item) => item.id === request.params.applicationId);
    if (!application) {
      throw new Error("Application not found");
    }

    const currentIndex = applicationStages.indexOf(application.status);
    const nextIndex = Math.min(currentIndex + 1, applicationStages.length - 1);
    application.status = applicationStages[nextIndex];
    application.stage = applicationStages[nextIndex];
    application.nextStepDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    createNotification(
      current,
      user.id,
      "Application status updated",
      `${application.company} moved to ${application.status}.`,
      "application",
    );
    addAudit(current, user, "application_advanced", "application", application.id, `${application.company} moved to ${application.status}.`);
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
    addAudit(current, user, "wishlist_toggled", "drive", drive.id, `${wishlist.has(drive.id) ? "Saved" : "Removed"} ${drive.company}.`);
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

app.get("/api/management/overview/:userId", (request, response) => {
  try {
    const state = getState();
    const coordinator = ensureCoordinator(state, request.params.userId);
    response.json({ user: enrichUser(coordinator, state) });
  } catch (error) {
    response.status(403).json({ message: error.message });
  }
});

app.get("/api/management/students/:userId", (request, response) => {
  try {
    const state = getState();
    ensureCoordinator(state, request.params.userId);
    const students = state.users
      .filter((item) => item.role !== "coordinator")
      .map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        roll: item.roll,
        branch: item.branch,
        academicCGPA: item.academicCGPA,
        backlogs: item.backlogs,
        profileCompletion: item.profileCompletion,
        profileHealth: item.profileHealth,
        jobsOffered: item.jobsOffered,
        isPlaced: item.isPlaced,
        placedCategory: item.placedCategory,
        currentOffer: item.currentOffer,
        applicationsCount: (item.myApplications || []).length,
      }));
    response.json({ students });
  } catch (error) {
    response.status(403).json({ message: error.message });
  }
});

app.patch("/api/management/students/:studentId/status", (request, response) => {
  try {
    const state = updateState((current) => {
      const actor = ensureCoordinator(current, request.body.userId);
      const student = current.users.find(
        (item) => item.id === request.params.studentId && item.role !== "coordinator",
      );

      if (!student) {
        throw new Error("Student not found");
      }

      if (typeof request.body.isPlaced === "boolean") {
        student.isPlaced = request.body.isPlaced;
      }

      if (request.body.placedCategory !== undefined) {
        student.placedCategory = request.body.placedCategory;
      }

      if (request.body.currentOffer !== undefined) {
        student.currentOffer = request.body.currentOffer;
      }

      addAudit(
        current,
        actor,
        "student_status_updated",
        "user",
        student.id,
        `Updated placement status for ${student.name}.`,
      );

      return current;
    });

    const students = state.users.filter((item) => item.role !== "coordinator");
    response.json({
      students: students.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        roll: item.roll,
        branch: item.branch,
        academicCGPA: item.academicCGPA,
        backlogs: item.backlogs,
        profileCompletion: item.profileCompletion,
        profileHealth: item.profileHealth,
        jobsOffered: item.jobsOffered,
        isPlaced: item.isPlaced,
        placedCategory: item.placedCategory,
        currentOffer: item.currentOffer,
        applicationsCount: (item.myApplications || []).length,
      })),
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

app.post("/api/management/drives", (request, response) => {
  try {
    const state = updateState((current) => {
      const actor = ensureCoordinator(current, request.body.userId);
      const payload = request.body.drive || {};

      const required = ["company", "role", "category", "package", "eligibility", "date", "driveDate"];
      const missing = required.filter((key) => !payload[key]);
      if (missing.length) {
        throw new Error(`Missing required drive fields: ${missing.join(", ")}`);
      }

      const created = {
        id:
          payload.id ||
          `${payload.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-6)}`,
        company: payload.company,
        role: payload.role,
        category: payload.category,
        type: payload.type || "Full Time",
        mode: payload.mode || "Onsite",
        location: payload.location || "TBD",
        date: payload.date,
        driveDate: payload.driveDate,
        slots: Number(payload.slots || 0),
        package: payload.package,
        eligibility: Number(payload.eligibility || 0),
        maxBacklogs: Number(payload.maxBacklogs || 0),
        bond: payload.bond || "No bond",
        rounds: payload.rounds || "Assessment, Interview",
        skills: Array.isArray(payload.skills)
          ? payload.skills
          : String(payload.skills || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
        description: payload.description || "Campus hiring drive.",
        allowedBranches: payload.allowedBranches || [],
        createdAt: new Date().toISOString(),
      };

      current.drives.unshift(created);
      addAudit(current, actor, "drive_created", "drive", created.id, `Created drive for ${created.company}.`);
      return current;
    });

    response.status(201).json({ drives: state.drives });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

app.patch("/api/management/drives/:driveId", (request, response) => {
  try {
    const state = updateState((current) => {
      const actor = ensureCoordinator(current, request.body.userId);
      const drive = current.drives.find((item) => item.id === request.params.driveId);
      if (!drive) {
        throw new Error("Drive not found");
      }

      const payload = request.body.drive || {};
      Object.assign(drive, payload);
      if (typeof payload.eligibility !== "undefined") {
        drive.eligibility = Number(payload.eligibility);
      }
      if (typeof payload.maxBacklogs !== "undefined") {
        drive.maxBacklogs = Number(payload.maxBacklogs);
      }
      if (typeof payload.slots !== "undefined") {
        drive.slots = Number(payload.slots);
      }
      if (payload.skills && !Array.isArray(payload.skills)) {
        drive.skills = String(payload.skills)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      addAudit(current, actor, "drive_updated", "drive", drive.id, `Updated drive for ${drive.company}.`);
      return current;
    });

    response.json({ drives: state.drives });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

app.get("/api/management/audit/:userId", (request, response) => {
  try {
    const state = getState();
    ensureCoordinator(state, request.params.userId);
    response.json({ audits: state.audits || [] });
  } catch (error) {
    response.status(403).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Placement Manager API running on http://localhost:${port}`);
});

export default app;
