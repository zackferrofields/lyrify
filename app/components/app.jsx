import React from 'react';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;

let menuItems = [
  { route: 'settings', text: 'Settings' }
];

export default React.createClass({
  childContextTypes: { muiTheme: React.PropTypes.object },
  componentDidMount() {
    this.refs.leftNav.close();
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
    return (
      <section>
        <AppBar title="Lyrify" onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap.bind(this)}/>
        <LeftNav docked={false} menuItems={menuItems} ref="leftNav"/>
      </section>
    );
  }
});
