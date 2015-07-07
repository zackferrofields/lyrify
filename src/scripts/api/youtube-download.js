import fs from 'fs';
import ytdl from 'ytdl-core';

const url = 'https://www.youtube.com/watch';

/**
* Parse Video Object to url
* @private
* @param {(Object|string)} Video object or url
* @return {string} YouTube URL
*/
function parseVideo(video) {
  let str;
  if (typeof video === 'string') {
    str = video;
  } else {
    str = `${url}?v=${video.id}`;
  }
  return str;
}

function onError(reject, location, err) {
  fs.unlinkSync(location);
  reject(err);
}

function onEnd(resolve, info) {
  resolve(info);
}

function onData(id, data) {
  // let progress = (dataRead += data.length) / fileSize)
  let progress = data.length;
  console.log(progress);
}

function onFormat(id, info) {
  // let size = info.size;
  console.log(info);
}

export default function(video) {
  let uri = parseVideo(video);
  return new Promise((resolve, reject) => {
    ytdl.getInfo(uri, (err, info) => {
      if (err) {
        return reject(err);
      }
      let audioFormats = info.formats.filter(format => format.container && format.type.startsWith('audio'));
      if (!audioFormats.length) {
        return reject(new Error(`${uri} doesn't contain an audio format`));
      }
      let id = info.video_id;
      let name = info.title.replace(/\W/g, '');
      let audioFormat = audioFormats.reduce((acc, audio) => audio.audioBitrate > acc.audioBitrate ? audio : acc, { audioBitrate: 0 });
      let filename = `${name}.${audioFormat.container}`;
      let location = `./src/resources/sounds/${filename}`;
      ytdl.downloadFromInfo(info, { format: audioFormat })
      .on('error', onError.bind(null, reject, location))
      .on('format', onFormat.bind(null, id))
      .on('data', onData.bind(null, id))
      .on('end', onEnd.bind(null, resolve, info))
      .pipe(fs.createWriteStream(location));
    });
  });
}
