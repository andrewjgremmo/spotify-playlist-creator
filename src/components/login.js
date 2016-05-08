import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  login = () => {
    const id = '36739bc49f164934b869ca2aa419a77e';
    const responseType = 'token';
    const redirect = 'http://andrewjgremmo.github.com/spotify-playlist-creator';
    window.location.href = 'https://accounts.spotify.com/authorize' +
      `?client_id=${id}` +
      `&response_type=${responseType}` +
      `&redirect_uri=${redirect}`
    ;
  }

  render() {
    return(
      <button
        onClick={this.login}>Login to Spotify</button>
    );
  }
}