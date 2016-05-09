import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SongActions from '../actions/songs';

export default class PlaylistCreator extends Component {
  componentDidMount() {
    this.props.actions.fetchSong(this.props.token, 'Death Grips', 'US');
  }

  render () {
    console.log(this.props.songs);
    return(
      <div>Hey</div>
    );
  }
}

function mapStateToProps(state) {
  return {
      token: state.auth.token,
      songs: state.songs.songs
  };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(SongActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCreator);