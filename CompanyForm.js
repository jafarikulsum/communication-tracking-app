import React, { useState, useEffect } from 'react';

function CompanyForm({ addCompany, updateCompany, editingCompanyIndex, editingCompany, resetEditing }) {
  const [company, setCompany] = useState({
    name: '',
    location: '',
    linkedin: '',
    email: '',
    phone: '',
    comments: '',
    communicationPeriodicity: '',
  });

  useEffect(() => {
    if (editingCompany) {
      setCompany(editingCompany);
    } else {
      setCompany({
        name: '',
        location: '',
        linkedin: '',
        email: '',
        phone: '',
        comments: '',
        communicationPeriodicity: '',
      });
    }
  }, [editingCompany]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.name.trim()) return;

    if (editingCompanyIndex !== null) {
      updateCompany(company);
    } else {
      addCompany(company);
    }

    resetEditing();
    setCompany({ // Clear the form fields after submission
      name: '',
      location: '',
      linkedin: '',
      email: '',
      phone: '',
      comments: '',
      communicationPeriodicity: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingCompanyIndex !== null ? 'Edit Company' : 'Add Company'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={company.name}
        onChange={(e) => setCompany({ ...company, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={company.location}
        onChange={(e) => setCompany({ ...company, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="LinkedIn URL"
        value={company.linkedin}
        onChange={(e) => setCompany({ ...company, linkedin: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={company.email}
        onChange={(e) => setCompany({ ...company, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={company.phone}
        onChange={(e) => setCompany({ ...company, phone: e.target.value })}
      />
      <textarea
        placeholder="Comments"
        value={company.comments}
        onChange={(e) => setCompany({ ...company, comments: e.target.value })}
      />
      <select
        value={company.communicationPeriodicity}
        onChange={(e) =>
          setCompany({ ...company, communicationPeriodicity: e.target.value })
        }
        required
      >
        <option value="" disabled>
          Select Periodicity
        </option>
        <option value="weekly">Weekly</option>
        <option value="bi-weekly">Bi-Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit">{editingCompanyIndex !== null ? 'Update Company' : 'Add Company'}</button>
    </form>
  );
}

export default CompanyForm;
