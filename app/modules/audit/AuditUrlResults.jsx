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
import ChipsList from '@components/ChipsList';

export default class AuditUrlResults extends Component {
  static propTypes = {
    results: React.PropTypes.array.isRequired
  };

  render() {
    const rows = _.chain(this.props.results)
      .groupBy(result => {
        return result.category;
      })
      .map(results => {
        return results.map(result => {
          return (
            <TableRow key={result.rule}>
              <TableRowColumn style={styles.avatarCell}>
                <ChipsList items={[result.category.charAt(0).toUpperCase()]}/>
              </TableRowColumn>
              <TableRowColumn style={styles.checkCell}>
                {result.check && (
                  <FontIcon
                    className="material-icons"
                    style={styles.icon}>done</FontIcon>
                )}
              </TableRowColumn>
              <TableRowColumn style={styles.cellExpand}>
                <span style={styles.title}>{result.title}</span>
              </TableRowColumn>
              <TableRowColumn style={styles.detailsCell}>
                {result.details && (
                  <AuditUrlResultsDetails details={result.details}/>
                )}
              </TableRowColumn>
            </TableRow>
          );
        });
      })
      .flatten()
      .value();
    return (
      <Table selectable={false} multiSelectable={true}>
        <TableBody displayRowCheckbox={false} showRowHover={true}>
          {rows}
        </TableBody>
      </Table>
    );
  }
}

const styles = {
  checkCell: {
    width: 1,
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
  icon: {
    verticalAlign: 'middle'
  },
  cellExpand: {
    width: '99%'
  }
};
