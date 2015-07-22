import Reflux from 'reflux';
import { OrderedMap, Record } from 'immutable';
import Actions from '../actions';

let SearchRecord = new Record({
  items: new OrderedMap(),
  prevPageToken: undefined,
  nextPageToken: undefined
});

let searchRecord = new SearchRecord();

let Search = Reflux.createStore({
  listenables: [Actions],
  getInitialState() {
    return searchRecord;
  },
  onSearchYouTubeCompleted({ items, nextPageToken }) {
    searchRecord = searchRecord
      .set('items', searchRecord.get('items').merge(new OrderedMap( items.map(item => [item.id.videoId, item]))))
      .set('nextPageToken', nextPageToken);
    this.trigger(searchRecord);
  },
  onSearchYouTubeFailed(error) {
    console.log(error);
  }
});

export default Search;
