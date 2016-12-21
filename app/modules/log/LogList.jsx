import React, {Component} from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableRowColumn
} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import ChipsList from '@components/ChipsList';

export default class LogList extends Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  onCellClick() {
    console.log('in log list');
    // this.props.onClick(r, c, e);
  }

  render() {
    // clone the children for immutability
    // and insert a few styling props
    let items = this.props.items.map(item => {
      return (
        <TableRow key={item.shortDate} style={styles.row}>
          <TableRowColumn
            data-key={item.shortDate}
            style={styles.cellShrink}
          >
            {item.multipleAuditsWarning && (
                <FontIcon className="material-icons">info</FontIcon>
              )}
          </TableRowColumn>
          <TableRowColumn
            data-key={item.shortDate}
            style={styles.cellShrink}
          >
            {item.urlCount}
          </TableRowColumn>
          <TableRowColumn
            data-key={item.shortDate}
            style={styles.cellExpand}
          >
            {item.longDate}
          </TableRowColumn>
          <TableRowColumn
            data-key={item.shortDate}
            style={styles.cellExpand}
          >
            <ChipsList
              items={item.categories}
              dataKey={item.shortDate}
              onClick={this.props.onClick}
            />
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
        <Table selectable={true} onCellClick={this.props.onClick}>
           <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={styles.shrinkStyle}/>
              <TableHeaderColumn style={styles.shrinkStyle}>
                URLs
              </TableHeaderColumn>
              <TableHeaderColumn style={styles.expandStyle}>
                Timestamp
              </TableHeaderColumn>
              <TableHeaderColumn style={styles.expandStyle}>
                Categories
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
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
  },
  row: {
    cursor: 'pointer'
  }
};
