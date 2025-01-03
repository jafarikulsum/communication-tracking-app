// src/components/CompanyRow.js
import React, { useState } from "react";
import { getHighlightColor } from "../utils/dateUtils";

const CompanyRow = ({ company, onDisableHighlight }) => {
  const [isHighlightDisabled, setIsHighlightDisabled] = useState(false);

  const handleDisableHighlight = () => {
    setIsHighlightDisabled(true);
    onDisableHighlight(company.id); // Pass the company ID or identifier
  };

  const highlightColor = isHighlightDisabled
    ? "transparent"
    : getHighlightColor(company.nextCommunicationDate);

  return (
    <tr style={{ backgroundColor: highlightColor }}>
      <td>{company.name}</td>
      <td>{company.lastFiveCommunications}</td>
      <td>{company.nextCommunicationType} on {company.nextCommunicationDate}</td>
      <td>
        <button onClick={handleDisableHighlight}>
          Disable Highlight
        </button>
      </td>
    </tr>
  );
};

export default CompanyRow;
