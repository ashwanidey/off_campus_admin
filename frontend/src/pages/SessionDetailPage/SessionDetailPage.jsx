

import axios from "axios";
import React, { useEffect, useState } from "react";
import { host } from "../../utils/api";

const SessionDetailPage = () => {
  const [sessions, setSession] = useState([]);
  const [openModalId, setOpenModalId] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const [loadingEmails, setLoadingEmails] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      const response = await axios.get(`${host}/users/get-session`);
      setSession(response.data);
    }
    fetchSessions();
  }, []);

  console.log("sessions", sessions);

  // Handler to open confirmation modal
  const handleSendTestimonialEmail = (id) => {
    setOpenModalId(id);
  };

  // Handler for confirming email send
  const handleConfirmEmail = async (id, email, name, timestamp) => {
    // Add the ID to loading emails to show loading state
    setLoadingEmails((prev) => [...prev, id]);

    try {
      const response = await axios.post(
        `${host}/users/send-testimonial-email`,
        {
          sessionId: id,
          email: email,
          name: name,
          date: timestamp,
        }
      );

      if (response.data.success) {
        // Add to sent emails
        setSentEmails((prev) => [...prev, id]);

        // Close the modal
        setOpenModalId(null);

        // Optional: show success notification
        console.log("Testimonial email sent successfully!");
      }
    } catch (error) {
      console.error("Error sending testimonial email:", error);
      // Optional: show error notification
    } finally {
      // Remove from loading emails
      setLoadingEmails((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Sessions</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Timestamp</th>
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Testimonial Email</th>
            </tr>
          </thead>
          <tbody className={`text-black font-bold text-sm`}>
            {sessions.map((session) => (
              <React.Fragment key={session._id}>
                <tr
                  className={`border-b border-gray-200 hover:bg-gray-100 ${
                    session.item_id === 102 ? "bg-green-200" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {new Date(session.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <a href={`/details/${session.user_id}`}>
                      {session.user_id}
                    </a>
                  </td>
                  <td className="py-3 px-6 text-left">{session.email}</td>
                  <td className="py-3 px-6 text-left">{session.title}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => handleSendTestimonialEmail(session._id)}
                      disabled={
                        sentEmails.includes(session._id) ||
                        loadingEmails.includes(session._id)
                      }
                      className={`
                        px-3 py-1 rounded transition-colors
                        ${
                          sentEmails.includes(session._id)
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : loadingEmails.includes(session._id)
                            ? "bg-yellow-300 text-yellow-800 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }
                      `}
                    >
                      {sentEmails.includes(session._id) && session.testimonial_sent 
                        ? "Email Sent"
                        : loadingEmails.includes(session._id)
                        ? "Sending..."
                        : "Send Email"}
                    </button>
                  </td>
                </tr>

                {/* Custom Modal */}
                {openModalId === session._id && (
                  <tr>
                    <td colSpan="5">
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                          <h2 className="text-xl font-bold mb-4">
                            Send Testimonial Email
                          </h2>
                          <p className="mb-4">
                            Are you sure you want to send a testimonial email to{" "}
                            {session.email}?
                          </p>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setOpenModalId(null)}
                              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() =>
                                handleConfirmEmail(
                                  session.session_id,
                                  session.email,
                                  session.name,
                                  session.timestamp
                                )
                              }
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                              disabled={loadingEmails.includes(session._id)}
                            >
                              {loadingEmails.includes(session._id)
                                ? "Sending..."
                                : "Yes, Send"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionDetailPage;
