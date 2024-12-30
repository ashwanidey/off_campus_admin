import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { host } from '../../utils/api';

const SessionDetailPage = () => {

  const [sessions,setSession] = useState([]);
  useEffect(() => {
    async function fetchSessions() {
      const response = await axios.get(`${host}/users/get-session`);
     
      setSession(response.data);
    }
    fetchSessions();
  }, []);
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
            <th className="py-3 px-6 text-left">Session ID</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {sessions.map((session) => (
            <tr key={session._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {new Date(session.timestamp).toLocaleString()}
              </td>
              <td className="py-3 px-6 text-left">{session.user_id}</td>
              <td className="py-3 px-6 text-left">{session.email}</td>
              <td className="py-3 px-6 text-left">{session._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default SessionDetailPage