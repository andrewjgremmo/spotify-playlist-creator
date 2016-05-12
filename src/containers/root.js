import React from 'react';
import { Component } from 'react';
import Login from '../components/login';
import PlaylistCreator from '../components/playlistCreator';
import Playlist from '../components/playlist';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Login />
        <PlaylistCreator />
        <Playlist />
      </div>
    );
  }
}
