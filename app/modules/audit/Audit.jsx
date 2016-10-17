import React, {Component} from "react";
import Canvas from "@components/Canvas";
import {connect} from "react-redux";
import AuditUrl from './AuditUrl';
import AuditToolbar from './AuditToolbar';
import _ from 'lodash';
import {fetchResults} from './actions';
import moment from 'moment';

@connect(state => ({
  results: state.audit.list
}), {fetchResults})
export default class Audit extends Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    results: React.PropTypes.array.isRequired,
    fetchResults: React.PropTypes.func.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired
  };

  componentWillMount() {
    const params = this.props.params;
    const projectId = params.projectId;
    this.props.fetchResults(projectId);
  }

  render() {
    const params = this.props.params;
    const date = params.date;
    const dateFilter = moment(date);
    const resultsPerUrl = _.chain(this.props.results)
      .filter(result => {
        // let's filter the results by the required date
        return moment(result.timestamp).isSame(dateFilter, 'date');
      })
      .groupBy(result => {
        // now we group per URL
        return result.url;
      })
      .map(results => {
        // and we render each URL resultset
        return (
          <AuditUrl
            key={results[0].url}
            url={results[0].url}
            results={results}
            />
        );
      }).value();
    const urls = _.chain(this.props.results)
      .map(result => {
        return result.url;
      })
      .uniq()
      .value();
    const toolbar = (
      <AuditToolbar
        urls={urls}
        />
    );
    return (
      <Canvas toolbar={toolbar} drawerOpen={this.props.drawerOpen}>
        {resultsPerUrl}
      </Canvas>
    );
  }
}
