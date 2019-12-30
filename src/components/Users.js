import React from 'react'

const Users = () => {
    <div>
    <h2>Users</h2>
    <ul>
      {users.map(user =>
        <li key={user.id} >
          <Link to={`users/${user.id}`}>{user.name}</Link>
        </li>)}
    </ul>
  </div>
}
export default Users