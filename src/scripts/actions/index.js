import Reflux from 'reflux';
import { downloadYouTube, searchYouTube, infoYouTube } from '../api';

let Actions = Reflux.createActions({
  downloadYouTube: { asyncResult: true },
  infoYouTube: { asyncResult: true },
  searchYouTube: { asyncResult: true }
});

Actions.downloadYouTube.listenAndPromise(downloadYouTube);
Actions.infoYouTube.listenAndPromise(infoYouTube);
Actions.searchYouTube.listenAndPromise(searchYouTube);

export default Actions;
