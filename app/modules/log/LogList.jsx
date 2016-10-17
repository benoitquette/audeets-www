import React, {Component} from "react";
import {Table, TableBody} from 'material-ui/Table';
import LogListHeader from './LogListHeader';
import _ from 'lodash';

export default class LogList extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func.isRequired
  };

  onCellClick(r, c, e) {
    console.log('in log list');
    // this.props.onClick(r, c, e);
  }

  render() {
    // clone the children for immutability
    // and insert a few styling props
    let items = [];
    if (!_.isEmpty(this.props.children)) {
      items = _.map(this.props.children, child => {
        let clone = _.cloneDeep(child);
        clone.props = {
          ...child.props,
          shrinkStyle: styles.cellShrink,
          expandStyle: styles.cellExpand
        };
        return clone;
      });
    }
    return (
        <Table selectable={false} onCellClick={this.onCellClick}>
          <LogListHeader
            shrinkStyle={styles.cellShrink}
            expandStyle={styles.cellExpand}
          />
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {items}
          </TableBody>
        </Table>
    );
  }
}

const styles = {
  cellShrink: {
    width: 1
  },
  cellExpand: {
    width: '48%'
  }
};
