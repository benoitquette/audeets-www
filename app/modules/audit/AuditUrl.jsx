import React, {Component} from "react";
import {Card} from 'material-ui/Card';
import AuditUrlResults from './AuditUrlResults';
import Subheader from 'material-ui/Subheader';

export default class AuditUrl extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    results: React.PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        <Subheader>{this.props.url}</Subheader>
        <Card
          style={styles.card}
          expanded={true}
          onExpandChange={this.handleExpandChange}>
          <AuditUrlResults results={this.props.results}/>
        </Card>
      </div>
    );
  }
}

const styles = {
  card: {
    marginBottom: 30
  }
};
