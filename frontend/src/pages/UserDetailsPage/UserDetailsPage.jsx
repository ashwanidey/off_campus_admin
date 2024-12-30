import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { host } from '../../utils/api';
import axios from 'axios';

const userDetailsPage = () => {
  const {id} = useParams();
  const [userDetails, setUser] = useState(null);
   useEffect(() => {
      async function fetchUsers() {
        const response = await axios.get(`${host}/users/get-user/${id}`
        );
        setUser(response.data);
      }
      fetchUsers();
    }, []);
    const [activeTab, setActiveTab] = useState('courses');
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className=" shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={userDetails?.profile_picture}
                alt={userDetails?.username}
                width={96}
                height={96}
                className="rounded-full"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">{userDetails?.username}</h1>
                <p className="text-gray-600">{userDetails?.email}</p>
                <span className={`inline-block px-2 py-1 mt-2 text-xs font-semibold rounded-full ${userDetails?.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {userDetails?.isVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
            </div>
  
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">User ID:</span> {userDetails?.user_id}
              </div>
              <div>
                <span className="font-medium">Google ID:</span> {userDetails?.googleId}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {userDetails?.phone_number || 'Not provided'}
              </div>
            </div>
          </div>
  
          <div className="border-t border-gray-200">
            <div className="flex">
              {(['courses', 'sessions', 'products'] ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === tab ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
  
            <div className="p-6">
              {activeTab === 'courses' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Purchased Courses</h2>
                  {userDetails?.course_purchased.length > 0 ? (
                    <ul className="space-y-2">
                      {userDetails?.course_purchased.map((course) => (
                        <li key={course.course_id} className=" p-3 rounded-md">
                          <span className="font-medium">{course.course_title}</span>
                          <span className="text-sm text-gray-500 ml-2">(ID: {course.course_id})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No courses purchased yet.</p>
                  )}
                </div>
              )}
  
              {activeTab === 'sessions' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Booked Sessions</h2>
                  {userDetails?.session_purchased.length > 0 ? (
                    <ul className="space-y-2">
                      {userDetails?.session_purchased.map((session) => (
                        <li key={session.session_id} className=" p-3 rounded-md">
                          <div>Session ID: {session.session_id}</div>
                          <div className="text-sm text-gray-500">
                            Booked Date: {new Date(session.booked_date).toLocaleString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No sessions booked yet.</p>
                  )}
                </div>
              )}
  
              {activeTab === 'products' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Purchased Products</h2>
                  {userDetails?.product_purchased.length > 0 ? (
                    <ul className="space-y-2">
                      {userDetails?.product_purchased.map((product, index) => (
                        <li key={index} className=" p-3 rounded-md">
                          {product}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No products purchased yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
}

export default userDetailsPage