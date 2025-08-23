import React from "react";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="text-xl flex flex-col">
      <div className="text-xl flex flex-col gap-2">
        <a href="/users">Users</a>
        <a href="/session">Session</a>
        <a href="/resume-review">Resume Review</a>
        <a href="/webinar">Webinar</a>
        <a href="/chinmay-sessions">Chinmay Session</a>

        <a href="/company-logo">Add Company Logo</a>
        <a href="/job-openings">Add Job Opening</a>
        <a href="/add-user-into-course"> Add Course Into User</a>
        <a href="/success-story-testimonial">Success Story Adder</a>
      </div>

      <button
        onClick={handleLogout}
        className="bg-blue-600 hover:bg-blue-400 text-white text-sm font-normal py-2 px-4 rounded-lg shadow-md transition duration-300 mt-8"
      >
        Log Out
      </button>
    </div>
  );
};

export default HomePage;
