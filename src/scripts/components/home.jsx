import React from 'react';
import {RouteHandler, State, Navigation} from 'react-router';
import {Styles, Tabs, Tab} from 'material-ui';

let ThemeManager = new Styles.ThemeManager();

export default React.createClass({
  mixins: [State, Navigation],
  childContextTypes: { muiTheme: React.PropTypes.object },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getSelectedIndex(key) {
    switch (key) {
      default:
      case '/home/playlists':
        return 0;
      case '/home/explore':
        return 1;
    }
  },
  onActive(tab) {
    this.transitionTo(tab.props.route);
  },
  render() {
    let name = this.getPathname();
    let selected = this.getSelectedIndex(name);
    return (
      <section>
        <Tabs initialSelectedIndex={selected}>
          <Tab label="Playlists" onActive={this.onActive} route="/home/playlists"/>
          <Tab label="Explore" onActive={this.onActive} route="/home/explore"/>
        </Tabs>
        <RouteHandler key={name}/>
      </section>
    );
  }
});
