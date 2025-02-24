import React, { useEffect, useState } from 'react'
import { host } from '../../utils/api';
import axios from 'axios';

const WebinarPage = () => {
    const [sessions,setSession] = useState([]);
  useEffect(() => {
    async function fetchSessions() {
      const response = await axios.get(`${host}/users/get-webinars`);
     
      setSession(response.data);
    }
    fetchSessions();
  }, []);
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Review</h1>
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Mobile</th>
            <th className="py-3 px-6 text-left">Email</th>
            
          </tr>
        </thead>
        <tbody className={`text-black font-bold text-sm `}>
          {sessions.map((session) => (
            <tr key={session.service_id}>
              
              <td className="py-3 px-6 text-left">{session.name}</td>
              <td className="py-3 px-6 text-left">{session.phone_number}</td>
              <td className="py-3 px-6 text-left">{session.email}</td>
             
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default WebinarPage;