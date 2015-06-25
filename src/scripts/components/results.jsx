import React from 'react';
import Reflux from 'reflux';
import { Search } from '../stores';
import { Styles, ListItem, Avatar, IconButton } from 'material-ui';
import Icons from 'icons';

let ThemeManager = new Styles.ThemeManager();

export default React.createClass({
  mixins: [Reflux.connect(Search, 'results')],
  childContextTypes: { muiTheme: React.PropTypes.object },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getResultItems() {
    return this.state.results.items.map(item => {
      return (
        <ListItem key={item.id.videoId}
          leftAvatar={<Avatar src={item.snippet.thumbnails.default.url} />}
          rightIconButton={<IconButton className={Icons.down}/>}
          secondaryText={item.snippet.description || ' '}
          secondaryTextLines={2}
        >
          {item.snippet.title}
        </ListItem>
      );
    });
  },
  render() {
    let items = this.getResultItems();
    return (
      <ListItem>
        {items}
      </ListItem>
    );
  }
});
