import React, { useState } from 'react';
import CommunicationMethodForm from './CommunicationMethodForm';
import CompanyForm from './CompanyForm';
import CompanyList from './CompanyList';
import Dashboard from './Dashboard';
import CommunicationLogForm from './CommunicationLogForm';

function App() {
  const [companies, setCompanies] = useState([]);
  const [editingCompanyIndex, setEditingCompanyIndex] = useState(null);

  const addCompany = (newCompany) => {
    setCompanies([...companies, { ...newCompany, communications: [] }]);
  };

  const updateCompany = (updatedCompany) => {
    const updatedCompanies = [...companies];
    updatedCompanies[editingCompanyIndex] = {
      ...updatedCompany,
      communications: companies[editingCompanyIndex].communications,
    };
    setCompanies(updatedCompanies);
    resetEditing();
  };

  const handleEditCompany = (index) => {
    setEditingCompanyIndex(index);
  };

  const handleDeleteCompany = (index) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const resetEditing = () => {
    setEditingCompanyIndex(null);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Communication Tracking App</h1>
      <h2>Manage Communication Methods</h2>
      <CommunicationMethodForm />
      <CompanyForm
        addCompany={addCompany}
        updateCompany={updateCompany}
        editingCompanyIndex={editingCompanyIndex}
        editingCompany={editingCompanyIndex !== null ? companies[editingCompanyIndex] : null}
        resetEditing={resetEditing}
      />
      <h2>Company List</h2>
      <CompanyList
        companies={companies}
        onEdit={handleEditCompany}
        onDelete={handleDeleteCompany}
      />
      <h2>Dashboard</h2>
      <Dashboard companies={companies} />
      <h2>Log Communication</h2>
      <CommunicationLogForm
        companies={companies}
        onLogCommunication={(companyName, communication) => {
          setCompanies((prevCompanies) =>
            prevCompanies.map((company) =>
              company.name === companyName
                ? {
                    ...company,
                    communications: [
                      communication,
                      ...company.communications.slice(0, 4),
                    ],
                  }
                : company
            )
          );
        }}
      />
    </div>
  );
}

export default App;
