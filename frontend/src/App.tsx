// src/App.tsx
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <div className="flex h-screen">

      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4 overflow-auto bg-gray-50 h-full">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

export default App;
