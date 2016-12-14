import React, {Component} from "react";
import Canvas from "@components/Canvas";
import {connect} from "react-redux";
import AuditUrl from './AuditUrl';
import AuditToolbar from './AuditToolbar';
import _ from 'lodash';
import {fetchAudit} from './actions';

@connect(state => ({
  results: state.audit.list
}), {fetchAudit})
export default class Audit extends Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    results: React.PropTypes.array.isRequired,
    fetchAudit: React.PropTypes.func.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired
  };

  componentWillMount() {
    const params = this.props.params;
    const projectId = params.projectId;
    const date = params.date;
    this.props.fetchAudit(projectId, date);
  }

  render() {
    const resultsPerUrl = _.chain(this.props.results)
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
