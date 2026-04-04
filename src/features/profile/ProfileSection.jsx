import { useEffect, useState } from "react";

export default function ProfileSection({ currentUser, onSaveProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(currentUser);

  useEffect(() => {
    setForm(currentUser);
  }, [currentUser]);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="content-card">
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
          <input value={form.dob} onChange={(e) => updateField("dob", e.target.value)} type="date" />
          <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Phone Number" />
          <input value={form.gender} onChange={(e) => updateField("gender", e.target.value)} placeholder="Gender" />
          <input value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Address" />
          <input value={form.branch} onChange={(e) => updateField("branch", e.target.value)} placeholder="Branch" />
          <input value={form.year} onChange={(e) => updateField("year", e.target.value)} placeholder="Year of Study" type="number" />
          <input value={form.academicCGPA} onChange={(e) => updateField("academicCGPA", e.target.value)} placeholder="CGPA" type="number" step="0.1" />
          <input value={form.backlogs} onChange={(e) => updateField("backlogs", e.target.value)} placeholder="Backlogs" type="number" />
          <input value={form.tenth} onChange={(e) => updateField("tenth", e.target.value)} placeholder="10th Percentage" type="number" step="0.1" />
          <input value={form.twelfth} onChange={(e) => updateField("twelfth", e.target.value)} placeholder="12th Percentage" type="number" step="0.1" />
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
          <div><span>Gender</span><strong>{currentUser.gender || "N/A"}</strong></div>
          <div><span>Address</span><strong>{currentUser.address || "N/A"}</strong></div>
          <div><span>Branch</span><strong>{currentUser.branch || "N/A"}</strong></div>
          <div><span>Year</span><strong>{currentUser.year || "N/A"}</strong></div>
          <div><span>CGPA</span><strong>{currentUser.academicCGPA || "N/A"}</strong></div>
          <div><span>Backlogs</span><strong>{currentUser.backlogs ?? "N/A"}</strong></div>
          <div><span>10th %</span><strong>{currentUser.tenth || "N/A"}</strong></div>
          <div><span>12th %</span><strong>{currentUser.twelfth || "N/A"}</strong></div>
          <div><span>Jobs Offered</span><strong>{currentUser.jobsOffered || 0}</strong></div>
          <div>
            <span>Status</span>
            <strong>
              {currentUser.isPlaced
                ? `Placed (${currentUser.placedCategory})`
                : "Unplaced"}
            </strong>
          </div>
        </div>
      )}
    </section>
  );
}
