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

  handleClick = () => {
    window.location.href = 'https://accounts.spotify.com/authorize' +
      '?client_id=36739bc49f164934b869ca2aa419a77e' +
      '&response_type=token' +
      '&redirect_uri=http://andrewgremmo.com/spotify-playlist-creator/' +
      `&scope=${encodeURIComponent("playlist-modify-public user-top-read")}`;
  }

  render() {
    const buttonProps = {
      onClick: this.handleClick,
      className: "basic-button",
      disabled: this.props.user != undefined
    }

    const buttonText = this.props.user ? `Logged in as ${this.props.user}` : "Login to Spotify";

    return(
      <div className="login">
        {this.props.user ? null : <h4>1. Login to Spotify</h4> }
        <button { ...buttonProps }>{buttonText}</button>
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
