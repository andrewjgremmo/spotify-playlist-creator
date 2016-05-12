import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import PlaylistReducer from './playlist_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  playlist: PlaylistReducer
});

export default rootReducer;