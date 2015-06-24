import axios from 'axios';

const url = 'https://www.googleapis.com/youtube/v3/search';
const key = 'AIzaSyArV70XKUil3cEj4nKn1yuMXCHiuK2AytI';
const fields = ['etag', 'items', 'prevPageToken', 'nextPageToken'].join(',');
const part = 'snippet';

function checkStatus(response) {
  if (response.status !== 200) {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

function parseJSON(response) {
  return response.data;
}

export default function(q) {
  return axios.get(url, {
    params: { key, fields, part, q }
  })
  .then(checkStatus)
  .then(parseJSON);
}
