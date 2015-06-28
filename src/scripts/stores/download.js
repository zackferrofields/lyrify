import Reflux from 'reflux';
import Actions from '../actions';

let Download = Reflux.createStore({
  listenables: [Actions],
  getInitialState() {
    return {
      downloads: []
    };
  },
  onDownloadYouTubeCompleted(response) {
    console.log(response);
  },
  onDownloadYouTubeFailed(error) {
    console.log(error);
  }
});

export default Download;
