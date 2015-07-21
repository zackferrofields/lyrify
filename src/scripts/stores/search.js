import Reflux from 'reflux';
import { Record } from 'immutable';
import Actions from '../actions';

let ResultRecord = new Record({
  items: [],
  prevPageToken: undefined,
  nextPageToken: undefined
});

let results = new ResultRecord();

let Search = Reflux.createStore({
  listenables: [Actions],
  getInitialState() {
    return results.toJS();
  },
  onSearchYouTubeCompleted(response) {
    results = results.merge(new ResultRecord(response));
    this.trigger(results.toJS());
  },
  onSearchYouTubeFailed(error) {
    console.log(error);
  }
});

export default Search;
