import axios from 'axios';
import sample from 'lodash/sample';

export const FETCH_SONG = 'FETCH_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
export const REMOVE_ALL_SONGS = 'REMOVE_ALL_SONGS';
export const SAVE_PLAYLIST = 'SAVE_PLAYLIST';

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

export function savePlaylist(auth, title, songs) {
  const authToken = {
    'Authorization': `Bearer ${auth.token}`
  }

  const request = axios.post(`${ROOT_URL}/users/${auth.user}/playlists`, {
      name: title
    },
    {
      headers: authToken
    }
  ).then(function(response) {
    const playlistId = response.data.id;
    return axios.post(`${ROOT_URL}/users/${auth.user}/playlists/${playlistId}/tracks`, {
        uris: songs.map((song) => {
          return `spotify:track:${song.song.id}`;
        })
      },
      {
        headers: authToken
      }
    )
  })

  return {
    type: SAVE_PLAYLIST,
    payload: request
  }
}
