import React, {Component} from "react";
import {TableRow, TableRowColumn} from 'material-ui/Table';
import ChipsList from '@components/ChipsList';
import FontIcon from 'material-ui/FontIcon';

export default class LogListItem extends Component {
  static propTypes = {
    shrinkStyle: React.PropTypes.object,
    expandStyle: React.PropTypes.object,
    shortDate: React.PropTypes.string.isRequired,
    longDate: React.PropTypes.string.isRequired,
    urlCount: React.PropTypes.number.isRequired,
    multipleAuditsWarning: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    categories: React.PropTypes.array.isRequired
  };

  render() {
    return (
      <TableRow key={this.props.shortDate} style={styles.row}>
        <TableRowColumn
          data-key={this.props.shortDate}
          style={this.props.shrinkStyle}
        >
          {this.props.multipleAuditsWarning && (
              <FontIcon className="material-icons">info</FontIcon>
            )}
        </TableRowColumn>
        <TableRowColumn
          data-key={this.props.shortDate}
          style={this.props.shrinkStyle}
        >
          {this.props.urlCount}
        </TableRowColumn>
        <TableRowColumn
          data-key={this.props.shortDate}
          style={this.props.expandStyle}
        >
          {this.props.longDate}
        </TableRowColumn>
        <TableRowColumn
          data-key={this.props.shortDate}
          style={this.props.expandStyle}
        >
          <ChipsList
            items={this.props.categories}
            dataKey={this.props.shortDate}
            onClick={this.props.onClick}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

const styles = {
  row: {
    cursor: 'pointer'
  }
};
