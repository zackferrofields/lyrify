import React from 'react';
import Actions from '../actions';
import Results from './results';
import {Styles, Toolbar, TextField, ToolbarGroup, IconButton, DropDownIcon} from 'material-ui';
import Icons from 'icons';

let ThemeManager = new Styles.ThemeManager();
let iconMenuItems = [
  { payload: '1', text: 'Download' },
  { payload: '2', text: 'More Info' }
];

export default React.createClass({
  childContextTypes: { muiTheme: React.PropTypes.object },
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
  onSubmit(e) {
    e.preventDefault();
    Actions.searchYouTube(this.refs.search.getValue());
  },
  render() {
    return (
      <section>
        <Toolbar>
          <ToolbarGroup float="left" key={0}>
            <form onSubmit={this.onSubmit}>
              <IconButton className={Icons.search} onClick={this.onClick}/>
              <TextField hintText="Search" ref="search"/>
              </form>
          </ToolbarGroup>
          <ToolbarGroup float="right" key={1}>
            <DropDownIcon iconClassName={Icons.more} menuItems={iconMenuItems} />
          </ToolbarGroup>
        </Toolbar>
        <Results/>
      </section>
    );
  }
});