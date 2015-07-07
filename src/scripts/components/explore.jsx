import React from 'react';
import Results from './results';
import Search from './search';
import {Styles, Toolbar, ToolbarGroup, DropDownIcon} from 'material-ui';
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
  render() {
    return (
      <section>
        <Toolbar>
          <ToolbarGroup float="left" key={0}>
            <Search/>
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
