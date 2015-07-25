import { getInfo } from 'ytdl-core';

const url = 'https://www.youtube.com/watch';

export default function(videoId) {
  return new Promise((resolve, reject) => {
    getInfo(`${url}?v=${videoId}`, (err, info) => {
      if (err) return reject(err);
      return resolve({videoId, info});
    });
  });
}
