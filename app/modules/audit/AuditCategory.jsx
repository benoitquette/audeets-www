import React, {Component} from "react";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import AuditUrlResults from './AuditUrlResults';

export default class AuditCategory extends Component {
  static propTypes = {
    categoryName: React.PropTypes.string.isRequired,
    results: React.PropTypes.array.isRequired,
    showFailsOnly: React.PropTypes.bool.isRequired
  };

  render() {
    return (
      <Card
        style={styles.card}
        expandable={false}
      >
        <CardHeader
          title={this.props.categoryName}
          subtitle="not sure what we can put here..."
          actAsExpander={false}
          showExpandableButton={false}
          avatar={
            <Avatar
              style={styles.avatar}
            >
              {this.props.categoryName.charAt(0).toUpperCase()}
            </Avatar>
          }
        />
        <CardText
          expandable={false}
        >
          <div id={this.props.categoryName}>
            <AuditUrlResults
              results={this.props.results}
              showFailsOnly={this.props.showFailsOnly}
            />
          </div>
        </CardText>
      </Card>
    );
  }
}

const styles = {
  card: {
    margin: 25
  },
  avatar: {
  }
};
