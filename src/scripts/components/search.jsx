import Rx from 'rx';
import React from 'react';
import Reflux from 'reflux';
import { Search } from '../stores';
import Actions from '../actions';
import {Styles, TextField, IconButton} from 'material-ui';
import Icons from 'icons';

const ENTER_KEY = 13;
let ThemeManager = new Styles.ThemeManager();

export default React.createClass({
  mixins: [Reflux.connect(Search, 'results')],
  childContextTypes: { muiTheme: React.PropTypes.object },
  componentDidMount() {
    let events = Rx.Observable.fromEvent(this.refs.search._getInputNode(), 'keypress');
    let enter = events.filter( event => event.keyCode === ENTER_KEY);
    let notEnter = events.filter( event => event.keyCode !== ENTER_KEY).throttle(250);
    Rx.Observable.merge(enter, notEnter)
      .map(event => event.target.value.trim())
      .filter(query => query !== '')
      .forEach( query => {
        Rx.Observable.fromPromise(Actions.searchYouTube(query))
          .retry(3);
          // TODO: cancel the original http request
          // .takeUntil(events);
      });
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  onFocus() {
    this.refs.search.focus();
  },
  onNext() {
    if (!this.state.results.nextPageToken) return;
    Actions.searchYouTube(this.refs.search.getValue(), this.state.results.nextPageToken);
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
        <IconButton className={Icons.previous} disabled={!this.state.results.prevPageToken} onClick={this.onPrevious}/>
        <IconButton className={Icons.next} disabled={!this.state.results.nextPageToken} onClick={this.onNext}/>
      </div>
    );
  }
});
