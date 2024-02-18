import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

function InputOutput() {
  let data = true;   //get response from backend

  const [tables, setTables] = useState([]);
  const [queryResult, setQueryResult] = useState(null); // State to store the query result

  const addTable = () => {
    setTables([...tables, { name: '', attributes: [] }]);
  };

  const addAttribute = (tableIndex) => {
    const newTables = [...tables];
    newTables[tableIndex].attributes.push({ name: '', keyType: '', dataType: '', referenceTable: '' });
    setTables(newTables);
  };

  const handleTableNameChange = (event, tableIndex) => {
    const newTables = [...tables];
    newTables[tableIndex].name = event.target.value;
    setTables(newTables);
  };

  const handleAttributeChange = (event, tableIndex, attributeIndex, attributeKey) => {
    const newTables = [...tables];
    newTables[tableIndex].attributes[attributeIndex][attributeKey] = event.target.value;
    setTables(newTables);
  };

  const generateTestInput = async () => {
    const testData = {
      tables: tables.map(table => ({
        name: table.name,
        attributes: table.attributes.map(attribute => ({
          name: attribute.name,
          keyType: attribute.keyType,
          dataType: attribute.dataType,
          referenceTable: attribute.referenceTable
        }))
      }))
    };

    // Send the data to the backend
    try {
      const response = await axios.post('https://b75d-14-139-125-227.ngrok-free.app/api/querygenerate/', { schema: JSON.stringify(testData), language: 'javascript', prompt: 'retrieve records of student name of computer department having marks greater than 100' }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setQueryResult(response.data.response[0]); 
        console.log('Test input generated and sent successfully!');
      } else {
        console.error('Failed to generate and send test input.');
      }
    } catch (error) {
      console.error('Error occurred while sending test input:', error);
    }
  };

  return (
    <div className='test-container'>
      <div className="left-container">
        <Button variant="contained" onClick={addTable}>Add Table</Button>
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className="table-container">
            <TextField
              type="text"
              placeholder="Table Name"
              value={table.name}
              onChange={(e) => handleTableNameChange(e, tableIndex)}
            />
            <Button variant="contained" onClick={() => addAttribute(tableIndex)}>Add Attribute</Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ minWidth: '200px' }}>Attr.Name</TableCell>
                    <TableCell>Key</TableCell>
                    <TableCell>Data Type</TableCell>
                    <TableCell>Ref Table</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.attributes.map((attribute, attributeIndex) => (
                    <TableRow key={attributeIndex}>
                      <TableCell>
                        <TextField
                          type="text"
                          placeholder="Name"
                          value={attribute.name}
                          onChange={(e) => handleAttributeChange(e, tableIndex, attributeIndex, 'name')}
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <Select
                            value={attribute.keyType}
                            onChange={(e) => handleAttributeChange(e, tableIndex, attributeIndex, 'keyType')}>
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="primary">PK</MenuItem>
                            <MenuItem value="foreign">FK</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <Select
                            value={attribute.dataType}
                            onChange={(e) => handleAttributeChange(e, tableIndex, attributeIndex, 'dataType')}>
                            <MenuItem value="">-- Select --</MenuItem>
                            <MenuItem value="number">Number</MenuItem>
                            <MenuItem value="string">String</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      {attribute.keyType === 'foreign' && (
                        <TableCell>
                          <FormControl>
                            <Select
                              value={attribute.referenceTable}
                              onChange={(e) => handleAttributeChange(e, tableIndex, attributeIndex, 'referenceTable')}>
                              <MenuItem value="">-- Select --</MenuItem>
                              {tables.slice(0, tableIndex).map((prevTable, idx) => (
                                <MenuItem key={idx} value={prevTable.name}>{prevTable.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
      <div className="app">
            <header className="header">
                <h1>Query Generator</h1>
            </header>
            <main className="main-content">
            <h2>How can I help you today?</h2>
            <div className="card-container">
                <div className="card brainstorm">
                <h3>Brainstorm content ideas</h3>
                <p>
                    Generate content ideas for various media, including blog posts, articles, social media captions, email newsletters, and more.
                </p>
                </div>
                <div className="card write-email">
                <h3>Write an email</h3>
                <p>
                    Craft compelling emails for different purposes, such as requesting a quote, pitching a product, or following up with a lead.
                </p>
                </div>
                <div className="card explain-concept">
                <h3>Explain a concept</h3>
                <p>
                    Break down complex topics into easy-to-understand explanations, suitable for both adults and children.
                </p>
                </div>
                <div className="card more-options">
                <h3>More options</h3>
                <p>
                    Explore Codex's other capabilities, including writing different kinds of creative content, translating languages, and answering your questions in an informative way.
                </p>
                </div>
            </div>
            <OutputQuery />
            <div className="chat-container">
                <h2>Ask your Code here: </h2>
                <input type="text" className="chat-input" placeholder="Coming soon!" />
                <button className="chat-button" disabled>
                Send
                </button>
            </div>
            </main>
        </div>
    </div>
  );
}

export default InputOutput;
