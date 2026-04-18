import { useMemo, useState } from "react";

const initialForm = {
  company: "",
  role: "",
  category: "Core",
  package: "",
  eligibility: "",
  maxBacklogs: "0",
  date: "",
  driveDate: "",
  location: "",
  mode: "Hybrid",
  slots: "",
  rounds: "",
  skills: "",
  description: "",
};

export default function DriveOperationsPanel({ drives, onCreateDrive, onUpdateDrive }) {
  const [form, setForm] = useState(initialForm);
  const [editingDriveId, setEditingDriveId] = useState("");

  const sortedDrives = useMemo(
    () => [...drives].sort((a, b) => String(a.date).localeCompare(String(b.date))),
    [drives],
  );

  const selectedDrive = useMemo(
    () => drives.find((drive) => drive.id === editingDriveId),
    [drives, editingDriveId],
  );

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await onCreateDrive(form);
    setForm(initialForm);
  };

  return (
    <article className="content-card">
      <div className="section-head">
        <div>
          <h2>Drive Operations</h2>
          <p>Create new drives and update existing records with coordinator controls.</p>
        </div>
      </div>

      <form className="form-grid operations-drive-form" onSubmit={submit}>
        <input placeholder="Company" value={form.company} onChange={(event) => handleChange("company", event.target.value)} required />
        <input placeholder="Role" value={form.role} onChange={(event) => handleChange("role", event.target.value)} required />
        <select value={form.category} onChange={(event) => handleChange("category", event.target.value)}>
          <option value="Dream">Dream</option>
          <option value="Core">Core</option>
          <option value="Mass">Mass</option>
        </select>
        <input placeholder="Package (ex: 12 LPA)" value={form.package} onChange={(event) => handleChange("package", event.target.value)} required />
        <input type="number" step="0.1" placeholder="Min CGPA" value={form.eligibility} onChange={(event) => handleChange("eligibility", event.target.value)} required />
        <input type="number" min="0" placeholder="Max Backlogs" value={form.maxBacklogs} onChange={(event) => handleChange("maxBacklogs", event.target.value)} />
        <input type="date" value={form.date} onChange={(event) => handleChange("date", event.target.value)} required />
        <input type="date" value={form.driveDate} onChange={(event) => handleChange("driveDate", event.target.value)} required />
        <input placeholder="Location" value={form.location} onChange={(event) => handleChange("location", event.target.value)} />
        <input placeholder="Mode" value={form.mode} onChange={(event) => handleChange("mode", event.target.value)} />
        <input type="number" min="0" placeholder="Slots" value={form.slots} onChange={(event) => handleChange("slots", event.target.value)} />
        <input placeholder="Rounds" value={form.rounds} onChange={(event) => handleChange("rounds", event.target.value)} />
        <input placeholder="Skills (comma separated)" value={form.skills} onChange={(event) => handleChange("skills", event.target.value)} />
        <textarea placeholder="Drive description" value={form.description} onChange={(event) => handleChange("description", event.target.value)} rows={3} />
        <button className="primary-button" type="submit">Create Drive</button>
      </form>

      <div className="inline-actions operations-drive-editors">
        <select value={editingDriveId} onChange={(event) => setEditingDriveId(event.target.value)}>
          <option value="">Select drive to set as filled</option>
          {sortedDrives.map((drive) => (
            <option key={drive.id} value={drive.id}>
              {drive.company} - {drive.role}
            </option>
          ))}
        </select>
        <button
          className="ghost-button"
          type="button"
          disabled={!selectedDrive}
          onClick={() => selectedDrive && onUpdateDrive(selectedDrive.id, { slots: 0 })}
        >
          Mark Drive Filled
        </button>
      </div>
    </article>
  );
}
