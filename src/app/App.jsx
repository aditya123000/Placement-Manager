import { useEffect, useMemo, useState } from "react";
import AnalyticsSection from "../features/analytics/AnalyticsSection";
import ApplicationsSection from "../features/applications/ApplicationsSection";
import AuthView from "../features/auth/AuthView";
import CalendarSection from "../features/calendar/CalendarSection";
import DashboardSection from "../features/dashboard/DashboardSection";
import DrivesSection from "../features/drives/DrivesSection";
import NotificationsPanel from "../features/notifications/NotificationsPanel";
import OffCampusSection from "../features/offCampus/OffCampusSection";
import OperationsSection from "../features/operations/OperationsSection";
import PreparationSection from "../features/preparation/PreparationSection";
import { getNavItemsForRole } from "../features/placement/data";
import PolicySection from "../features/policy/PolicySection";
import ProfileSection from "../features/profile/ProfileSection";
import ResourcesSection from "../features/resources/ResourcesSection";
import Modal from "../shared/components/Modal";
import { api, createEventsStream } from "../shared/lib/api";
import { STORAGE_KEYS, formatDate } from "../shared/lib/utils";
import Header from "../shared/layout/Header";
import Sidebar from "../shared/layout/Sidebar";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const [bannerMessage, setBannerMessage] = useState("");
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedOffCampusJob, setSelectedOffCampusJob] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);

  const isCoordinator = currentUser?.role === "coordinator";
  const navItems = useMemo(() => getNavItemsForRole(currentUser?.role), [currentUser?.role]);
  const drives = useMemo(
    () =>
      (isCoordinator ? currentUser?.management?.drives : currentUser?.drives ?? []).map((drive) => ({
        ...drive,
        eligibilityDetail: drive.eligibility,
        status: drive.applicationStatus === "Not Applied" ? "Not Applied" : "Applied",
      })),
    [currentUser, isCoordinator],
  );

  const applications = useMemo(() => currentUser?.myApplications ?? [], [currentUser]);
  const notifications = useMemo(() => currentUser?.notifications ?? [], [currentUser]);
  const calendarEvents = useMemo(() => currentUser?.calendarEvents ?? [], [currentUser]);
  const unreadNotifications = notifications.filter((item) => !item.read).length;

  const applyUserPayload = (user) => {
    setCurrentUser(user);
    localStorage.setItem(
      STORAGE_KEYS.loggedInUser,
      JSON.stringify({ id: user.id, name: user.name }),
    );
    localStorage.setItem(STORAGE_KEYS.loginFlag, "true");
  };

  const bootstrapUser = async (userId) => {
    const { user } = await api.bootstrap(userId);
    applyUserPayload(user);
  };

  useEffect(() => {
    const restoreSession = async () => {
      const isLoggedIn = localStorage.getItem(STORAGE_KEYS.loginFlag);
      const storedUser = localStorage.getItem(STORAGE_KEYS.loggedInUser);

      if (isLoggedIn === "true" && storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          await bootstrapUser(parsed.id);
        } catch (error) {
          localStorage.removeItem(STORAGE_KEYS.loggedInUser);
          localStorage.removeItem(STORAGE_KEYS.loginFlag);
        }
      }

      setIsLoading(false);
    };

    restoreSession();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return undefined;
    }

    const stream = createEventsStream();
    stream.addEventListener("notification", (event) => {
      const notification = JSON.parse(event.data);
      if (notification.userId !== currentUser.id) {
        return;
      }

      setCurrentUser((existing) =>
        existing
          ? { ...existing, notifications: [notification, ...(existing.notifications || [])] }
          : existing,
      );
      setBannerMessage(notification.title);
    });

    return () => stream.close();
  }, [currentUser?.id]);

  useEffect(() => {
    if (!navItems.some((item) => item.id === activeSection)) {
      setActiveSection("dashboard");
    }
  }, [activeSection, navItems]);

  const syncUser = async (requester) => {
    if (!currentUser) {
      return;
    }

    const { user } = await requester();
    applyUserPayload(user);
  };

  const handleLogin = async ({ name, password }) => {
    try {
      const { user } = await api.login({ name, password });
      setAuthError("");
      setBannerMessage(`Logged in as ${user.name}.`);
      applyUserPayload(user);
      setActiveSection("dashboard");
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (form, onSuccess) => {
    if (!form.confirmPassword || form.password !== form.confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    try {
      await api.register(form);
      setAuthError("");
      setBannerMessage("Account created successfully. You can now log in.");
      onSuccess();
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleSaveProfile = async (profile) => {
    await syncUser(() => api.saveProfile(currentUser.id, profile));
    setBannerMessage("Profile updated successfully.");
  };

  const handleUploadResume = async () => {
    if (!resumeFile || !currentUser) {
      return;
    }

    await syncUser(() => api.uploadResume(currentUser.id, resumeFile));
    setResumeFile(null);
    setBannerMessage("Resume uploaded and parsed.");
  };

  const handleApplyToDrive = async () => {
    if (!selectedDrive || !currentUser) {
      return;
    }

    await syncUser(() => api.applyToDrive(currentUser.id, selectedDrive.id));
    setBannerMessage(`Application submitted for ${selectedDrive.company}.`);
    setSelectedDrive(null);
    setActiveSection("applications");
  };

  const handleToggleWishlist = async (driveId) => {
    await syncUser(() => api.toggleWishlist(currentUser.id, driveId));
  };

  const handleAdvanceApplication = async (applicationId) => {
    await syncUser(() => api.advanceApplication(currentUser.id, applicationId));
    setBannerMessage("Application status advanced.");
  };

  const handleMarkNotificationRead = async (notificationId) => {
    const { notifications: updatedNotifications } = await api.markNotificationRead(
      currentUser.id,
      notificationId,
    );
    setCurrentUser((existing) =>
      existing ? { ...existing, notifications: updatedNotifications } : existing,
    );
  };

  const refreshCoordinatorOverview = async () => {
    if (!currentUser || !isCoordinator) {
      return;
    }

    const { user } = await api.getManagementOverview(currentUser.id);
    applyUserPayload(user);
  };

  const handleToggleStudentPlacement = async (student) => {
    if (!currentUser || !isCoordinator) {
      return;
    }

    await api.updateStudentPlacementStatus(currentUser.id, student.id, {
      isPlaced: !student.isPlaced,
      placedCategory: student.isPlaced ? null : "Core",
      currentOffer: student.isPlaced
        ? null
        : {
            company: "Campus Offer",
            role: "Graduate Trainee",
            ctc: "6 LPA",
            joining: new Date().toISOString().slice(0, 10),
          },
    });
    await refreshCoordinatorOverview();
    setBannerMessage(`Updated placement status for ${student.name}.`);
  };

  const handleCreateDrive = async (drive) => {
    if (!currentUser || !isCoordinator) {
      return;
    }

    await api.createDrive(currentUser.id, drive);
    await refreshCoordinatorOverview();
    setBannerMessage(`Created drive for ${drive.company}.`);
  };

  const handleUpdateDrive = async (driveId, drive) => {
    if (!currentUser || !isCoordinator) {
      return;
    }

    await api.updateDrive(currentUser.id, driveId, drive);
    await refreshCoordinatorOverview();
    setBannerMessage("Drive updated successfully.");
  };

  const handleDownloadPolicy = () => {
    const content = [
      "Privacy Policy - Placement Manager",
      "",
      "1. Information We Collect",
      "- Student profile, applications, parsed resume fields, notifications, and calendar events.",
      "",
      "2. Why We Collect It",
      "- To calculate match scores, eligibility, and placement workflow updates.",
      "",
      "3. Data Protection",
      "- This demo backend stores data locally for development use.",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Placement_Manager_Privacy_Policy.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.loggedInUser);
    localStorage.removeItem(STORAGE_KEYS.loginFlag);
    setCurrentUser(null);
    setSelectedApplication(null);
    setSelectedDrive(null);
    setSelectedOffCampusJob(null);
    setIsLogoutModalOpen(false);
    setAuthError("");
    setBannerMessage("Logged out successfully.");
  };

  if (!currentUser) {
    return (
      <AuthView
        errorMessage={authError}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  return (
    <>
      <div className="app-shell">
        <Sidebar
          navItems={navItems}
          activeSection={activeSection}
          isMobileOpen={isMobileOpen}
          onSectionChange={(section) => {
            setActiveSection(section);
            setIsMobileOpen(false);
          }}
          onLogoutClick={() => setIsLogoutModalOpen(true)}
        />

        <main className="main-shell">
          <Header
            userName={currentUser.name}
            summary={
              isCoordinator
                ? `${currentUser.management?.metrics?.totalStudents || 0} students | ${currentUser.management?.metrics?.activeDrives || 0} active drives | ${currentUser.management?.metrics?.applicationsTracked || 0} tracked applications`
                : `${currentUser.branch || "Student"} | ${currentUser.academicCGPA || 0} CGPA | ${applications.length} tracked applications`
            }
            unreadCount={unreadNotifications}
            onNotificationsClick={() => setIsNotificationsOpen(true)}
            onMenuToggle={() => setIsMobileOpen((current) => !current)}
            roleLabel={isCoordinator ? "Placement Cell Console" : "Student Dashboard"}
          />

          {bannerMessage ? <div className="banner">{bannerMessage}</div> : null}
          {isLoading ? <div className="banner">Syncing placement data...</div> : null}

          {activeSection === "dashboard" && !isCoordinator ? (
            <DashboardSection
              currentUser={currentUser}
              drives={drives}
              onApplyClick={setSelectedDrive}
              onUndoApply={() => {}}
            />
          ) : null}

          {activeSection === "dashboard" && isCoordinator ? (
            <section className="panel-stack">
              <div className="metrics-grid operations-metrics-grid">
                <article className="metric-card accent-green">
                  <span>Total Students</span>
                  <strong>{currentUser.management?.metrics?.totalStudents || 0}</strong>
                </article>
                <article className="metric-card accent-blue">
                  <span>Placement Rate</span>
                  <strong>{currentUser.management?.metrics?.placementRate || 0}%</strong>
                </article>
                <article className="metric-card accent-amber">
                  <span>Active Drives</span>
                  <strong>{currentUser.management?.metrics?.activeDrives || 0}</strong>
                </article>
                <article className="metric-card accent-slate">
                  <span>Tracked Applications</span>
                  <strong>{currentUser.management?.metrics?.applicationsTracked || 0}</strong>
                </article>
              </div>

              <article className="content-card">
                <div className="section-head">
                  <div>
                    <h2>Coordinator Snapshot</h2>
                    <p>Use Placement Operations for student outcomes, drive creation, and audit history.</p>
                  </div>
                </div>
              </article>
            </section>
          ) : null}

          {activeSection === "profile" ? (
            <ProfileSection
              currentUser={currentUser}
              onResumeSelected={(event) => setResumeFile(event.target.files?.[0] || null)}
              onUploadResume={handleUploadResume}
              resumeFile={resumeFile}
              onSaveProfile={handleSaveProfile}
            />
          ) : null}

          {activeSection === "operations" && isCoordinator ? (
            <OperationsSection
              management={currentUser.management}
              onToggleStudentPlacement={handleToggleStudentPlacement}
              onCreateDrive={handleCreateDrive}
              onUpdateDrive={handleUpdateDrive}
            />
          ) : null}

          {activeSection === "drives" ? (
            <DrivesSection
              drives={drives}
              onSelectDrive={setSelectedDrive}
              onToggleWishlist={handleToggleWishlist}
            />
          ) : null}

          {activeSection === "applications" ? (
            <ApplicationsSection
              applications={applications}
              onAdvanceApplication={handleAdvanceApplication}
              onSelectApplication={setSelectedApplication}
            />
          ) : null}

          {activeSection === "analytics" ? (
            <AnalyticsSection
              currentUser={currentUser}
              applications={applications}
              drives={drives}
            />
          ) : null}

          {activeSection === "calendar" ? <CalendarSection events={calendarEvents} /> : null}
          {activeSection === "preparation" ? <PreparationSection /> : null}

          {activeSection === "off-campus" ? (
            <OffCampusSection
              jobs={currentUser.offCampusJobs || []}
              applications={applications}
              onApply={setSelectedOffCampusJob}
            />
          ) : null}

          {activeSection === "resources" ? <ResourcesSection /> : null}
          {activeSection === "policy" ? <PolicySection onDownload={handleDownloadPolicy} /> : null}
        </main>
      </div>

      <Modal
        isOpen={Boolean(selectedDrive)}
        title={selectedDrive ? `${selectedDrive.company} Application` : ""}
        onClose={() => setSelectedDrive(null)}
        actions={
          <>
            <button className="ghost-button" type="button" onClick={() => setSelectedDrive(null)}>
              Close
            </button>
            <button className="ghost-button" type="button" onClick={() => handleToggleWishlist(selectedDrive.id)}>
              {selectedDrive?.isSaved ? "Remove Save" : "Save"}
            </button>
            <button className="primary-button" type="button" onClick={handleApplyToDrive}>
              Confirm Apply
            </button>
          </>
        }
      >
        {selectedDrive ? (
          <div className="modal-copy">
            <p><strong>Role:</strong> {selectedDrive.role}</p>
            <p><strong>Category:</strong> {selectedDrive.category}</p>
            <p><strong>Package:</strong> {selectedDrive.package}</p>
            <p><strong>Smart Eligibility:</strong> {selectedDrive.eligibilityDetail?.summary}</p>
            <p><strong>Match Score:</strong> {selectedDrive.matchScore}%</p>
            <p><strong>Location:</strong> {selectedDrive.location}</p>
            <p><strong>Mode:</strong> {selectedDrive.mode}</p>
            <p><strong>Rounds:</strong> {selectedDrive.rounds}</p>
            <p><strong>Last Date:</strong> {formatDate(selectedDrive.date)}</p>
            <p>{selectedDrive.description}</p>
          </div>
        ) : null}
      </Modal>

      <Modal
        isOpen={Boolean(selectedApplication)}
        title={selectedApplication ? selectedApplication.company : ""}
        onClose={() => setSelectedApplication(null)}
        actions={
          <button className="ghost-button" type="button" onClick={() => setSelectedApplication(null)}>
            Close
          </button>
        }
      >
        {selectedApplication ? (
          <div className="modal-copy">
            <p><strong>Role Applied:</strong> {selectedApplication.role}</p>
            <p><strong>Status:</strong> {selectedApplication.status}</p>
            <p><strong>Stage:</strong> {selectedApplication.stage || "Profile Review"}</p>
            <p><strong>Package:</strong> {selectedApplication.package}</p>
            <p><strong>Location:</strong> {selectedApplication.location}</p>
            <p><strong>Mode:</strong> {selectedApplication.mode || "N/A"}</p>
            <p><strong>Recruiter:</strong> {selectedApplication.recruiter || "Campus Hiring Team"}</p>
            <p><strong>Applied On:</strong> {selectedApplication.appliedOn ? formatDate(selectedApplication.appliedOn) : "N/A"}</p>
            <p><strong>Next Step:</strong> {selectedApplication.nextStepDate ? formatDate(selectedApplication.nextStepDate) : "Awaited"}</p>
            <p><strong>Role Description:</strong> {selectedApplication.roleDescription}</p>
            <p><strong>Company Description:</strong> {selectedApplication.companyDescription}</p>
          </div>
        ) : null}
      </Modal>

      <Modal
        isOpen={Boolean(selectedOffCampusJob)}
        title={selectedOffCampusJob ? `${selectedOffCampusJob.company} Off-Campus Job` : ""}
        onClose={() => setSelectedOffCampusJob(null)}
        actions={
          <>
            <button
              className="ghost-button"
              type="button"
              onClick={() => setSelectedOffCampusJob(null)}
            >
              Cancel
            </button>
            {selectedOffCampusJob ? (
              <a
                className="link-action"
                href={selectedOffCampusJob.link}
                target="_blank"
                rel="noreferrer"
              >
                Visit Website
              </a>
            ) : null}
          </>
        }
      >
        {selectedOffCampusJob ? (
          <div className="modal-copy">
            <p><strong>Role:</strong> {selectedOffCampusJob.role}</p>
            <p><strong>Location:</strong> {selectedOffCampusJob.location}</p>
            <p><strong>Compensation:</strong> {selectedOffCampusJob.compensation}</p>
            <p><strong>Mode:</strong> {selectedOffCampusJob.mode}</p>
            <p><strong>Apply By:</strong> {formatDate(selectedOffCampusJob.applyBy)}</p>
            <p>{selectedOffCampusJob.description}</p>
          </div>
        ) : null}
      </Modal>

      <Modal
        isOpen={isNotificationsOpen}
        title="Notification Center"
        onClose={() => setIsNotificationsOpen(false)}
        actions={
          <button className="ghost-button" type="button" onClick={() => setIsNotificationsOpen(false)}>
            Close
          </button>
        }
      >
        <NotificationsPanel
          notifications={notifications}
          onRead={handleMarkNotificationRead}
        />
      </Modal>

      <Modal
        isOpen={isLogoutModalOpen}
        title="Confirm Logout"
        onClose={() => setIsLogoutModalOpen(false)}
        actions={
          <>
            <button className="ghost-button" type="button" onClick={() => setIsLogoutModalOpen(false)}>
              Cancel
            </button>
            <button className="danger-button" type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        }
      >
        <p>Are you sure you want to log out of the placement dashboard?</p>
      </Modal>
    </>
  );
}
