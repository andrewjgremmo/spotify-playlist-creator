import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Song from '../components/song';
import * as PlaylistActions from '../actions/playlist';

export default class Playlist extends Component {
  state = {
    title: "Super Cool Playlist",
    titleOverride: false
  }

  renderSongs() {
    let trackNum = 0;
    return this.props.songs.map((song) => {
      trackNum++;
      return (
        <Song
          key={song.song.id}
          trackNum={trackNum}
          song={song}
          remove={this.props.actions.removeSong}
        />
      )
    })
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      titleOverride: true
    });
  }

  getTitle = () => {
    if (this.state.titleOverride || this.props.topArtists.length == 0) {
      return this.state.title;
    } else {
      return this.props.topArtists.reduce(
        (prev, curr, i) => {
          return prev + curr + ((i===this.props.topArtists.length-2) ? ' and ' : ', ')
        }, '')
      .slice(0, -2) + " Playlist";
    }
  }

  clearSongs = () => {
    this.props.actions.removeAllSongs();
    this.setState({
      titleOverride: false
    })
  }

  render() {
    return(
      <div className="playlist">
        <h4>5. Change your playlist title if you wish and then save to your account!</h4>
        <input type="text" onChange={this.handleTitleChange} value={this.getTitle()} />
        <div className="playlist-buttons">
          <button className="basic-button" disabled={ this.props.saved } onClick={() => {this.props.actions.savePlaylist(this.props.auth, this.getTitle(), this.props.songs)}}> { this.props.saved ? "Saved" : "Save Playlist" }</button>
          <button className="basic-button" onClick={this.clearSongs}>Clear All Songs</button>
        </div>
        <table>
          <thead>
            <tr>
              <th className="track">Track</th>
              <th className="artist">Artist</th>
              <th className="song">Song</th>
              <th className="remove"></th>
            </tr>
          </thead>
          <tbody>
            {this.renderSongs()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      auth: state.auth,
      songs: state.playlist.songs,
      artists: state.playlist.artists,
      topArtists: state.playlist.topArtists,
      saved: state.playlist.saved
  };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(PlaylistActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
