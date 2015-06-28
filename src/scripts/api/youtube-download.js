import fs from 'fs';
import ytdl from 'ytdl-core';

const url = 'http://youtube.com/watch';

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
  let self = this;
  let uri = parseVideo(video);
  return new Promise((resolve, reject) => {
    ytdl.getInfo(uri, {downloadURL: true}, (err, info) => {
      if (err) {
        return reject(err);
      }
      let audioFormats = info.formats.filter(format => format.container && format.type.startsWith('audio'));
      if (!audioFormats.length) {
        return reject(new Error(`${url} doesn't contain an audio format`));
      }
      let title = info.title.replace(/ /g, '-');
      let audioFormat = audioFormats.reduce((acc, audio) => audio.audioBitrate > acc.audioBitrate ? audio : acc, { audioBitrate: 0 });
      let fileName = `${title}.${audioFormat.container}`;
      let fileSize = 1;
      let dataRead = 0;
      ytdl.downloadFromInfo(info, {
        format: audioFormat
      })
      .on('error', reject.bind(null, fileName))
      .on('format', formatInfo => fileSize = formatInfo.size)
      .on('data', data => self.progressed(fileName, (dataRead += data.length) / fileSize))
      .on('end', resolve.bind(null, fileName))
      .pipe(fs.createWriteStream(`./app/sounds/${fileName}`));
    });
  });
}
