import Reflux from 'reflux';
import { searchYouTube } from '../api';

let Actions = Reflux.createActions({
  'searchYouTube': {
    asyncResult: true
  }
});

Actions.searchYouTube.listenAndPromise(searchYouTube);

export default Actions;
