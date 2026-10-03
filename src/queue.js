/**
 * Queue data structures, validation, sorting, and filtering helpers
 * for HelpDesk Student Assistance Queue.
 */

/**
 * Validates whether an unknown object conforms to the Request schema:
 * {
 *   id: string,
 *   studentName: string,
 *   concern: string,
 *   priority: "High" | "Normal",
 *   status: "Waiting" | "Resolved",
 *   createdAt: number
 * }
 *
 * @param {unknown} item - Item to inspect
 * @returns {boolean} True if the item matches the Request schema
 */
export function isRequest(item) {
  if (!item || typeof item !== "object") {
    return false;
  }

  const { id, studentName, concern, priority, status, createdAt } = item;

  const hasValidId = typeof id === "string" && id.trim().length > 0;
  const hasValidName = typeof studentName === "string" && studentName.trim().length > 0;
  const hasValidConcern = typeof concern === "string" && concern.trim().length > 0;
  const hasValidPriority = priority === "High" || priority === "Normal";
  const hasValidStatus = status === "Waiting" || status === "Resolved";
  const hasValidTimestamp = typeof createdAt === "number" && Number.isFinite(createdAt) && createdAt > 0;

  return (
    hasValidId &&
    hasValidName &&
    hasValidConcern &&
    hasValidPriority &&
    hasValidStatus &&
    hasValidTimestamp
  );
}

/**
 * Sorts requests immutably:
 * 1. "High" priority before "Normal" priority
 * 2. First-In, First-Out (FIFO) chronological ordering by createdAt (older requests first)
 *
 * @param {Array} requests - Array of request objects
 * @returns {Array} New sorted array copy
 */
export function sortRequests(requests) {
  return [...requests].sort((a, b) => {
    // High priority precedes Normal priority
    if (a.priority === "High" && b.priority === "Normal") return -1;
    if (a.priority === "Normal" && b.priority === "High") return 1;

    // Within same priority: chronological FIFO (smaller timestamp = older = first)
    return a.createdAt - b.createdAt;
  });
}

/**
 * Filters requests by status: "All", "Waiting", or "Resolved"
 *
 * @param {Array} requests - Array of request objects
 * @param {string} filter - "All" | "Waiting" | "Resolved"
 * @returns {Array} Filtered requests
 */
export function filterRequests(requests, filter) {
  if (filter === "Waiting") {
    return requests.filter(req => req.status === "Waiting");
  }
  if (filter === "Resolved") {
    return requests.filter(req => req.status === "Resolved");
  }
  return requests;
}
