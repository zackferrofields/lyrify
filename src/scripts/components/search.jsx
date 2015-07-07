import Rx from 'rx';
import React from 'react';
import Actions from '../actions';
import {Styles, TextField, IconButton} from 'material-ui';
import Icons from 'icons';

const ENTER_KEY = 13;
let ThemeManager = new Styles.ThemeManager();


export default React.createClass({
  childContextTypes: { muiTheme: React.PropTypes.object },
  componentDidMount() {
    let events = Rx.Observable.fromEvent(this.refs.search._getInputNode(), 'keyup');
    let enter = events.filter( event => event.keyCode === ENTER_KEY);
    let throttle = events.throttle(250);
    Rx.Observable.merge(enter, throttle)
      .map(event => event.target.value.trim())
      .filter(query => query !== '')
      .forEach( query => {
        Rx.Observable.fromPromise(Actions.searchYouTube(query))
          .retry(3);
          // TODO: cancel the original http request
          //.takeUntil(events);
      });
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  onClick() {
    this.refs.search.focus();
  },
  render() {
    return (
      <div>
        <IconButton className={Icons.search} onClick={this.onClick}/>
        <TextField hintText="Search" ref="search"/>
      </div>
    );
  }
});
