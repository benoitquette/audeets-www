import React, {Component} from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class DashboardButton extends Component {
  static propTypes = {
    navigateToCreateProject: React.PropTypes.node.isRequired
  };

  render() {
    return (
      <FloatingActionButton
        secondary={true}
        style={styles.fab}
        containerElement={this.props.navigateToCreateProject}
        >
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
};
