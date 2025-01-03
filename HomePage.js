import React from 'react';
import Login from './Login';  // Corrected path

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="welcome-header">
        <h1>Welcome to Communication Tracker</h1>
        <p>
          Track, manage, and schedule all your company communications in one
          centralized platform.
        </p>
      </header>
      <Login />
    </div>
  );
};

export default HomePage;
