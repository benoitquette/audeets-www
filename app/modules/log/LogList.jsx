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

  onChipsClick(e) {
    const date = e.target.parentElement.dataset.key;
    this.props.onClick(date);
  }

  onTableClick(rowNumber, columnKey, e) {
    const date = e.target.dataset.key;
    this.props.onClick(date);
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
              onClick={this.onChipsClick.bind(this)}
            />
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
        <Table
          selectable={true}
          onCellClick={this.onTableClick.bind(this)}
          fixedHeader={false}
          style={styles.table}
        >
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
  table: {
    tableLayout: 'auto'
  },
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
