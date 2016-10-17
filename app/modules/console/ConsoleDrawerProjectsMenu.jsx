import React, {Component} from "react";
import ConsoleDrawerProjectsMenuItem from './ConsoleDrawerProjectsMenuItem';

export default class ConsoleDrawerProjectsMenu extends Component {
  static propTypes = {
    projects: React.PropTypes.array.isRequired,
    callback: React.PropTypes.func.isRequired
  };

  render() {
    const items = this.props.projects.map(function(project) {
      return (
        <ConsoleDrawerProjectsMenuItem
          title={project.title}
          key={project._id}
          style={styles.list}
          callback={() => {
            return this.props.callback(project._id);
          }}
        />
      );
    }, this);
    return (
      <div>{items}</div>
    );
  }
}

const styles = {
  list: {
    marginTop: 20
  }
};

