import Reflux from 'reflux';
import { List, Record } from 'immutable';
import Actions from '../actions';

let ResultRecord = new Record({
  items: new List(),
  prevPageToken: undefined,
  nextPageToken: undefined
});

let results = new ResultRecord();

let Search = Reflux.createStore({
  listenables: [Actions],
  getInitialState() {
    return results.toJS();
  },
  onSearchYouTubeCompleted({ items, nextPageToken }) {
    results = results
      .set('items', results.get('items').concat(items))
      .set('nextPageToken', nextPageToken);
    this.trigger(results.toJS());
  },
  onSearchYouTubeFailed(error) {
    console.log(error);
  }
});

export default Search;
