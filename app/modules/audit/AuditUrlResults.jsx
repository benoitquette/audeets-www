import React, {Component} from "react";
import _ from 'lodash';
import {
  Table,
  TableRow,
  TableBody,
  TableRowColumn
} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
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
        // const rules = _.max(results, result => {
        //   return moment(result.timestamp).valueOf();
        // });
        return results.map(result => {
          return (
            <TableRow key={result.rule}>
              <TableRowColumn style={styles.cellShrink}>
                {result.check && (
                  <FontIcon className="material-icons">done</FontIcon>
                )}
              </TableRowColumn>
              <TableRowColumn style={styles.cellExpand}>
                <ChipsList items={[result.category]}>
                  <span style={styles.title}>{result.title}</span>
                </ChipsList>
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
  title: {
    paddingLeft: 10,
    verticalAlign: 'middle',
    lineHeight: '300%'
  },
  cellShrink: {
    width: 1
  },
  cellExpand: {
    width: '99%'
  }
};
