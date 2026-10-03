/**
 * QueueSummary component displaying active metrics (waiting, resolved, total)
 * and providing interactive filter buttons for queue status.
 */
export default function QueueSummary({
  waitingCount,
  resolvedCount,
  totalCount,
  activeFilter,
  onFilterChange,
}) {
  const filterOptions = [
    { id: "All", label: "All Requests", count: totalCount },
    { id: "Waiting", label: "Waiting", count: waitingCount },
    { id: "Resolved", label: "Resolved", count: resolvedCount },
  ];

  return (
    <section className="queue-summary" aria-label="Queue Statistics and Filters">
      {/* Metric Stat Cards */}
      <div className="stat-cards-grid">
        <div className="stat-card stat-waiting">
          <div className="stat-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Waiting</span>
            <span className="stat-value" id="waiting-count-display">{waitingCount}</span>
          </div>
          <span className="stat-indicator-dot" title="Awaiting instructor assistance" />
        </div>

        <div className="stat-card stat-resolved">
          <div className="stat-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Resolved</span>
            <span className="stat-value" id="resolved-count-display">{resolvedCount}</span>
          </div>
        </div>

        <div className="stat-card stat-total">
          <div className="stat-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Requests</span>
            <span className="stat-value" id="total-count-display">{totalCount}</span>
          </div>
        </div>
      </div>

      {/* Filter Control Tabs */}
      <div className="filter-bar">
        <span className="filter-label">Filter Queue:</span>
        <div className="filter-buttons" role="group" aria-label="Status filter options">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                id={`filter-btn-${opt.id.toLowerCase()}`}
                className={`filter-btn ${isActive ? "active" : ""}`}
                onClick={() => onFilterChange(opt.id)}
                aria-pressed={isActive}
              >
                <span>{opt.label}</span>
                <span className="filter-count-badge">{opt.count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
