const API_BASE = import.meta.env.VITE_API_BASE || "/api";

const request = async (path, options = {}) => {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, options);
  } catch (error) {
    throw new Error(
      "Cannot reach the backend server. Start it with `npm run server` and try again.",
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();
  let payload = {};

  if (raw && contentType.includes("application/json")) {
    try {
      payload = JSON.parse(raw);
    } catch {
      if (!response.ok) {
        throw new Error("Server returned an invalid response. Make sure the backend is running correctly.");
      }
      throw new Error("Received a non-JSON response from the server.");
    }
  }

  if (!response.ok) {
    if (payload.message) {
      throw new Error(payload.message);
    }

    if (response.status >= 500) {
      throw new Error(
        "The backend server is unavailable or crashed. Start it with `npm run server` and try again.",
      );
    }

    throw new Error(`Request failed (${response.status}).`);
  }

  return payload;
};

export const api = {
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }),
  register: (form) =>
    request("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }),
  bootstrap: (userId) => request(`/bootstrap/${userId}`),
  saveProfile: (userId, profile) =>
    request(`/profile/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    }),
  uploadResume: (userId, file) => {
    const formData = new FormData();
    formData.append("resume", file);
    return request(`/resume/${userId}`, {
      method: "POST",
      body: formData,
    });
  },
  applyToDrive: (userId, driveId) =>
    request(`/drives/${driveId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }),
  toggleWishlist: (userId, driveId) =>
    request(`/drives/${driveId}/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }),
  advanceApplication: (userId, applicationId) =>
    request(`/applications/${applicationId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }),
  getNotifications: (userId) => request(`/notifications/${userId}`),
  markNotificationRead: (userId, notificationId) =>
    request(`/notifications/${notificationId}/read`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }),
  getCalendar: (userId) => request(`/calendar/${userId}`),
  getManagementOverview: (userId) => request(`/management/overview/${userId}`),
  getManagementStudents: (userId) => request(`/management/students/${userId}`),
  updateStudentPlacementStatus: (userId, studentId, payload) =>
    request(`/management/students/${studentId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...payload }),
    }),
  createDrive: (userId, drive) =>
    request("/management/drives", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, drive }),
    }),
  updateDrive: (userId, driveId, drive) =>
    request(`/management/drives/${driveId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, drive }),
    }),
  getAuditLogs: (userId) => request(`/management/audit/${userId}`),
};

export const createEventsStream = () => new EventSource(`${API_BASE}/events`);
