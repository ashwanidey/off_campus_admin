import React from 'react'

const UserTable = ({users}) => {

  return (
    <div className="overflow-x-auto bg-gray-900 rounded-lg shadow">
    <table className="w-full text-sm text-left text-gray-300">
      <thead className="text-xs uppercase bg-gray-800 text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Email</th>
          <th scope="col" className="px-6 py-3">Mobile Number</th>
          <th scope="col" className="px-6 py-3">View Details</th>
          <th scope="col" className="px-6 py-3">Course Purchased</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
            <td className="px-6 py-4 font-medium whitespace-nowrap">{user.username}</td>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">{user.phone_number}</td>
            <td className="px-6 py-4">
              <a href={`/details/${user.user_id}`}>View Details</a>
            </td>
            <td className="px-6 py-4">{user.course_purchased.length > 0 ? "✅" : "❌"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default UserTable