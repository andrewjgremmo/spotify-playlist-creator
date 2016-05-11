import {
  FETCH_SONG,
  REMOVE_SONG,
  REMOVE_ALL_SONGS
} from '../actions/songs';
import shuffle from 'lodash/collection/shuffle';

const INITIAL_STATE = {
  songs: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_SONG:
      return { ...state, songs: shuffle(state.songs.concat([action.payload])) };
    case REMOVE_SONG:
      return { ...state,
        songs: state.songs.filter(
          (song) => song.song.id != action.payload.song.id
        )
      }
    case REMOVE_ALL_SONGS:
      return { ...state, songs: [] }
    default:
      return state;
  }
}