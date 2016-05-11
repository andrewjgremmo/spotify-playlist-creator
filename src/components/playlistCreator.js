import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SongActions from '../actions/songs';
import sample from 'lodash/collection/sample';

export default class PlaylistCreator extends Component {
  state = {
    artistInput: '',
    playlistLength: 20,
    randomness: 2,
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  generatePlaylist = () => {
    const artists = this.state.artistInput.match(/[^\r\n]+/g);
    let artist, selectRelated;

    for (let i = 0; i < this.state.playlistLength; i++) {
      selectRelated = this.state.randomness % i == 0;
      artist = sample(artists);
      this.props.actions.fetchSong(this.props.token, artist, 'US', selectRelated);
    }
  }

  render () {
    return(
      <div>
        <textarea name="artistInput" onChange={this.onChange} value={this.state.artistInput}>
        </textarea>
        <button onClick={this.generatePlaylist}>Generate Playlist</button>
      </div>
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