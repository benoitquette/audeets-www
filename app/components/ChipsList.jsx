import React, {Component} from "react";
import Chip from 'material-ui/Chip';
import _ from 'lodash';

export default class ChipsList extends Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    children: React.PropTypes.node,
    dataKey: React.PropTypes.string,
    onClick: React.PropTypes.func
  };

  render() {
    const chips = this.props.items.map(item => {
      return (
        <Chip
          key={item}
          style={styles.chip}
          data-key={this.props.dataKey}
          onTouchTap={this.props.onClick}
        >
          {item}
        </Chip>
      );
    });
    return (
      <div style={styles.wrapper} data-key={this.props.dataKey}>
        {chips}
        {!_.isNil(this.props.children) &&
          React.cloneElement(this.props.children, {})}
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 4
  }
};
