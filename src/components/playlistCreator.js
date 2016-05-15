import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlaylistActions from '../actions/playlist';
import axios from 'axios';
import sample from 'lodash/sample';

export default class PlaylistCreator extends Component {
  state = {
    artistInput: '',
    displayTips: true,
    playlistLength: 20,
    randomness: 2,
    topArtistSearchLength: 'short_term',
    generateError: null,
    seedError: null
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  seedArtistList = () => {
    const headers = { 'Authorization': 'Bearer ' + this.props.token };
    const params = { time_range: this.state.topArtistSearchLength };

    axios.get(`https://api.spotify.com/v1/me/top/artists`, {
      headers: headers,
      params: params
    }).then(function(response) {
        const artists = response.data.items.map((artist) => {
          return artist.name;
        }).join('\n');

        this.setState({artistInput: artists});
      }.bind(this))
  }

  generatePlaylist = () => {
    const artists = this.state.artistInput.match(/[^\r\n]+/g);
    let artist, selectRelated;

    if (!artists) {
      this.setState({ generateError: 'Please make sure to populate the artists field.'});
      return;
    } else if (!this.props.token) {
      this.setState({ generateError: 'Please make sure to login to Spotify' });
      return;
    } else {
      this.setState({
        generateError: null
      })
    }

    for (let i = 0; i < this.state.playlistLength; i++) {
      selectRelated = i % this.state.randomness != 0;
      artist = sample(artists);
      this.props.actions.fetchSong(this.props.token, artist, 'US', selectRelated);
    }
  }

  render () {
    return(
      <div className="playlist-creator">
        <div className="artist-seed-list">
          {this.state.displayTips ? <h4>2. Enter artists you want your playlist based on (one per line)</h4> : null}
          <textarea name="artistInput" onChange={this.onChange} value={this.state.artistInput} placeholder="Artists go here (one per line)">
          </textarea>
        </div>
        <div className="artist-seed-generator">
          {this.state.displayTips ? <h4>(Optional) Seed the artist list with your top artists</h4> : null}
          <select name="topArtistSearchLength" onChange={this.onChange}>
            <option value="short_term">Your Top Artists (Last Month)</option>
            <option value="medium_term">Your Top Artists (Last 6 Months)</option>
            <option value="long_term">Your Top Artists (All Time)</option>
          </select>
          <button className="basic-button" onClick={this.seedArtistList}>Seed Artist List</button>
        </div>
        <div className="playlist-options">
          {this.state.displayTips ? <h4>3. Tweak the length and the randomness (higher number = more deviation from artist list)</h4> : null}
          <label htmlFor="playlistLength">Playlist Length: {this.state.playlistLength}</label>
          <input name="playlistLength" id="playlistLength" type="range" min={5} max={100} step={5} value={this.state.playlistLength} onChange={this.onChange} />
          <label htmlFor="randomness">Playlist Randomness: {this.state.randomness}</label>
          <input name="randomness" id="randomness" type="range" min={1} max={20} step={1} value={this.state.randomness} onChange={this.onChange} />
        </div>
        {this.state.displayTips ? <h4>4. Generate your playlist!</h4> : null}
        <button className="basic-button" onClick={this.generatePlaylist}>Generate Playlist</button>
        { this.state.generateError != null ? <div className="error">{this.state.generateError}</div> : null}
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
