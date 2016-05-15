import React, {Component} from 'react';

export default class Song extends Component {
  render() {
    const song = this.props.song;
    return (
      <tr>
        <td><div className="track">{this.props.trackNum}.</div></td>
        <td><div className="artist">{song.artist.name}</div></td>
        <td><div className="song">{song.song.name}</div></td>
        <td>
          <div className="remove">
            <button className="remove-button" onClick={() => this.remove(song)}>x</button>
          </div>
        </td>
      </tr>
    );
  }
}
