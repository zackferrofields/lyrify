import Rx from 'rx';
import React from 'react';
import Reflux from 'reflux';
import { Search } from '../stores';
import Actions from '../actions';
import {Styles, TextField, IconButton} from 'material-ui';
import Icons from 'icons';

let ThemeManager = new Styles.ThemeManager();

export default React.createClass({
  mixins: [Reflux.connect(Search, 'results')],
  childContextTypes: { muiTheme: React.PropTypes.object },
  componentDidMount() {
    Rx.Observable.fromEvent(this.refs.search._getInputNode(), 'keypress')
      .throttle(500)
      .map(event => event.target.value.trim())
      .filter(query => query !== '')
      .flatMapLatest(query => Rx.Observable.fromPromise(Actions.searchYouTube(query)))
      .merge(
        Rx.Observable.fromEvent(React.findDOMNode(this.refs.next), 'click')
          .flatMapLatest(() => Rx.Observable.fromPromise(Actions.searchYouTube(this.refs.search.getValue(), this.state.results.nextPageToken)))
      )
      .pluck('items')
      .concatMap(items => {
        let promises = items.map(item => Actions.infoYouTube(item.id.videoId));
        return Rx.Observable.fromPromise(Promise.all(promises));
      })
      .subscribe();
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  onFocus() {
    this.refs.search.focus();
  },
  onPrevious() {
    if (!this.state.results.prevPageToken) return;
    Actions.searchYouTube(this.refs.search.getValue(), this.state.results.prevPageToken);
  },
  render() {
    return (
      <div>
        <IconButton className={Icons.search} onClick={this.onFocus}/>
        <TextField hintText="Search" ref="search"/>
        <IconButton className={Icons.next} disabled={!this.state.results.nextPageToken} ref="next"/>
      </div>
    );
  }
});
