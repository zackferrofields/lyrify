import React from 'react';
import {Navigation} from 'react-router';
import {Styles, AppBar, LeftNav} from 'material-ui';
import Icons from 'icons';

let ThemeManager = new Styles.ThemeManager();
let menuItems = [
  {
    iconClassName: Icons.home,
    route: '/',
    text: 'Home'
  },
  {
    iconClassName: Icons.settings,
    route: 'settings',
    text: 'Settings'
  }
];

export default React.createClass({
  mixins: [Navigation],
  childContextTypes: { muiTheme: React.PropTypes.object },
  componentDidMount() {
    this.refs.leftNav.close();
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  onChange(e, selectedIndex, menuItem) {
    this.transitionTo(menuItem.route);
  },
  onLeftIconButtonTouchTap() {
    this.refs.leftNav.close();
  },
  renderHeader() {
    return (
      <AppBar iconClassNameLeft={Icons.back} onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap} title="Menu"/>
    );
  },
  render() {
    let header = this.renderHeader();
    return (
      <LeftNav
        docked={false}
        header={header}
        menuItems={menuItems}
        onChange={this.onChange}
        ref="leftNav"/>
    );
  },
  toggle() {
    this.refs.leftNav.toggle();
  }
});
