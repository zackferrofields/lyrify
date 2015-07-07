import Rx from 'rx';
import React from 'react';
import Actions from '../actions';
import {Styles, TextField, IconButton} from 'material-ui';
import Icons from 'icons';

let ThemeManager = new Styles.ThemeManager();

export default React.createClass({
  childContextTypes: { muiTheme: React.PropTypes.object },
  componentDidMount() {
    let search = React.findDOMNode(this.refs.search);
    let events = Rx.Observable.fromEvent(search, 'submit');
    events.forEach( e => {
      e.preventDefault();
      Actions.searchYouTube(search.value.trim());
    });
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  onClick() {
    let query = this.refs.search.getValue();
    if (query) {
      Actions.searchYouTube(query);
    } else {
      this.refs.search.focus();
    }
  },
  render() {
    return (
      <form ref="search">
        <IconButton className={Icons.search} onClick={this.onClick}/>
        <TextField hintText="Search" ref="search"/>
      </form>
    );
  }
});
