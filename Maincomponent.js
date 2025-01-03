import React, { useState } from "react";
import Communicationmodal from "./Communicationmodal";
import ReactTooltip from 'react-tooltip';

const Maincomponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [communications, setCommunications] = useState([]);

  const handleLogCommunication = (newCommunication) => {
    setCommunications([...communications, newCommunication]);
  };

  return (
    <div>
      <button 
        data-tip="Click to log communication" 
        onClick={() => setIsModalOpen(true)}
      >
        Log Communication
      </button>
      
      {/* Tooltips will appear on hover */}
      <ReactTooltip />
      
      <Communicationmodal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleLogCommunication}
      />
    </div>
  );
};

export default Maincomponent;
