import React, {Component} from "react";
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';

export default class ProjectToolbar extends Component {
  static propTypes = {
    categories: React.PropTypes.array.isRequired,
    setPeriod: React.PropTypes.func.isRequired,
    rollingPeriod: React.PropTypes.number.isRequired,
    navigateToLog: React.PropTypes.object.isRequired,
    rollingChartsConf: React.PropTypes.object.isRequired
  };

  onRollingPeriodChange(e, index, value) {
    this.props.setPeriod(value);
  }

  render() {
    const categoryFilter = _.map(this.props.categories, category => {
      return (
        <MenuItem
          key={category}
          value={category}
          primaryText={_.capitalize(category)}
        />
      );
    });
    const rollingFilter = _.map(this.props.rollingChartsConf, (item, index) => {
      return (
        <MenuItem
          key={index} value={item.id}
          primaryText={item.label}
        />
      );
    });

    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
        </ToolbarGroup>
        <ToolbarGroup>
          <DropDownMenu value={0}>
            <MenuItem key={0} value={0} primaryText="All Categories" />
            {categoryFilter}
          </DropDownMenu>
          <DropDownMenu
            value={this.props.rollingPeriod}
            onChange={this.onRollingPeriodChange.bind(this)}
          >
            {rollingFilter}
          </DropDownMenu>
          <RaisedButton
            label="Audits Log"
            primary={true}
            containerElement={this.props.navigateToLog}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const styles = {
  toolbar: {
    paddingLeft: 55,
    paddingRight: 10
  }
};
