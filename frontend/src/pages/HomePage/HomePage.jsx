import React from "react";

const HomePage = () => {
  return (
    <div className="text-xl flex flex-col">
      <a href="/users">Users</a>
      <a href="/session">Session</a>
      <a href="/resume-review">Resume Review</a>
      <a href="/webinar">Webinar</a>
      <a href="/chinmay-sessions">Chinmay Session</a>
      <a href="/company-logo">Add Company Logo</a>
      <a href="/job-openings">Add Job Opening</a>
    </div>
  );
};

export default HomePage;
