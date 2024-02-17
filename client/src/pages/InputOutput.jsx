import React from 'react';
import SideBar from '../components/SideBar';
import MainContent from '../components/MainContent';
import './InputOutput.css'; // Import CSS file for additional styling

const InputOutput = () => {
  return (
    <div className="container">
      <SideBar className="test" />
      <MainContent className="main-content" />
    </div>
  );
};

export default InputOutput;
