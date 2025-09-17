import React from 'react';
import ServiceCatalogue from './components/ServiceCatalogue';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>AutoCare Service Management</h1>
        <p>Professional automotive services at your fingertips</p>
      </header>
      <main className="app-main">
        <ServiceCatalogue />
      </main>
    </div>
  );
}

export default App;