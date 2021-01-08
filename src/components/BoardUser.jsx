import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import UserService from './services/user.service';
import AuthService from './services/auth.service';

const BoardUser = () => {
  const [content, setContent] = useState([]);
  const [columns, setColumns] = useState([ /* Columns State */
    { name: 'ID', active: false },
    { name: 'Name', active: false },
    { name: 'Price', active: false, numeric: true },
    { name: 'Reference', active: false },
  ]);

  const history = useHistory();
  const Redirect = () => {
    history.push('/');
  };

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        /* console.log(response.data); */
        setContent(response.data);
      },
      (error) => {
        /* console.log(error.response.data.detail); */
        Redirect();
      },
    );
  }, []);

  const logOut = () => {
    AuthService.logout();
    Redirect();
  };
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
      <Button variant="contained" color="primary" onClick={logOut} size="large">
        Log Out
      </Button>
    </>
  );
};

export default BoardUser;
