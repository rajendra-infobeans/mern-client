import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import { useQuery, useMutation } from '@tanstack/react-query';

export default function UserShow() {
  const localBaseUrl = 'http://localhost:5000/';
  const [userList, setUserList] = useState<any[] | null>([]);

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get(localBaseUrl + 'students')
          .then((response) => response.data), 
  })
  console.log('Testing');
  if (usersQuery.data) console.log('Users data', usersQuery.data);
  if (usersQuery.isLoading) console.log('Loading data');
  if (usersQuery.isError) console.log('Users data error', JSON.stringify(usersQuery.error));

  useEffect(()=> {
    const allusers = axios.get(localBaseUrl + 'students')
    .then((response) => {
      setUserList(response.data);
      console.log(response);
    })
    
  },[]);
  const deleteUser = (user_id: Number) => {
    console.log(user_id);
    axios.delete(localBaseUrl + 'students/' + user_id)
    .then((response) => {
      console.log(response.data, 'User delete successfully');
    })
  }
  usersQuery?.data?.map((item:any) => console.log(item));
  return (
    <>
    <h3>All users</h3>
      <table aria-label="simple table">
        <thead>
          <tr>
            <th>Reg No.</th>
            <th align="right">Name</th>
            <th align="right">grade</th>
            <th align="right">Section</th>
            <th align="right">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {usersQuery?.data?.map((item:any) => {
            <tr>
              <td>{item.regno}</td>
              <td>{item.regno}</td>
              <td>{item.regno}</td>
              <td>{item.regno}</td>
            </tr>
          })} */}
        </tbody>
      </table>
    </>
  );
}
