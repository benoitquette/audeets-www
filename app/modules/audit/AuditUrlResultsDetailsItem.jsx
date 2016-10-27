import React, {Component} from "react";
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import Text from '@components/Text';

export default class AuditUrlResultsDetailsItem extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    link: React.PropTypes.string,
    urls: React.PropTypes.array
  };

  render() {
    return (
      <div key={this.props.text}>
        <Text>{this.props.text}</Text>
        {this.props.urls && (
          <ul style={styles.list}>
            {_.map(this.props.urls, url => {
              return (
                <li key={url.text}>{url.text}</li>
              );
            })
            }
          </ul>
        )}
        {this.props.link && (
          <RaisedButton
            label="More Details"
            labelPosition="before"
            primary={true}
            href={this.props.link}
            style={styles.button}
          />
        )}
      </div>
    );
  }
}

const styles = {
  list: {
    fontSize: 13
  },
  button: {
    marginLeft: 20
  }
};
