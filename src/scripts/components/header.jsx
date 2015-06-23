import React from 'react';
import {Styles, AppBar} from 'material-ui';

let ThemeManager = new Styles.ThemeManager();

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
