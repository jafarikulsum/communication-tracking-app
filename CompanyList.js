import React from 'react';

function CompanyList({ companies, onEdit, onDelete }) {
  return (
    <table style={{ width: '100%', textAlign: 'left', marginTop: '20px', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>LinkedIn</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.name}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.location}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                {company.linkedin}
              </a>
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.email}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{company.phone}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CompanyList;
