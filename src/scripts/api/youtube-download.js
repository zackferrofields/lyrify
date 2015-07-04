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
      let name = info.title.replace(/\W/g, '');
      let audioFormat = audioFormats.reduce((acc, audio) => audio.audioBitrate > acc.audioBitrate ? audio : acc, { audioBitrate: 0 });
      let filename = `${name}.${audioFormat.container}`;
      let location = `./src/resources/sounds/${filename}`;
      ytdl.downloadFromInfo(info, { format: audioFormat })
      .on('error', err => {
        fs.unlinkSync(location);
        reject(err, info);
      })
      // .on('format', formatInfo => fileSize = formatInfo.size)
      // .on('data', data => self.progressed(fileName, (dataRead += data.length) / fileSize))
      .on('end', resolve.bind(null, info))
      .pipe(fs.createWriteStream(location));
    });
  });
}
