import React, {Component} from "react";
import {TableHeader, TableRow, TableHeaderColumn} from 'material-ui/Table';

export default class LogListHeader extends Component {
  static propTypes = {
    shrinkStyle: React.PropTypes.object.isRequired,
    expandStyle: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
        <TableRow>
          <TableHeaderColumn style={this.props.shrinkStyle}></TableHeaderColumn>
          <TableHeaderColumn style={this.props.shrinkStyle}>
            URLs
          </TableHeaderColumn>
          <TableHeaderColumn style={this.props.expandStyle}>
            Timestamp
          </TableHeaderColumn>
          <TableHeaderColumn style={this.props.expandStyle}>
            Categories
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }
}
