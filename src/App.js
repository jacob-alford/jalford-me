import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

function App() {
  const handleClick = () => {
    alert("Clicked!");
  }
  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={handleClick}>
        Hello!
      </Button>
    </div>
  );
}

export default App;
