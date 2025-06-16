import React from 'react';
import './DataTable.css';

const DataTable = ({ data }) => {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Page</th>
            <th>Views</th>
            <th>Unique Visitors</th>
            <th>Bounce Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.date}>
              <td>{row.date}</td>
              <td>{row.page}</td>
              <td>{row.views.toLocaleString()}</td>
              <td>{row.uniqueVisitors.toLocaleString()}</td>
              <td>{row.bounceRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 