import React, { useState } from 'react';

const CommunicationLogForm = ({ companies, onLogCommunication }) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [communication, setCommunication] = useState({
    type: "",
    date: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommunication((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCompany || !communication.type || !communication.date) {
      alert("Please fill out all fields!");
      return;
    }

    onLogCommunication(selectedCompany, communication);
    setSelectedCompany("");
    setCommunication({ type: "", date: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="">Select Company</option>
        {companies.map((c, index) => (
          <option key={index} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="type"
        placeholder="Type of Communication"
        value={communication.type}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="date"
        value={communication.date}
        onChange={handleInputChange}
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={communication.notes}
        onChange={handleInputChange}
      />
      <button type="submit">Log</button>
    </form>
  );
};

export default CommunicationLogForm;
