import React, {Component} from "react";
import _ from 'lodash';
import {
  Table,
  TableRow,
  TableBody,
  TableRowColumn
} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import AuditUrlResultsDetails from './AuditUrlResultsDetails';
import {green700, red700} from "material-ui/styles/colors";

export default class AuditUrlResults extends Component {
  static propTypes = {
    results: React.PropTypes.array.isRequired,
    showFailsOnly: React.PropTypes.bool.isRequired
  };

  render() {
    const rows = _.chain(this.props.results)
      .filter(result => {
        if (this.props.showFailsOnly) {
          return !result.check;
        }
        return true;
        // return !this.props.showFailsOnly || !result.check;
      })
      .map(result => {
        return (
          <TableRow
            key={result.rule}
          >
            <TableRowColumn>
              {result.check ? (
                <FontIcon
                  className="material-icons"
                  style={styles.iconSuccess}
                >
                  check_box
                </FontIcon>) : (
                <FontIcon
                  className="material-icons"
                  style={styles.iconFail}
                >
                  check_box_outline_blank
                </FontIcon>)
              }
            </TableRowColumn>
            <TableRowColumn>
              {result.title}
            </TableRowColumn>
            <TableRowColumn>
              {result.details && (
                <AuditUrlResultsDetails details={result.details}/>
              )}
            </TableRowColumn>
          </TableRow>
        );
      })
      .flatten()
      .value();
    return (
      <Table selectable={false} multiSelectable={false} fixedHeader={false} style={styles.table}>
        <TableBody displayRowCheckbox={false} showRowHover={true}>
          {rows}
        </TableBody>
      </Table>
    );
  }
}

const styles = {
  checkCell: {
    // width: 1,
    paddingRight: 19
  },
  avatarCell: {
    width: 15,
    paddingLeft: 10
  },
  detailsCell: {
    width: 15,
    paddingRight: 30
  },
  iconSuccess: {
    verticalAlign: 'middle',
    color: green700
  },
  iconFail: {
    verticalAlign: 'middle',
    color: red700
  },
  cellExpand: {
    width: '99%'
  },
  table:
  {
    width: "auto", tableLayout: "auto"
  }
};
