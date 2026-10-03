import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { isRequest, sortRequests, filterRequests } from "./queue";
import Header from "./components/Header";
import RequestForm from "./components/RequestForm";
import QueueSummary from "./components/QueueSummary";
import RequestList from "./components/RequestList";

/**
 * App component: Core state owner for the HelpDesk queue.
 * Manages the requests array and selected filter, synchronizes side effects
 * with browser storage and document title, and derives statistics during render.
 */
export default function App() {
  // Theme context consumer
  const { theme } = useContext(ThemeContext);

  // Filter state: "All" | "Waiting" | "Resolved"
  const [filter, setFilter] = useState("All");

  // Storage warning state to inform users if localStorage persistence fails
  const [storageError, setStorageError] = useState(null);

  // Lazy state initialization to read and validate records from browser storage
  const [requests, setRequests] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("helpdesk-requests") ?? "[]"
      );
      if (Array.isArray(saved)) {
        // Validate each stored record schema with isRequest helper
        return saved.filter(isRequest);
      }
      return [];
    } catch {
      return [];
    }
  });

  // Effect 1: Synchronize requests to browser localStorage
  useEffect(() => {
    try {
      localStorage.setItem("helpdesk-requests", JSON.stringify(requests));
      setStorageError(null);
    } catch (err) {
      setStorageError(
        "Browser storage quota exceeded or unavailable. Current changes cannot be persisted."
      );
    }
  }, [requests]);

  // Derived values calculated directly during the render phase (no redundant useEffect)
  const waitingCount = requests.filter((r) => r.status === "Waiting").length;
  const resolvedCount = requests.filter((r) => r.status === "Resolved").length;
  const totalCount = requests.length;

  // Effect 2: Synchronize document title with waitingCount with cleanup restoration
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `HelpDesk — ${waitingCount} waiting`;
    return () => {
      document.title = originalTitle;
    };
  }, [waitingCount]);

  // Immutable Handlers
  const handleAddRequest = ({ studentName, concern, priority }) => {
    const newRequest = {
      id: crypto.randomUUID(),
      studentName,
      concern,
      priority,
      status: "Waiting",
      createdAt: Date.now(),
    };

    // Functional update guaranteeing state freshness without race conditions
    setRequests((previous) => [...previous, newRequest]);
  };

  const handleResolveRequest = (requestId) => {
    // Immutable update using .map()
    setRequests((previous) =>
      previous.map((request) =>
        request.id === requestId
          ? { ...request, status: "Resolved" }
          : request
      )
    );
  };

  const handleDeleteRequest = (requestId) => {
    // Immutable deletion using .filter()
    setRequests((previous) =>
      previous.filter((request) => request.id !== requestId)
    );
  };

  // Derive filtered list and sort immutably (High before Normal; older createdAt FIFO)
  const filteredList = filterRequests(requests, filter);
  const sortedAndFilteredRequests = sortRequests(filteredList);

  return (
    <div className={`app-container theme-${theme}`}>
      <div className="app-shell">
        <Header />

        {storageError && (
          <aside className="storage-alert" role="alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div className="storage-alert-text">
              <strong>Persistence Warning:</strong> {storageError}
            </div>
          </aside>
        )}

        <main className="main-content">
          <div className="layout-columns">
            {/* Left Column: Input Form & Guidance */}
            <div className="column-sidebar">
              <RequestForm onAddRequest={handleAddRequest} />

              <div className="card lab-info-card">
                <h3 className="lab-info-title">Laboratory Session Queue Rules</h3>
                <ul className="lab-rules-list">
                  <li>
                    <span className="rule-bullet">✦</span>
                    <span>
                      <strong>Priority Queue:</strong> High priority questions jump ahead of Normal requests.
                    </span>
                  </li>
                  <li>
                    <span className="rule-bullet">✦</span>
                    <span>
                      <strong>FIFO Order:</strong> Requests of equal priority are served in order of arrival.
                    </span>
                  </li>
                  <li>
                    <span className="rule-bullet">✦</span>
                    <span>
                      <strong>Persistent:</strong> Queue data automatically persists across browser refreshes.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Queue Metrics & Request Cards */}
            <div className="column-main">
              <QueueSummary
                waitingCount={waitingCount}
                resolvedCount={resolvedCount}
                totalCount={totalCount}
                activeFilter={filter}
                onFilterChange={setFilter}
              />

              <RequestList
                requests={sortedAndFilteredRequests}
                onResolve={handleResolveRequest}
                onDelete={handleDeleteRequest}
                activeFilter={filter}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
