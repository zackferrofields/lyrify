import Reflux from 'reflux';
import Actions from '../actions';

let Search = Reflux.createStore({
  listenables: [Actions],
  getInitialState() {
    return {
      items: []
    }
  },
  onSearchYouTubeCompleted(response) {
    console.log(response);
    this.trigger(response);
  },
  onSearchYouTubeFailed(error) {
    console.log(error);
  }
});

export default Search;
