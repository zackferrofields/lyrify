import React from 'react';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();
let AppBar = mui.AppBar;

class App extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
  render() {
    return (
      <AppBar title="Lyrify"/>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default App;
