import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import SongReducer from './song_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  songs: SongReducer
});

export default rootReducer;