import * as React from 'react';
import {useState} from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { type } from 'os';

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: grey;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;

const InputContainer = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
width: 500px;
`;
const InputFooter = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`;

const ButtonSubmit = styled.button`
padding: 10px;
`;
interface IUser {
    regno: string,
    name: string,
    grade: string,
    section: string,
}
type IErrors =  {
    regno: string,
    name: string,
    grade: string,
    section: string,
}

export default function CreateStudent() {

    const [user, setUser] = useState<IUser>({
        regno: '1',
        name: 'Jems Hope',
        grade: 'A+',
        section: 'T-Down',
    });

    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            axios.post(
                `http://localhost:5000/students`,
                user
            )
        },
        enabled: false
    })
    
    const createUser = () => {
        console.log(user);
        const localBaseUrl = 'http://localhost:5000/';
        axios.post(localBaseUrl + 'students', user);
    }
    return (
        <div>
        <h1>Anywhere in your app!</h1>
        <Formik
          initialValues={user}
          validate={values => {
            const errors = {} as IErrors;
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.grade) {
             errors.grade = 'Required';
            }
            if (!values.section) {
             errors.section = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
            <InputContainer>
            <Input
                type="number"
                name="regno"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.regno}
              />
              {errors.regno && touched.regno && errors.regno}
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
              <Input
                type="text"
                name="grade"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.grade}
              />
              {errors.grade && touched.grade && errors.grade}
              <Input
                type="text"
                name="section"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.section}
              />
            </InputContainer>
            {errors.section && touched.section && errors.section}
            <InputFooter>
            <ButtonSubmit type="submit" disabled={isSubmitting}>Submit</ButtonSubmit>
            </InputFooter>
            </form>
          )}
        </Formik>
      </div>
    );
}
