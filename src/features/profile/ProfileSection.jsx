import { useEffect, useState } from "react";
import { formatBoolean } from "../../shared/lib/utils";

export default function ProfileSection({
  currentUser,
  onResumeSelected,
  onUploadResume,
  resumeFile,
  onSaveProfile,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(currentUser);

  useEffect(() => {
    setForm(currentUser);
  }, [currentUser]);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="panel-stack">
      <article className="content-card">
        <div className="section-head">
          <div>
            <h2>My Profile & Academic Details</h2>
            <p>Keep your placement profile accurate so eligibility checks stay reliable.</p>
          </div>
          <button
            className={isEditing ? "ghost-button" : "primary-button"}
            type="button"
            onClick={() => setIsEditing((current) => !current)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing ? (
          <div className="form-grid">
          <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Full Name" />
          <input value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="Email" type="email" />
          <input value={form.dob} onChange={(e) => updateField("dob", e.target.value)} type="date" placeholder="Date of Birth" aria-label="Date of Birth" />
          <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Phone Number" />
          <input value={form.alternatePhone} onChange={(e) => updateField("alternatePhone", e.target.value)} placeholder="Alternate Phone" />
          <input value={form.gender} onChange={(e) => updateField("gender", e.target.value)} placeholder="Gender" />
          <input value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Address" />
          <input value={form.city} onChange={(e) => updateField("city", e.target.value)} placeholder="City" />
          <input value={form.state} onChange={(e) => updateField("state", e.target.value)} placeholder="State" />
          <input value={form.branch} onChange={(e) => updateField("branch", e.target.value)} placeholder="Branch" />
          <input value={form.specialization} onChange={(e) => updateField("specialization", e.target.value)} placeholder="Specialization" />
          <input value={form.year} onChange={(e) => updateField("year", e.target.value)} placeholder="Year of Study" type="number" min="0" aria-label="Year of Study" />
          <input value={form.section} onChange={(e) => updateField("section", e.target.value)} placeholder="Section" />
          <input value={form.semester} onChange={(e) => updateField("semester", e.target.value)} placeholder="Semester" type="number" min="0" aria-label="Semester" />
          <input value={form.academicCGPA} onChange={(e) => updateField("academicCGPA", e.target.value)} placeholder="CGPA" type="number" step="0.1" min="0" aria-label="CGPA" />
          <input value={form.backlogs} onChange={(e) => updateField("backlogs", e.target.value)} placeholder="Backlogs" type="number" min="0" aria-label="Backlogs" />
          <input value={form.tenth} onChange={(e) => updateField("tenth", e.target.value)} placeholder="10th %" type="number" step="0.1" min="0" aria-label="10th Percentage" />
          <input value={form.twelfth} onChange={(e) => updateField("twelfth", e.target.value)} placeholder="12th %" type="number" step="0.1" min="0" aria-label="12th Percentage" />
          <input value={form.diploma} onChange={(e) => updateField("diploma", e.target.value)} placeholder="Diploma %" type="number" step="0.1" min="0" aria-label="Diploma Percentage" />
          <input value={form.resumeVersion} onChange={(e) => updateField("resumeVersion", e.target.value)} placeholder="Resume Filename" aria-label="Resume Filename" />
          <input value={form.portfolioUrl} onChange={(e) => updateField("portfolioUrl", e.target.value)} placeholder="Portfolio URL" />
          <input value={form.linkedinUrl} onChange={(e) => updateField("linkedinUrl", e.target.value)} placeholder="LinkedIn URL" />
          <input value={form.githubUrl} onChange={(e) => updateField("githubUrl", e.target.value)} placeholder="GitHub URL" />
          <input value={form.leetcodeUrl} onChange={(e) => updateField("leetcodeUrl", e.target.value)} placeholder="LeetCode URL" />
          <input value={form.preferredLocations} onChange={(e) => updateField("preferredLocations", e.target.value)} placeholder="Preferred Locations" />
          <input value={form.expectedCtc} onChange={(e) => updateField("expectedCtc", e.target.value)} placeholder="Expected CTC" />
          <input value={form.internshipExperience} onChange={(e) => updateField("internshipExperience", e.target.value)} placeholder="Internship Experience" />
          <input value={form.technicalSkills} onChange={(e) => updateField("technicalSkills", e.target.value)} placeholder="Technical Skills" />
          <input value={form.softSkills} onChange={(e) => updateField("softSkills", e.target.value)} placeholder="Soft Skills" />
          <input value={form.certifications} onChange={(e) => updateField("certifications", e.target.value)} placeholder="Certifications" />
          <input value={form.achievements} onChange={(e) => updateField("achievements", e.target.value)} placeholder="Achievements" />
          <input value={form.placementCoordinator} onChange={(e) => updateField("placementCoordinator", e.target.value)} placeholder="Placement Coordinator" />
          <input value={form.mentorName} onChange={(e) => updateField("mentorName", e.target.value)} placeholder="Mentor Name" />
          <div className="form-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                onSaveProfile(form);
                setIsEditing(false);
              }}
            >
              Save Changes
            </button>
          </div>
          </div>
        ) : (
          <div className="details-grid">
          <div><span>Name</span><strong>{currentUser.name || "N/A"}</strong></div>
          <div><span>Email</span><strong>{currentUser.email || "N/A"}</strong></div>
          <div><span>Date of Birth</span><strong>{currentUser.dob || "N/A"}</strong></div>
          <div><span>Phone</span><strong>{currentUser.phone || "N/A"}</strong></div>
          <div><span>Alternate Phone</span><strong>{currentUser.alternatePhone || "N/A"}</strong></div>
          <div><span>Gender</span><strong>{currentUser.gender || "N/A"}</strong></div>
          <div><span>Address</span><strong>{currentUser.address || "N/A"}</strong></div>
          <div><span>City</span><strong>{currentUser.city || "N/A"}</strong></div>
          <div><span>State</span><strong>{currentUser.state || "N/A"}</strong></div>
          <div><span>Branch</span><strong>{currentUser.branch || "N/A"}</strong></div>
          <div><span>Specialization</span><strong>{currentUser.specialization || "N/A"}</strong></div>
          <div><span>Year of Study</span><strong>{currentUser.year ?? "N/A"}</strong></div>
          <div><span>Section</span><strong>{currentUser.section || "N/A"}</strong></div>
          <div><span>Semester</span><strong>{currentUser.semester ?? "N/A"}</strong></div>
          <div><span>CGPA</span><strong>{currentUser.academicCGPA ?? "N/A"}</strong></div>
          <div><span>Backlogs</span><strong>{currentUser.backlogs ?? "N/A"}</strong></div>
          <div><span>10th %</span><strong>{currentUser.tenth ?? "N/A"}</strong></div>
          <div><span>12th %</span><strong>{currentUser.twelfth ?? "N/A"}</strong></div>
          <div><span>Resume Filename</span><strong>{currentUser.resumeVersion || "N/A"}</strong></div>
          <div><span>Preferred Locations</span><strong>{currentUser.preferredLocations || "N/A"}</strong></div>
          <div><span>Expected CTC</span><strong>{currentUser.expectedCtc || "N/A"}</strong></div>
          <div><span>Portfolio</span><strong>{currentUser.portfolioUrl || "N/A"}</strong></div>
          <div><span>LinkedIn</span><strong>{currentUser.linkedinUrl || "N/A"}</strong></div>
          <div><span>GitHub</span><strong>{currentUser.githubUrl || "N/A"}</strong></div>
          <div><span>LeetCode</span><strong>{currentUser.leetcodeUrl || "N/A"}</strong></div>
          <div><span>Technical Skills</span><strong>{currentUser.technicalSkills || "N/A"}</strong></div>
          <div><span>Soft Skills</span><strong>{currentUser.softSkills || "N/A"}</strong></div>
          <div><span>Certifications</span><strong>{currentUser.certifications || "N/A"}</strong></div>
          <div><span>Achievements</span><strong>{currentUser.achievements || "N/A"}</strong></div>
          <div><span>Jobs Offered</span><strong>{currentUser.jobsOffered || 0}</strong></div>
          <div>
            <span>Status</span>
            <strong>
              {currentUser.isPlaced
                ? `Placed (${currentUser.placedCategory})`
              : "Unplaced"}
            </strong>
          </div>
          <div><span>Willing To Relocate</span><strong>{formatBoolean(currentUser.willingToRelocate)}</strong></div>
          <div><span>Placement Coordinator</span><strong>{currentUser.placementCoordinator || "N/A"}</strong></div>
          </div>
        )}
      </article>

      <article className="content-card">
        <div className="section-head">
          <div>
            <h2>Resume Parsing</h2>
            <p>Upload a resume to auto-extract skills, CGPA, and project highlights.</p>
          </div>
          <div className="inline-actions">
            <input type="file" accept=".pdf,.txt,.md" onChange={onResumeSelected} />
            <button className="primary-button" type="button" onClick={onUploadResume} disabled={!resumeFile}>
              Upload Resume
            </button>
          </div>
        </div>
        <div className="details-grid compact-grid">
          <div>
            <span>Parsed Resume</span>
            <strong>{currentUser.resumeData?.fileName || "No resume uploaded"}</strong>
          </div>
          <div>
            <span>Extracted CGPA</span>
            <strong>{currentUser.resumeData?.extractedCgpa ?? currentUser.academicCGPA ?? "N/A"}</strong>
          </div>
          <div>
            <span>Extracted Skills</span>
            <strong>{currentUser.resumeData?.extractedSkills?.join(", ") || "No skills extracted yet"}</strong>
          </div>
          <div>
            <span>Projects</span>
            <strong>{currentUser.resumeData?.extractedProjects?.join(", ") || "No projects extracted yet"}</strong>
          </div>
        </div>
      </article>
    </section>
  );
}
