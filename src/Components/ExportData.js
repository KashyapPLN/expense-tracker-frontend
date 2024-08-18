import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { saveAs } from 'file-saver';

const ExportData = ({ expenses }) => {
  
  const convertToCSV = (data) => {
    const header = 'Date,Category,Description,Amount\n';
    const rows = data.map(expense => (
      `${expense.date},${expense.category},${expense.description},${expense.amount}`
    ));
    return header + rows.join('\n');
  };

  const handleExport = () => {
    if (expenses.length === 0) {
      alert('No data to export');
      return;
    }

    const csvData = convertToCSV(expenses);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'expenses.csv');
  };

  return (
    <Container className="mt-4">
        {expenses.length > 0 ? (
        <Button variant="primary" onClick={handleExport}>
          Export as CSV
        </Button>
      ) : (
        <Alert variant="warning">No expenses available to export.</Alert>
      )}
    </Container>
  );
};

export default ExportData;
