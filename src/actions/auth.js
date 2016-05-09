import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';

export function fetchUser(token) {
  const request = axios.get('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })

  return {
    type: FETCH_USER,
    payload: request
  }
}