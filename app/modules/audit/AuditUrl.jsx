import React, {Component} from "react";
import {Card, CardHeader} from 'material-ui/Card';
import AuditUrlResults from './AuditUrlResults';

export default class AuditUrl extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    results: React.PropTypes.array.isRequired
  };

  render() {
    return (
      <Card
        style={styles.card}
        expanded={true}
        onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.url}
          actAsExpander={false}
          showExpandableButton={false}
          />
        <AuditUrlResults results={this.props.results}/>
      </Card>
    );
  }
}

const styles = {
  card: {
    marginBottom: 30
  }
};
