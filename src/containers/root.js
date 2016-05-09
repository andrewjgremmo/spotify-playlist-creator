import React from 'react';
import { Component } from 'react';
import Login from '../components/login';
import PlaylistCreator from '../components/PlaylistCreator';

export default class App extends Component {
  render() {
    return (
      <div>
        <Login />
        <PlaylistCreator />
      </div>
    );
  }
}