import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Component({ users }) {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   try {
  //     const { data } = await axios.get(`http://localhost:8000/api/getAllUsers`);
  //     setUsers(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // console.log('user', users);

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
        </tr>
        {users?.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`http://localhost:8000/api/getAllUsers`);
  console.log('data', data);
  return {
    props: {
      users: data,
    },
  };
}
