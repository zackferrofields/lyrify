import Reflux from 'reflux';
import { Record } from 'immutable';
import Actions from '../actions';

let Results = new Record({
  items: [],
  prevPageToken: undefined,
  nextPageToken: undefined
});

let Search = Reflux.createStore({
  listenables: [Actions],
  getInitialState() {
    return new Results();
  },
  onSearchYouTubeCompleted(response) {
    this.trigger(new Results(response));
  },
  onSearchYouTubeFailed(error) {
    console.log(error);
  }
});

export default Search;
