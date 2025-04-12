import { useState } from "react";
import "./App.css";
import UserPage from "./pages/UserPage/UserPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import UserDetailsPage from "./pages/UserDetailsPage/UserDetailsPage";
import SessionDetailPage from "./pages/SessionDetailPage/SessionDetailPage";
import ResumeReviewPage from "./pages/ResumeReviewPage/ResumeReviewPage";
import WebinarPage from "./pages/WebinarPage/WebinarPage";
import ChinmaySessionPage from "./pages/ChinmaySessionPage/ChinmaySessionPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/users" element={<UserPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<UserDetailsPage />} />
        <Route path="/session" element={<SessionDetailPage />} />
        <Route path="/resume-review" element={<ResumeReviewPage />} />
        <Route path="/webinar" element={<WebinarPage />} />
        <Route path="/chinmay-sessions" element={<ChinmaySessionPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
