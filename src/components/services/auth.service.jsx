import axios from 'axios';

const API_URL = 'https://productsjwt.azurewebsites.net/';

const register = (username, password) => axios.post(`${API_URL}account/register`, {
  username,
  password,
});

const login = (username, password) => axios
  .post(`${API_URL}api/token/`, {
    username,
    password,
  })
  .then((response) => {
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data.access));
    }

    return response.data.access;
  });

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
