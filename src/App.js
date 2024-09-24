import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import GradeComponent from "./components/GradeComponent";
import NavBar from "./components/NavBar";
import "./assets/styles.css";

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}> {/* Thay 'repository-name' bằng tên repo của bạn */}
      <NavBar /> {/* Bọc NavBar trong Router nếu bạn sử dụng Link */}
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/grade" element={<GradeComponent />} />
      </Routes>
    </Router>
  );
}
