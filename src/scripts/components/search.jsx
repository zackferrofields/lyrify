import Rx from 'rx';
import React from 'react';
import Actions from '../actions';
import {Styles, TextField, IconButton} from 'material-ui';
import Icons from 'icons';

let ThemeManager = new Styles.ThemeManager();

export default React.createClass({
  childContextTypes: { muiTheme: React.PropTypes.object },
  componentDidMount() {
    let onKeyUps = Rx.Observable.fromEvent(this.refs.search._getInputNode(), 'keyup');
    onKeyUps
      .buffer( () => onKeyUps.throttle(250) )
      .forEach( () => {
        Actions.searchYouTube(this.getQuery());
      });
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getQuery() {
    return this.refs.search.getValue().trim();
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
