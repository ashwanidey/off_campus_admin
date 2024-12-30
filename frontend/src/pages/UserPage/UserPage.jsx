import React, { useEffect } from 'react'
import { host } from '../../utils/api';
import UserTable from '../../components/UserTable';

const UserPage = () => {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`${host}/users/get-users`);
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);
  return (
    <div>
      <UserTable users={users} />
    </div>
  )
}

export default UserPage