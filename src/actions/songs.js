import axios from 'axios';
import _ from 'lodash';

export const FETCH_SONG = 'FETCH_SONG';

const ROOT_URL = 'https://api.spotify.com/v1';

export function fetchSong(token, artist, market, related = false) {
  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const request = axios.get(`${ROOT_URL}/search?q=${artist}&type=artist&market=${market}`, header)
  .then(function(response) {
    const artistObj = response.data.artists.items[0];
    // console.log(artistObj);
    return axios.get(`${ROOT_URL}/artists/${artistObj.id}/albums?album_type=album%2Csingle%2Ccompilation&limit=50&market=${market}`, header)
    .then(function(response) {
      const albumObj = _.sample(response.data.items);
      // console.log(albumObj);
      return axios.get(`${ROOT_URL}/albums/${albumObj.id}/tracks?offset=0&limit=50&market=${market}`, header)
      .then(function(response) {
        return {
          artist: artistObj,
          album: albumObj,
          song: _.sample(response.data.items)
        }
      })
    })
  })

  return {
    type: FETCH_SONG,
    payload: request
  }
}