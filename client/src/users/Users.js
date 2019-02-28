import React from 'react';
import api from '../api/api';

import requireAuth from '../auth/requireAuth';

class Users extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    api.get('/users')
      .then(res => {
        this.setState({ users: res.data.users });
      })
      .catch(err => console.error(err));
  }

  render() {
    const usersFormatted = this.state.users.map(user => {
      return(
      <li key={user.id}>
        <h3>{user.username}</h3>
        <p>{user.departments}</p>
      </li>
      );
    });

    return (
      <>
        <h2>Users List</h2>
        <ul>
          {usersFormatted}
        </ul>
      </>
    )
  }
}

export default requireAuth(Users);