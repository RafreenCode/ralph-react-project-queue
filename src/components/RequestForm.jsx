import { useState, useRef, useEffect } from "react";

/**
 * RequestForm component for capturing student assistance requests.
 * Uses controlled inputs with local state and native DOM refs for programmatic focus management.
 */
export default function RequestForm({ onAddRequest }) {
  const [studentName, setStudentName] = useState("");
  const [concern, setConcern] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [formError, setFormError] = useState("");

  // Dedicated DOM refs for hardware focus management
  const nameInputRef = useRef(null);
  const concernInputRef = useRef(null);

  // Focus the student name input immediately upon component mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = studentName.trim();
    const trimmedConcern = concern.trim();

    // Validate student name
    if (!trimmedName) {
      setFormError("Student name cannot be blank or whitespace-only.");
      nameInputRef.current?.focus();
      return;
    }

    // Validate concern description
    if (!trimmedConcern) {
      setFormError("Please provide a description of the concern.");
      concernInputRef.current?.focus();
      return;
    }

    // Pass valid payload to parent state updater
    onAddRequest({
      studentName: trimmedName,
      concern: trimmedConcern,
      priority,
    });

    // Reset transient form fields and clear error
    setStudentName("");
    setConcern("");
    setPriority("Normal");
    setFormError("");

    // Refocus name input immediately for continuous keyboard-driven submissions
    nameInputRef.current?.focus();
  };

  return (
    <section className="card form-card" aria-labelledby="form-heading">
      <div className="card-header">
        <h2 id="form-heading" className="card-title">Request Assistance</h2>
        <p className="card-subtitle">Submit a question or issue for the laboratory instructor</p>
      </div>

      {formError && (
        <div className="form-alert" role="alert" aria-live="assertive">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="request-form" noValidate>
        <div className="form-group">
          <label htmlFor="student-name-input" className="form-label">
            Student Name <span className="required-indicator">*</span>
          </label>
          <input
            ref={nameInputRef}
            id="student-name-input"
            type="text"
            className="form-control"
            placeholder="e.g. Ana Lovelace"
            value={studentName}
            onChange={(e) => {
              setStudentName(e.target.value);
              if (formError) setFormError("");
            }}
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="concern-textarea" className="form-label">
            Concern / Issue <span className="required-indicator">*</span>
          </label>
          <textarea
            ref={concernInputRef}
            id="concern-textarea"
            className="form-control form-textarea"
            rows="3"
            placeholder="e.g. My component does not update when state changes..."
            value={concern}
            onChange={(e) => {
              setConcern(e.target.value);
              if (formError) setFormError("");
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority-select" className="form-label">
            Priority Level
          </label>
          <div className="select-wrapper">
            <select
              id="priority-select"
              className="form-control form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Normal">Normal Priority</option>
              <option value="High">High Priority (Urgent)</option>
            </select>
          </div>
          <span className="form-help-text">
            High priority requests are automatically placed ahead of Normal priority requests in the queue.
          </span>
        </div>

        <button
          type="submit"
          id="submit-request-btn"
          className="btn btn-primary btn-submit"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Join Queue</span>
        </button>
      </form>
    </section>
  );
}
