import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import { useQuery, useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import Table from '../styles/table';

const UserShow = () => {
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
    .catch((error) => {
      console.log('Error', error);
    })
  }
  usersQuery?.data?.map((item:any) => console.log(item));
  const userData = [{
    regno : 'A',
    name : 'A',
    grade : 'A',
    section : 'B'
}];  
  return (
    <>
      <Table data = {userList} deleteUser={deleteUser} />
    </>
  );
}

export default UserShow;
