import React from "react";
import ReactTooltip from "react-tooltip";

const Communicationtable = ({ communications }) => (
  <table>
    <thead>
      <tr>
        <th>Company Name</th>
        <th>Communication Type</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {communications.map((comm, index) => (
        <tr key={index}>
          <td>{comm.companyName}</td>
          <td>{comm.type}</td>
          <td>
            <span data-tip={comm.notes}>{comm.date}</span>
            <ReactTooltip place="top" type="dark" effect="float" />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Communicationtable;
