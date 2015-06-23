import React from 'react';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();
let AppBar = mui.AppBar;

export default React.createClass({
  propTypes: {
    onLeftClick: React.PropTypes.func
  },
  childContextTypes: { muiTheme: React.PropTypes.object },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render() {
    return (
      <AppBar onLeftIconButtonTouchTap={this.props.onLeftClick} title="Lyrify"/>
    );
  }
});
