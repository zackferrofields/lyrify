import axios from 'axios';

const url = 'https://www.googleapis.com/youtube/v3/search';
const key = 'AIzaSyArV70XKUil3cEj4nKn1yuMXCHiuK2AytI';
const fields = ['items(id,snippet)', 'prevPageToken', 'nextPageToken'].join(',');
const part = ['snippet'].join(',');
const maxResults = 5;
const order = 'relevance';

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
    params: { key, fields, part, maxResults, order, q, pageToken}
  })
  .then(checkStatus)
  .then(parseJSON);
}
