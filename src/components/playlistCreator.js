import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlaylistActions from '../actions/playlist';
import sample from 'lodash/sample';

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

    if (!artists) {
      alert('Please make sure to populate the artists field.');
      return;
    }

    for (let i = 0; i < this.state.playlistLength; i++) {
      selectRelated = i % this.state.randomness != 0;
      artist = sample(artists);
      this.props.actions.fetchSong(this.props.token, artist, 'US', selectRelated);
    }
  }

  render () {
    return(
      <div className="playlist-options">
        <textarea name="artistInput" onChange={this.onChange} value={this.state.artistInput} placeholder="Enter artists here to base the playlist off of (one per line)">
        </textarea>
        <label htmlFor="randomness">Playlist Randomness: {this.state.randomness}</label>
        <input name="randomness" id="randomness" type="range" min={1} max={20} step={1} value={this.state.randomness} onChange={this.onChange} />
        <label htmlFor="playlistLength">Playlist Length: {this.state.playlistLength}</label>
        <input name="playlistLength" id="playlistLength" type="range" min={5} max={50} step={5} value={this.state.playlistLength} onChange={this.onChange} />
        <button className="basic-button" onClick={this.generatePlaylist}>Generate Playlist</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      token: state.auth.token,
      songs: state.playlist.songs
  };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(PlaylistActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCreator);
