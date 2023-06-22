import React from "react";
import { Interface } from "readline";
import styled from "styled-components";

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: top;
  }              */
  td,
  th {
    border: none;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

const TableContainer = styled.div`
display: flex;
border: 1px solid grey;
`;

interface ITitle  {
  regno: string,
  name: string,
  grade: string,
  section: string
}

export default ({ data, deleteUser }:any) => {
  console.log('data', data)
  return (
    <TableContainer>
      <TableMarkup titles={Object.keys(data[0] || {})}  data={data} deleteUser={deleteUser} />
    </TableContainer>
    
  )
 
};

const TableMarkup = ({ titles, data, deleteUser }:{titles:any, data:any, deleteUser:any}) => (
  <StyledTable>
    <caption>Culture about contries</caption>
    <colgroup>
      <col />
      <col />
      <col />
    </colgroup>
    <thead>
      <tr>
        {titles.map((title:any, index:any) => (
          <th key={index}>{title}</th>
        ))}
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item:any, index:number) => (
        <tr key={index}>
          {titles.map((title:any, index:number) => (
            <td key={index}>{item[title]}</td>
          ))}
          <td onClick={() => deleteUser(item['_id'])}>{'Delete'}</td>
        </tr>
      ))}
    </tbody>
  </StyledTable>
);
