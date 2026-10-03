import RequestCard from "./RequestCard";

/**
 * RequestList component rendering the sorted list of student assistance requests.
 * Ensures each child receives a stable, unique request.id as its React key.
 */
export default function RequestList({
  requests,
  onResolve,
  onDelete,
  activeFilter,
}) {
  if (requests.length === 0) {
    return (
      <section className="request-list-empty" aria-label="Empty queue status">
        <div className="empty-state-card">
          <div className="empty-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <h3 className="empty-title">
            {activeFilter === "All"
              ? "The Assistance Queue is Empty"
              : `No ${activeFilter} Requests Found`}
          </h3>
          <p className="empty-desc">
            {activeFilter === "All"
              ? "Students can submit their assistance requests using the form on the left."
              : `There are currently no requests with "${activeFilter}" status.`}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="request-list-container" aria-label="Assistance Queue List">
      <div className="request-list-header">
        <h2 className="list-title">
          Queue Records <span className="list-count">({requests.length})</span>
        </h2>
        <span className="queue-sorting-hint">
          ⚡ Sorted by Priority (High first), then FIFO (arrival time)
        </span>
      </div>

      <div className="request-cards-stack">
        {requests.map((req, index) => (
          <RequestCard
            key={req.id}
            request={req}
            index={index}
            onResolve={onResolve}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
