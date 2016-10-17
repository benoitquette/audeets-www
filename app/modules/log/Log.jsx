import React, {Component} from "react";
import Canvas from "@components/Canvas";
import {connect} from "react-redux";
import LogToolbar from './LogToolbar';
import _ from 'lodash';
import moment from 'moment';
import {fetchResults} from './actions';
import {withRouter} from 'react-router';
import constants from '@modules/constants';
import LogListItem from './LogListItem';
import LogList from './LogList';

@withRouter
@connect(state => ({
  results: state.log.list
}), {fetchResults})
export default class Log extends Component {
  static propTypes = {
    results: React.PropTypes.array.isRequired,
    params: React.PropTypes.object.isRequired,
    fetchResults: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired
  };

  componentWillMount() {
    const projectId = this.props.params.projectId;
    this.props.fetchResults(projectId);
  }

  onCellClick(rowNumber, columnKey, e) {
    const date = e.target.dataset.key;
    this.onClick(date);
  }

  onClick(date) {
    const projectId = this.props.params.projectId;
    this.props.router.push(`/console/${projectId}/${date}`);
  }

  render() {
    // first, we group by date because we want to show one row per date
    const resultsByDate = _.groupBy(this.props.results, result => {
      return moment(result.timestamp).format(constants.shortDateFormat);
    });
    const items = _.map(resultsByDate, results => {
      // if we have more than one audit on one date, we take the last one
      const date = _.max(results, result => {
        return moment(result.timestamp).valueOf();
      }).timestamp;
      const shortDate = moment(date).format(constants.shortDateFormat);
      const longDate = moment(date).format(constants.longDateFormat);
      // we take the list of categories for each results....
      const categoriesList = _.map(results, result => {
        return result.category;
      });
      // and we deduplicate it. That will allow us to keep track of a date
      // when multiple audits were done and flag it to the user
      const categories = _.uniq(categoriesList);
      // final date: the number of URLs crawled
      const urlCount = Object.keys(_.groupBy(results, result => {
        return result.url;
      })).length;
      return (
        <LogListItem
          key={shortDate}
          shortDate={shortDate}
          longDate={longDate}
          urlCount={urlCount}
          multipleAuditsWarning={categories.length !== categoriesList.length}
          onClick={this.onClick.bind(this, shortDate)}
          categories={categories}
        />
      );
    });
    const toolbar = (
      <LogToolbar/>
    );
    return (
      <Canvas toolbar={toolbar} drawerOpen={this.props.drawerOpen}>
        <LogList onClick={this.onCellClick.bind(this)}>
          {items}
        </LogList>
      </Canvas>
    );
  }
}
