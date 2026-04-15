export const STORAGE_KEYS = {
  registeredStudent: "placement-manager-registered-student",
  loggedInUser: "placement-manager-logged-in-user",
  loginFlag: "placement-manager-is-logged-in",
};

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const packageByCategory = {
  Dream: "12-20 LPA",
  Core: "6-12 LPA",
  Mass: "3-5 LPA",
};

export const getProfileScore = (student) => {
  const checkpoints = [
    student.name,
    student.email,
    student.phone,
    student.branch,
    student.academicCGPA,
    student.resumeVersion,
    student.portfolioUrl,
    student.linkedinUrl,
    student.githubUrl,
    student.technicalSkills,
    student.certifications,
  ];

  const completed = checkpoints.filter(Boolean).length;
  return Math.round((completed / checkpoints.length) * 100);
};

export const formatBoolean = (value) => (value ? "Yes" : "No");

export const getEligibility = (currentUser, drive) => {
  if (!currentUser) {
    return { eligible: false, reason: "Login required." };
  }

  if (currentUser.jobsOffered >= 2) {
    return { eligible: false, reason: "Maximum offer limit reached." };
  }

  const categoryRank = { Mass: 1, Core: 2, Dream: 3 };

  if (
    currentUser.isPlaced &&
    categoryRank[currentUser.placedCategory] > categoryRank[drive.category]
  ) {
    return {
      eligible: false,
      reason: `Placed in ${currentUser.placedCategory}, cannot move to ${drive.category}.`,
    };
  }

  if (Number(currentUser.academicCGPA) < Number(drive.eligibility)) {
    return {
      eligible: false,
      reason: `CGPA below required ${drive.eligibility}.`,
    };
  }

  if (Number(currentUser.backlogs) > Number(drive.maxBacklogs ?? 0)) {
    return {
      eligible: false,
      reason: `Backlog limit exceeded (${drive.maxBacklogs}).`,
    };
  }

  return { eligible: true, reason: "Eligible" };
};
