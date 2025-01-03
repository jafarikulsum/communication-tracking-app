import React, { useState } from "react";
import Modal from "react-modal";

const Communicationmodal = ({ isOpen, onClose, onSubmit }) => {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onSubmit({ type, date, notes });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Log Communication</h2>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="LinkedIn Post">LinkedIn Post</option>
          <option value="Email">Email</option>
          <option value="Phone Call">Phone Call</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Notes:
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default Communicationmodal;
