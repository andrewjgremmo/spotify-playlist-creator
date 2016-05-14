import axios from 'axios';
import sample from 'lodash/sample';

export const FETCH_SONG = 'FETCH_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
export const REMOVE_ALL_SONGS = 'REMOVE_ALL_SONGS';

const ROOT_URL = 'https://api.spotify.com/v1';

export function fetchSong(token, artist, market, selectRelated = false) {
  let artistObj, albumObj;
  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const request = axios.get(`${ROOT_URL}/search?q=${artist}&type=artist&market=${market}`, header)
    .then(function(response) {
      if (!selectRelated) {
        return response;
      } else {
        const artistId = response.data.artists.items[0].id;
        return axios.get(`${ROOT_URL}/artists/${artistId}/related-artists`, header)
      }
    })
    .then(function(response) {
      artistObj = selectRelated ? sample(response.data.artists) : response.data.artists.items[0];
      console.log(selectRelated, artistObj.name)
      return axios.get(`${ROOT_URL}/artists/${artistObj.id}/albums?album_type=album%2Csingle%2Ccompilation&limit=50&market=${market}`, header)
    })
    .then(function(response) {
      albumObj = sample(response.data.items);
      return axios.get(`${ROOT_URL}/albums/${albumObj.id}/tracks?offset=0&limit=50&market=${market}`, header)
    })
    .then(function(response) {
      return {
        artist: artistObj,
        album: albumObj,
        song: sample(response.data.items)
      }
    })

  return {
    type: FETCH_SONG,
    payload: request
  }
}

export function removeSong(song) {
  return {
    type: REMOVE_SONG,
    payload: song
  }
}

export function removeAllSongs() {
  return {
    type: REMOVE_ALL_SONGS
  }
}

export function savePlaylist(auth, songs) {
  const authToken = {
    'Authorization': `Bearer ${auth.token}`
  }

  const request = axios.post(`${ROOT_URL}/users/${auth.user}/playlists`, {
      name: "Test Playlist"
    }, {
      headers: authToken
    }
  ).then(function(response) {
    console.log(response);
    // axios.post(`${ROOT_URL}/users/${auth.user.id}/`)
  })

  return {
    type: SAVE_PLAYLIST,
    payload: request
  }
}
