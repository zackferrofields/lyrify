import axios from 'axios';

const fields = ['items(id,snippet)', 'prevPageToken', 'nextPageToken'].join(',');
const key = 'AIzaSyArV70XKUil3cEj4nKn1yuMXCHiuK2AytI';
const maxResults = 5;
const order = 'relevance';
const part = ['snippet'].join(',');
const type = 'video';
const url = 'https://www.googleapis.com/youtube/v3/search';

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

export default function(q, pageToken) {
  return axios.get(url, {
    params: { fields, key, maxResults, order, pageToken, part, q, type }
  })
  .then(checkStatus)
  .then(parseJSON);
}
