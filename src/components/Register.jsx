import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import AuthService from './services/auth.service';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://twitter.com/juanpfrancos">
        Juanpfrancos
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [matchpass, setMatchpass] = useState(false);
  const [unmatchMessage, setUnmatchmessage] = useState('');
  const [button, setButton] = useState(true);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePassword2 = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
    if (username !== '' && password === password2) {
      setUnmatchmessage('');
      setMatchpass(false);
      setButton(false);
    } else {
      setUnmatchmessage("Passwords don't match");
      setMatchpass(true);
    }
  };

  const history = useHistory();
  const Redirect = () => {
    history.push('/');
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);

    AuthService.register(username, password).then(
      (response) => {
        setSuccessful(true);
        console.log('Creado exitosamente');

        setTimeout(() => {
          Redirect();
        }, 10000);
      },
      (error) => {
        setSuccessful(false);
      },
    );
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleRegister}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={onChangeUsername}
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={matchpass}
            onChange={onChangePassword}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            autoComplete="current-password"
            helperText={unmatchMessage}
            id="password"
            label="Password"
            error={matchpass}
            onChange={onChangePassword2}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={button}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

      <form className={classes.root} noValidate autoComplete="off">
        <div />
      </form>

    </Container>
  );
}

export default SignUp;
