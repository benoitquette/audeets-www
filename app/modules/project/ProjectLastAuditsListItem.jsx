import React, {Component} from "react";
import moment from 'moment';
import constants from '@modules/constants';

export default class ProjectLastAuditsListItem extends Component {
  static propTypes = {
    date: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  render() {
    const dateString = moment(this.props.date).format(constants.longDateFormat);
    return (
      <div>
        <a onClick={this.props.onClick}>{dateString}</a>
        <br/>
      </div>
    );
  }
}
