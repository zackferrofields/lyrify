import React from 'react';
import {RouteHandler, State, Navigation} from 'react-router';
import {Styles, Tabs, Tab} from 'material-ui';

let tabIndex = 0;
let ThemeManager = new Styles.ThemeManager();

function getSelectedIndex(key) {
  switch (key) {
    default:
    case '/home/playlists':
      return 0;
    case '/home/explore':
      return 1;
  }
}

export default React.createClass({
  mixins: [State, Navigation],
  childContextTypes: { muiTheme: React.PropTypes.object },
  componentWillMount() {
    tabIndex = getSelectedIndex(this.getPathname());
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  onActive(tab) {
    tabIndex = tab.props.tabIndex;
    this.transitionTo(tab.props.route);
  },
  render() {
    let name = this.getPathname();
    return (
      <section>
        <Tabs initialSelectedIndex={tabIndex}>
          <Tab label="Playlists" onActive={this.onActive} route="/home/playlists"/>
          <Tab label="Explore" onActive={this.onActive} route="/home/explore"/>
        </Tabs>
        <RouteHandler key={name}/>
      </section>
    );
  }
});
