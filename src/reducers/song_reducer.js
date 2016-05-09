import {
  FETCH_SONG
} from '../actions/songs';

const INITIAL_STATE = {
  songs: []
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_SONG:
      console.log(action.payload);
      // console.log({ ...state, songs: state.songs.concat([action.payload]) });
      return { ...state, songs: state.songs.concat([action.payload]) };
    default:
      return state;
  }
}