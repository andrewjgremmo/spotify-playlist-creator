import {
  FETCH_USER
} from '../actions/auth';
const queryString = require('query-string');

const token = (location.hash == "") ? undefined : queryString.parse(location.hash).access_token;
const INITIAL_STATE = {
  token: token,
  user: undefined
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER:
      console.log({ ...state, user: action.payload.data.id });
      return { ...state, user: action.payload.data.id }
    default:
      return state;
  }
}