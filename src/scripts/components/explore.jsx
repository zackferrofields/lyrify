import React from 'react';
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
  onFocus() {
    this.refs.search.focus();
  },
  render() {
    return (
      <Toolbar>
        <ToolbarGroup float="left" key={0}>
          <IconButton className={Icons.search} onFocus={this.onFocus}/>
          <TextField hintText="Search" ref="search"/>
        </ToolbarGroup>
        <ToolbarGroup float="right" key={1}>
          <DropDownIcon iconClassName={Icons.more} menuItems={iconMenuItems} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
});
