import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import UserService from './services/user.service';

const BoardUser = () => {
  const [content, setContent] = useState([]);
  const [columns, setColumns] = useState([ /* Columns State */
    { name: 'ID', active: false },
    { name: 'Name', active: false },
    { name: 'Price', active: false, numeric: true },
    { name: 'Reference', active: false },
  ]);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
        console.log(response.data);
      },
      (error) => {
        const contenidoError = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

        setContent(contenidoError);
      },
    );
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.name}>
                {column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.reference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BoardUser;
