import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
}
export default Layout;