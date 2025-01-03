export const calculateNextScheduledCommunication = (lastCommunicationDate, periodicity) => {
  const date = new Date(lastCommunicationDate);

  if (periodicity === 'weekly') {
    date.setDate(date.getDate() + 7);
  } else if (periodicity === 'bi-weekly') {
    date.setDate(date.getDate() + 14);
  } else if (periodicity === 'monthly') {
    date.setMonth(date.getMonth() + 1);
  }

  return date.toISOString().split('T')[0]; // Return in 'yyyy-mm-dd' format
};

export const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Determines the highlight color based on the next communication date.
 * @param {string} nextCommunicationDate - The date of the next communication (YYYY-MM-DD).
 * @param {boolean} disableHighlight - Whether the highlight is disabled.
 * @returns {string} - The highlight color ('red', 'yellow', or 'transparent').
 */
export const getHighlightColor = (nextCommunicationDate, disableHighlight = false) => {
  if (disableHighlight) return 'transparent';

  const today = new Date();
  const communicationDate = new Date(nextCommunicationDate);

  // Normalize the time portion to ensure accurate comparisons
  today.setHours(0, 0, 0, 0);
  communicationDate.setHours(0, 0, 0, 0);

  if (communicationDate < today) {
    return 'red'; // Overdue
  } else if (communicationDate.getTime() === today.getTime()) {
    return 'yellow'; // Due today
  }
  return 'transparent'; // No highlight
};
