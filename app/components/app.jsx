import React from 'react';
import {RouteHandler, State} from 'react-router';
import Header from './header';
import Nav from './nav';

export default React.createClass({
  mixins: [State],
  childContextTypes: { muiTheme: React.PropTypes.object },
  onLeftClick() {
    this.refs.nav.toggle();
  },
  render() {
    let name = this.getPathname();
    return (
      <div className="app">
        <Header onLeftClick={this.onLeftClick}/>
        <Nav ref="nav"/>
        <section className="content">
          <RouteHandler key={name}/>
        </section>
      </div>
    );
  }
});
