import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Role Admin/Dashboard";
import Card from "./components/Pages/Card";
import HomePage from "./components/Pages/HomePage";
import BeritaDetail from "./components/Pages/BeritaDetail";
import ProtectedRoute from "./components/Pages/MiddleWare";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/berita/:id" element={<BeritaDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
