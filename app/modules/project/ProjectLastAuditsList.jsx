import React, {Component} from "react";
import ProjectLastAuditsListItem from './ProjectLastAuditsListItem';
import moment from "moment";

export default class ProjectLastAuditsList extends Component {
  static propTypes = {
    audits: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  render() {
    const items = this.props.audits.map(dateString => {
      const date = moment(dateString);
      return (
        <ProjectLastAuditsListItem
          key={date}
          date={date}
          onClick={() => this.props.onClick(date)}
        />
      );
    });
    return (
      <div>{items}</div>
    );
  }
}
