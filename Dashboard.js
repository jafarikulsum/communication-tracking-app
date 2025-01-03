import React, { useState } from 'react';
import { calculateNextScheduledCommunication, formatDate, getHighlightColor } from './dateUtils';

function Dashboard({ companies }) {
  const [disabledHighlights, setDisabledHighlights] = useState({}); // Tracks disabled highlights
  const [hoveredNote, setHoveredNote] = useState(null); // Tracks the note to display on hover

  const toggleHighlight = (companyName) => {
    setDisabledHighlights((prev) => ({
      ...prev,
      [companyName]: !prev[companyName],
    }));
  };

  const getDefaultFollowUpNote = (highlightColor) => {
    switch (highlightColor) {
      case 'red':
        return 'Overdue! Follow up immediately.';
      case 'yellow':
        return 'Upcoming soon. Prepare communication.';
      case 'green':
        return 'On track. No immediate action needed.';
      default:
        return 'No follow-up required.';
    }
  };

  return (
    <div>
      <table
        style={{
          width: '100%',
          textAlign: 'left',
          marginTop: '20px',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Last Five Communications</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Next Scheduled Communication</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Follow-Up Notes</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => {
            const latestCommunication = company.communications[0];
            const nextScheduledCommunication = latestCommunication
              ? calculateNextScheduledCommunication(
                  latestCommunication.date,
                  company.communicationPeriodicity
                )
              : 'N/A';

            const disableHighlight = disabledHighlights[company.name] || false;
            const highlightColor =
              nextScheduledCommunication !== 'N/A'
                ? getHighlightColor(nextScheduledCommunication, disableHighlight)
                : 'transparent';

            const defaultFollowUpNote = getDefaultFollowUpNote(highlightColor);

            return (
              <tr
                key={index}
                style={{
                  backgroundColor: highlightColor,
                  border: '1px solid #ddd',
                }}
              >
                <td style={{ padding: '8px' }}>{company.name}</td>
                <td style={{ padding: '8px', position: 'relative' }}>
                  {company.communications.length > 0
                    ? company.communications.slice(0, 5).map((comm, i) => (
                        <div
                          key={i}
                          onMouseEnter={() => setHoveredNote(comm.notes || 'No Notes')}
                          onMouseLeave={() => setHoveredNote(null)}
                          style={{ display: 'inline-block', position: 'relative', margin: '5px' }}
                        >
                          {comm.type} on {formatDate(comm.date)}
                          {hoveredNote && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '-40px',
                                left: '0',
                                backgroundColor: 'black',
                                color: 'white',
                                padding: '5px',
                                borderRadius: '3px',
                                fontSize: '12px',
                                whiteSpace: 'nowrap',
                                zIndex: 1000,
                              }}
                            >
                              {hoveredNote}
                            </div>
                          )}
                        </div>
                      ))
                    : 'No Communications Yet'}
                </td>
                <td style={{ padding: '8px' }}>
                  {nextScheduledCommunication !== 'N/A'
                    ? formatDate(nextScheduledCommunication)
                    : 'N/A'}
                </td>
                <td style={{ padding: '8px' }}>
                  <ul>
                    <li>{defaultFollowUpNote}</li>
                  </ul>
                </td>
                <td style={{ padding: '8px' }}>
                  <button onClick={() => toggleHighlight(company.name)}>
                    {disableHighlight ? 'Enable Highlight' : 'Disable Highlight'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

