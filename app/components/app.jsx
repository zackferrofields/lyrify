import React from 'react';
import {RouteHandler, State, Navigation} from 'react-router';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;

let menuItems = [
  { route: '/', text: 'Home' },
  { route: 'settings', text: 'Settings' }
];

export default React.createClass({
  mixins: [State, Navigation],
  childContextTypes: { muiTheme: React.PropTypes.object },
  componentDidMount() {
    this.refs.leftNav.close();
  },
  onChange(e, selectedIndex, menuItem) {
    this.transitionTo(menuItem.route);
  },
  onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render() {
    let name = this.getPathname();
    return (
      <section>
        <AppBar onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap} title="Lyrify"/>
        <LeftNav docked={false} menuItems={menuItems} onChange={this.onChange} ref="leftNav"/>
        <RouteHandler key={name}/>
      </section>
    );
  }
});
