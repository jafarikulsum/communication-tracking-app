import React, { useState } from "react";

const CommunicationMethodForm = () => {
  const [methods, setMethods] = useState([
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Send a LinkedIn message", sequence: 2, mandatory: true },
    { name: "Email", description: "Send an email", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Make a phone call", sequence: 4, mandatory: true },
    { name: "Other", description: "Other forms of communication", sequence: 5, mandatory: false },
  ]);

  const [method, setMethod] = useState({ name: "", description: "", sequence: "", mandatory: false });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMethod((prevMethod) => ({
      ...prevMethod,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    if (!method.name || !method.description || !method.sequence) {
      alert("Please fill out all fields!");
      return;
    }

    const updatedMethods = [...methods];

    if (editingIndex !== null) {
      // Update existing method
      updatedMethods[editingIndex] = method;
    } else {
      // Add new method
      updatedMethods.push({ ...method, sequence: Number(method.sequence) });
    }

    setMethods(updatedMethods);
    resetForm();
  };

  const handleEdit = (index) => {
    setMethod(methods[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setMethods(methods.filter((_, i) => i !== index));
    resetForm();
  };

  const resetForm = () => {
    setMethod({ name: "", description: "", sequence: "", mandatory: false });
    setEditingIndex(null);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        style={{ marginBottom: "20px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={method.name}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={method.description}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="sequence"
          placeholder="Sequence"
          value={method.sequence}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <label style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            name="mandatory"
            checked={method.mandatory}
            onChange={handleInputChange}
            style={{ marginRight: "5px" }}
          />
          Mandatory
        </label>
        <button type="submit">{editingIndex !== null ? "Update" : "Add"}</button>
      </form>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sequence</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mandatory</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((m, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{m.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{m.description}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{m.sequence}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{m.mandatory ? "Yes" : "No"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button onClick={() => handleEdit(index)} style={{ marginRight: "5px" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommunicationMethodForm;
