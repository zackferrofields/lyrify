import React from 'react';
import {Navigation} from 'react-router';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;

let menuItems = [
  { route: '/', text: 'Home' },
  { route: 'settings', text: 'Settings' }
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
      <AppBar iconClassNameLeft="ion-arrow-left-a" onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap} title="Menu"/>
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
