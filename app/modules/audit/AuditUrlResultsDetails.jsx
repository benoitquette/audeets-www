import React, {Component} from "react";
import _ from 'lodash';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import AuditUrlResultsDetailsItem from "./AuditUrlResultsDetailsItem";
import muiThemeable from 'material-ui/styles/muiThemeable';
import withWidth from "material-ui/utils/withWidth";
import grey500 from "material-ui/styles/colors";

@withWidth()
@muiThemeable()
export default class AuditUrlResultsDetails extends Component {
  static propTypes = {
    details: React.PropTypes.array.isRequired,
    muiTheme: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired
  };

  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const items = _.map(this.props.details, detail => {
      return (
        <AuditUrlResultsDetailsItem
          key={detail.text}
          text={detail.text}
          link={detail.link}
          urls={detail.urls}
        />
      );
    });
    return (
      <div>
        <IconButton style={styles.icon} onTouchTap={this.handleOpen}>
          <FontIcon
            className="material-icons"
          >
            info
          </FontIcon>
        </IconButton>
        <Dialog
          actions={[]}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div>
            {items}
          </div>
        </Dialog>

      </div>
    );
  }
}

const styles = {
  icon: {
    verticalAlign: 'middle',
    color: grey500
  }
};
