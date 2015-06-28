import React from 'react';
import Reflux from 'reflux';
import { Search } from '../stores';
import Actions from '../actions';
import { Styles, List, ListItem, Avatar, IconButton } from 'material-ui';
import Icons from 'icons';

let ThemeManager = new Styles.ThemeManager();

let ResultItem = React.createClass({
  propTypes: {
    result: React.PropTypes.object
  },
  onClick() {
    Actions.downloadYouTube({ id: this.props.result.id.videoId});
  },
  render() {
    let item = this.props.result;
    return (
      <ListItem key={item.id.videoId}
        leftAvatar={<Avatar src={item.snippet.thumbnails.default.url} />}
        rightIconButton={<IconButton className={Icons.download} onClick={this.onClick}/>}
        secondaryText={item.snippet.description || ' '}
        secondaryTextLines={2}
      >
        {item.snippet.title}
      </ListItem>
    );
  }
});

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
      return <ResultItem key={item.id.videoId} result={item}/>;
    });
  },
  render() {
    let resultItems = this.getResultItems();
    return (
      <List>
        {resultItems}
      </List>
    );
  }
});
