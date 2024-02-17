import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Test.css'; // Import CSS file for additional styling
// import axios from 'axios'
function SideBar() {
  const [tables, setTables] = useState([]);

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

  const generateTestInput = async() => {
    // Prepare the data to be sent to the backend
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
    console.log(testData)
    // Send the data to the backend
    // try {
    //     const response = await axios.post('your-backend-url', testData, {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });
    
    //     if (response.status === 200) {
    //       console.log('Test input generated and sent successfully!');
    //       // Handle success response from the backend
    //     } else {
    //       console.error('Failed to generate and send test input.');
    //       // Handle error response from the backend
    //     }
    //   } catch (error) {
    //     console.error('Error occurred while sending test input:', error);
    //     // Handle fetch error
    //   }
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
              <Table background-color="background-color: antiquewhite">
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
      <div className="right-container">
        <div className="button-container">
          <Button variant="contained" onClick={generateTestInput}>Generate Test Input</Button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
