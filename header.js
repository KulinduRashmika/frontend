import React from 'react';

// Header component for the application
function Header() {
  return (
    <header className="w-full bg-blue-700 text-white p-4 shadow-lg rounded-b-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide">
          <span role="img" aria-label="Books" className="mr-2">📚</span>
          Library Hub
        </h1>
        {/* You can add user profile, notifications, or other header elements here */}
      </div>
    </header>
  );
}

export default Header;
