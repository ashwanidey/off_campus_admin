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

import LogoAdder from "./pages/CompanyLogoUploader/LogoAdder";
import JobDescription from "./pages/JobDescription/JobDescription";
import LoginPage from "./pages/LoginPage/LoginPage";
import AddSlot from "./pages/AddSlot/AddSlot";
import ProtectedRoutes from "./components/ProtectedRoutes";


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
        <Route path="/company-logo" element={<LogoAdder />} />
        <Route path="/job-openings" element={<JobDescription />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        } />
        <Route path="/users" element={
          <ProtectedRoutes>
            <UserPage />
          </ProtectedRoutes>
        } />
        <Route path="/details/:id" element={
          <ProtectedRoutes>
            <UserDetailsPage />
          </ProtectedRoutes>
        } />
        <Route path="/session" element={
          <ProtectedRoutes>
            <SessionDetailPage />
          </ProtectedRoutes>
        } />
        <Route path="/resume-review" element={
          <ProtectedRoutes>
            <ResumeReviewPage />
          </ProtectedRoutes>
        } />
        <Route path="/webinar" element={
          <ProtectedRoutes>
            <WebinarPage />
          </ProtectedRoutes>
        } />
        <Route path="/chinmay-sessions" element={
          <ProtectedRoutes>
            <ChinmaySessionPage />
          </ProtectedRoutes>
        } />
        <Route path="/add-slot" element={
          <ProtectedRoutes>
            <AddSlot />
          </ProtectedRoutes>
        } />
      </Routes>
    </>
  );
}

export default App;
