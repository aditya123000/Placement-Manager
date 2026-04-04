import { useEffect, useMemo, useState } from "react";
import ApplicationsSection from "../features/applications/ApplicationsSection";
import AuthView from "../features/auth/AuthView";
import DashboardSection from "../features/dashboard/DashboardSection";
import DrivesSection from "../features/drives/DrivesSection";
import OffCampusSection from "../features/offCampus/OffCampusSection";
import { defaultStudent, driveSeeds, offCampusJobs } from "../features/placement/data";
import PolicySection from "../features/policy/PolicySection";
import ProfileSection from "../features/profile/ProfileSection";
import Modal from "../shared/components/Modal";
import { STORAGE_KEYS, formatDate, packageByCategory } from "../shared/lib/utils";
import Header from "../shared/layout/Header";
import Sidebar from "../shared/layout/Sidebar";

const createDriveState = () =>
  driveSeeds.map((drive) => ({
    ...drive,
    status: "Not Applied",
  }));

const blankRegisteredProfile = (form) => ({
  name: form.name,
  email: form.email,
  dob: form.dob,
  roll: form.roll,
  password: form.password,
  phone: "",
  gender: "",
  address: "",
  branch: "",
  year: 0,
  academicCGPA: 0,
  backlogs: 0,
  tenth: 0,
  twelfth: 0,
  isPlaced: false,
  placedCategory: null,
  jobsOffered: 0,
  myApplications: [],
});

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const [bannerMessage, setBannerMessage] = useState("");
  const [drives, setDrives] = useState(createDriveState);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedOffCampusJob, setSelectedOffCampusJob] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.loginFlag);
    const storedUser = localStorage.getItem(STORAGE_KEYS.loggedInUser);

    if (isLoggedIn === "true" && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setDrives(() =>
        createDriveState().map((drive) => ({
          ...drive,
          status: parsedUser.myApplications?.some(
            (application) =>
              application.source === "drive" && application.driveId === drive.id,
          )
            ? "Applied"
            : "Not Applied",
        })),
      );
    }
  }, []);

  const applications = useMemo(
    () => currentUser?.myApplications ?? [],
    [currentUser],
  );

  const persistUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.loggedInUser, JSON.stringify(updatedUser));

    const registeredStudent = localStorage.getItem(STORAGE_KEYS.registeredStudent);
    if (registeredStudent) {
      const parsedRegistered = JSON.parse(registeredStudent);
      if (
        parsedRegistered.roll === updatedUser.roll ||
        parsedRegistered.name === updatedUser.name
      ) {
        localStorage.setItem(
          STORAGE_KEYS.registeredStudent,
          JSON.stringify(updatedUser),
        );
      }
    }
  };

  const handleLogin = ({ name, password }) => {
    const registeredStudent = localStorage.getItem(STORAGE_KEYS.registeredStudent);
    let matchedUser = null;

    if (registeredStudent) {
      const parsed = JSON.parse(registeredStudent);
      if (parsed.name === name && parsed.password === password) {
        matchedUser = parsed;
      }
    }

    if (!matchedUser && name === defaultStudent.name && password === defaultStudent.password) {
      matchedUser = defaultStudent;
    }

    if (!matchedUser) {
      setAuthError("Login failed. Check your name and password.");
      return;
    }

    setAuthError("");
    setBannerMessage(`Logged in as ${matchedUser.name}.`);
    setCurrentUser(matchedUser);
    setActiveSection("dashboard");
    localStorage.setItem(STORAGE_KEYS.loggedInUser, JSON.stringify(matchedUser));
    localStorage.setItem(STORAGE_KEYS.loginFlag, "true");
    setDrives(
      createDriveState().map((drive) => ({
        ...drive,
        status: matchedUser.myApplications?.some(
          (application) =>
            application.source === "drive" && application.driveId === drive.id,
        )
          ? "Applied"
          : "Not Applied",
      })),
    );
  };

  const handleRegister = (form, onSuccess) => {
    if (
      !form.name ||
      !form.email ||
      !form.dob ||
      !form.roll ||
      !form.password ||
      !form.confirmPassword
    ) {
      setAuthError("Please fill all registration fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    const profile = blankRegisteredProfile(form);
    localStorage.setItem(STORAGE_KEYS.registeredStudent, JSON.stringify(profile));
    setAuthError("");
    setBannerMessage("Account created successfully. You can now log in.");
    onSuccess();
  };

  const handleSaveProfile = (profile) => {
    const updatedUser = {
      ...currentUser,
      ...profile,
      academicCGPA: Number(profile.academicCGPA) || 0,
      year: Number(profile.year) || 0,
      backlogs: Number(profile.backlogs) || 0,
      tenth: Number(profile.tenth) || 0,
      twelfth: Number(profile.twelfth) || 0,
    };
    persistUser(updatedUser);
    setBannerMessage("Profile updated successfully.");
  };

  const handleApplyToDrive = () => {
    if (!selectedDrive || !currentUser) {
      return;
    }

    const alreadyApplied = applications.some(
      (application) =>
        application.source === "drive" && application.driveId === selectedDrive.id,
    );

    if (alreadyApplied) {
      setSelectedDrive(null);
      return;
    }

    const updatedApplications = [
      ...applications,
      {
        id: `${selectedDrive.id}-application`,
        driveId: selectedDrive.id,
        source: "drive",
        company: selectedDrive.company,
        role: selectedDrive.role,
        status: "Applied",
        package: packageByCategory[selectedDrive.category],
        location: "Bengaluru / Hyderabad / Delhi NCR",
        roleDescription:
          "Contribute to engineering deliverables, collaborate with mentors, and ship production-quality work.",
        companyDescription: selectedDrive.description,
      },
    ];

    const updatedUser = { ...currentUser, myApplications: updatedApplications };
    persistUser(updatedUser);
    setDrives((current) =>
      current.map((drive) =>
        drive.id === selectedDrive.id ? { ...drive, status: "Applied" } : drive,
      ),
    );
    setBannerMessage(`Application submitted for ${selectedDrive.company}.`);
    setSelectedDrive(null);
    setActiveSection("applications");
  };

  const handleUndoApply = (driveId) => {
    if (!currentUser) {
      return;
    }

    const updatedUser = {
      ...currentUser,
      myApplications: applications.filter(
        (application) => !(application.source === "drive" && application.driveId === driveId),
      ),
    };

    persistUser(updatedUser);
    setDrives((current) =>
      current.map((drive) =>
        drive.id === driveId ? { ...drive, status: "Not Applied" } : drive,
      ),
    );
    setBannerMessage("Application removed.");
  };

  const handleApplyOffCampus = () => {
    if (!selectedOffCampusJob || !currentUser) {
      return;
    }

    const alreadyApplied = applications.some(
      (application) =>
        application.source === "off-campus" &&
        application.company === selectedOffCampusJob.company &&
        application.role === selectedOffCampusJob.role,
    );

    if (alreadyApplied) {
      setSelectedOffCampusJob(null);
      return;
    }

    const updatedUser = {
      ...currentUser,
      myApplications: [
        ...applications,
        {
          id: `${selectedOffCampusJob.id}-application`,
          source: "off-campus",
          company: selectedOffCampusJob.company,
          role: selectedOffCampusJob.role,
          status: "Applied (Off-Campus)",
          package: "Varies by role",
          location: selectedOffCampusJob.location,
          roleDescription: selectedOffCampusJob.description,
          companyDescription: `${selectedOffCampusJob.company} off-campus hiring opportunity.`,
        },
      ],
    };

    persistUser(updatedUser);
    setBannerMessage(`Off-campus application saved for ${selectedOffCampusJob.company}.`);
    setSelectedOffCampusJob(null);
    setActiveSection("applications");
  };

  const handleDownloadPolicy = () => {
    const content = [
      "Privacy Policy - Placement Manager",
      "",
      "1. Information We Collect",
      "- Personal details, academic records, and application history.",
      "",
      "2. Why We Collect It",
      "- To evaluate drive eligibility and personalize the dashboard.",
      "",
      "3. Data Protection",
      "- This demo stores information in browser localStorage only.",
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
    setDrives(createDriveState());
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
            onMenuToggle={() => setIsMobileOpen((current) => !current)}
          />

          {bannerMessage ? <div className="banner">{bannerMessage}</div> : null}

          {activeSection === "dashboard" ? (
            <DashboardSection
              currentUser={currentUser}
              drives={drives}
              onApplyClick={setSelectedDrive}
              onUndoApply={handleUndoApply}
            />
          ) : null}

          {activeSection === "profile" ? (
            <ProfileSection currentUser={currentUser} onSaveProfile={handleSaveProfile} />
          ) : null}

          {activeSection === "drives" ? (
            <DrivesSection drives={drives} onSelectDrive={setSelectedDrive} />
          ) : null}

          {activeSection === "applications" ? (
            <ApplicationsSection
              applications={applications}
              onSelectApplication={setSelectedApplication}
            />
          ) : null}

          {activeSection === "off-campus" ? (
            <OffCampusSection
              jobs={offCampusJobs}
              applications={applications}
              onApply={setSelectedOffCampusJob}
            />
          ) : null}

          {activeSection === "policy" ? (
            <PolicySection onDownload={handleDownloadPolicy} />
          ) : null}
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
            <p><strong>Base Package:</strong> {packageByCategory[selectedDrive.category]}</p>
            <p><strong>Eligibility:</strong> {selectedDrive.eligibility}+ CGPA</p>
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
            <p><strong>Package:</strong> {selectedApplication.package}</p>
            <p><strong>Location:</strong> {selectedApplication.location}</p>
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
            <button className="primary-button" type="button" onClick={handleApplyOffCampus}>
              Save Application
            </button>
          </>
        }
      >
        {selectedOffCampusJob ? (
          <div className="modal-copy">
            <p><strong>Role:</strong> {selectedOffCampusJob.role}</p>
            <p><strong>Location:</strong> {selectedOffCampusJob.location}</p>
            <p><strong>Apply By:</strong> {formatDate(selectedOffCampusJob.applyBy)}</p>
            <p>{selectedOffCampusJob.description}</p>
          </div>
        ) : null}
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
