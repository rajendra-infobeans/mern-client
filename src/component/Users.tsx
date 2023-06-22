import React from "react";
import styled from "styled-components";
import ShowStudent from './showStudent/showStudent';
import CreateStudent from "./createUser/createUser";

const UserContainer = styled.div`
display: flex;
flex-direction: row;
gap: 14px;
margin: 20px;
`;



const Users = () => {  
    return (
        <>
        <UserContainer>
            <ShowStudent />
            <CreateStudent />
        </UserContainer>
        </>
    )
}

export default Users;