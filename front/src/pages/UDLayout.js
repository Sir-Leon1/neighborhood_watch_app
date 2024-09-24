import React from 'react';
import UserSidebar from "../components/Sidebar/UserSidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <UserSidebar />
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
}
export default Layout;