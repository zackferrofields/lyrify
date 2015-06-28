import Reflux from 'reflux';
import { searchYouTube, downloadYouTube } from '../api';

let Actions = Reflux.createActions({
  'searchYouTube': {
    asyncResult: true
  },
  'downloadYouTube': {
    asyncResult: true
  }
});

Actions.searchYouTube.listenAndPromise(searchYouTube);
Actions.downloadYouTube.listenAndPromise(downloadYouTube);

export default Actions;
