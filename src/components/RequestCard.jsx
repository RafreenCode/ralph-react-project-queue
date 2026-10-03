/**
 * RequestCard component representing an individual student assistance request.
 * Displays student name, concern, priority badge, status, formatted timestamp,
 * and Resolve / Delete action buttons.
 */
export default function RequestCard({
  request,
  index,
  onResolve,
  onDelete,
}) {
  const { id, studentName, concern, priority, status, createdAt } = request;

  const isHighPriority = priority === "High";
  const isResolved = status === "Resolved";

  // Formatted human-readable timestamp
  const formattedTime = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <article
      className={`request-card ${isHighPriority ? "priority-high" : "priority-normal"} ${isResolved ? "status-resolved" : "status-waiting"}`}
      data-id={id}
      aria-labelledby={`req-name-${id}`}
    >
      <div className="card-top">
        <div className="card-meta">
          <span className="queue-position" title="Queue Position">
            #{index + 1}
          </span>
          <span
            className={`badge priority-badge ${isHighPriority ? "badge-high" : "badge-normal"}`}
          >
            {isHighPriority ? "🔥 High Priority" : "Normal Priority"}
          </span>
          <span
            className={`badge status-badge ${isResolved ? "badge-resolved" : "badge-waiting"}`}
          >
            {isResolved ? "✓ Resolved" : "⏳ Waiting"}
          </span>
        </div>

        <time className="timestamp-text" dateTime={new Date(createdAt).toISOString()}>
          {formattedTime}
        </time>
      </div>

      <div className="card-content">
        <h3 id={`req-name-${id}`} className="student-name">
          {studentName}
        </h3>
        <p className="student-concern">{concern}</p>
      </div>

      <div className="card-actions">
        {!isResolved ? (
          <button
            type="button"
            className="btn btn-resolve"
            onClick={() => onResolve(id)}
            aria-label={`Resolve request for ${studentName}`}
            title="Mark this request as resolved"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Resolve</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-resolved-disabled"
            disabled
            aria-label={`Request for ${studentName} is resolved`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Resolved</span>
          </button>
        )}

        <button
          type="button"
          className="btn btn-delete"
          onClick={() => onDelete(id)}
          aria-label={`Delete request for ${studentName}`}
          title="Remove this request from queue"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}
