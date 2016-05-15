import {
  FETCH_SONG,
  REMOVE_SONG,
  REMOVE_ALL_SONGS,
  SAVE_PLAYLIST
} from '../actions/playlist';
import shuffle from 'lodash/shuffle';
import take from 'lodash/take';
import unionBy from 'lodash/unionBy';

const INITIAL_STATE = {
  songs: [],
  artists: {},
  topArtists: [],
  saved: false
}

export default function(state = INITIAL_STATE, action) {
  let artist;
  switch(action.type) {
    case FETCH_SONG:
      artist = action.payload.artist.name;
      return { ...state,
        songs: shuffle(unionBy(state.songs, [action.payload], 'song.id')),
        artists: {
          ...state.artists,
          [artist]: state.artists[artist] ? state.artists[artist] + 1 : 1
        },
        topArtists: getTopArtists(state.artists),
        saved: false
      };
    case REMOVE_SONG:
      artist = action.payload.artist.name;
      return { ...state,
        songs: state.songs.filter(
          (song) => song.song.id != action.payload.song.id
        ),
        artists: {
          ...state.artists,
          [artist]: state.artists[artist] ? state.artists[artist] - 1 : 0
        },
        topArtists: getTopArtists(state.artists),
        saved: false
      }
    case REMOVE_ALL_SONGS:
      return { ...state, songs: [], artists: {}, topArtists: [], saved: false }
    case SAVE_PLAYLIST:
      return { ...state, saved: action.payload.statusText == "Created" }
    default:
      return state;
  }
}

function getTopArtists(artists) {
  return take(Object.keys(artists).sort(function(a,b) {
    return artists[b] - artists[a];
  }), 3);
}
