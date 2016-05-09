import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/auth';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.token != undefined && this.props.user == undefined) {
      this.props.actions.fetchUser(this.props.token);
    }
  }

  render() {
    const href = 'https://accounts.spotify.com/authorize' +
      '?client_id=36739bc49f164934b869ca2aa419a77e' +
      '&response_type=token' +
      '&redirect_uri=http://andrewgremmo.com/spotify-playlist-creator/';

    return(
      <div class="login">
        { this.props.user ? <span> Logged in as { this.props.user } </span> : <a href={ href }>Login to Spotify</a> }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);