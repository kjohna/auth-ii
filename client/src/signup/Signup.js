import React from 'react';
import api from '../api/api';

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    departments: ""
  }

  handleInput = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();

    api.post('/register', this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users');
      })
      .catch( err => console.error(err));
  }

  render() {
    return (
      <>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div>
            <label htmlFor="username" />
            <input 
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="departments" />
            <input 
              name="departments"
              id="departments"
              value={this.state.departments}
              onChange={this.handleInput}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input 
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleInput}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </>
    )
  }
}

export default Signup;