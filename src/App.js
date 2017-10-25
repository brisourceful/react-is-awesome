import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import SearchBar from './components/SearchBar';
import Content from './components/Content';
import NavBar from './components/NavBar';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.switchPage = this.switchPage.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.makeFriends = this.makeFriends.bind(this);
    this.state = {
      user: {
        name: null,
        id: null,
        token: null,
      },
      friends: [],
      content: 'loginbox',
      friendsBooks: [],
    };
  }

  login({ name, id, token }) {
    this.setState({
      user: {
        name,
        id,
        token,
      },
    });
    this.switchPage('activityLog');
    this.makeFriends();
    this.getFriends();
  }

  makeFriends() {
    $.ajax({
      url: `https://react-is-awesome-backend.herokuapp.com/users/${this.state.user.id}/friends`,
      method: 'POST',
      data: {
        friend: {
          name: 'krystal',
        },
        token: `${this.state.user.token}\\n`,
      },
    }).done((response) => {
      console.log(response);
    });
  }

  getFriends() {
    $.ajax({
      url: `https://react-is-awesome-backend.herokuapp.com/users/${this.state.user.id}/friends`,
      data: {
        token: `${this.state.user.token}\\n`,
      },
    }).done((response) => {
      this.setState({
        friends: response,
      });
    });
  }

  switchPage(page) {
    this.setState({
      content: page,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <SearchBar />
        <Content login={this.login} page={this.state.content} />
        <NavBar />
      </div>
    );
  }
}

export default App;
