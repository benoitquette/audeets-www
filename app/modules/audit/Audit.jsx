import React, {Component} from "react";
import Canvas from "@components/Canvas";
import {connect} from "react-redux";
import AuditCategory from './AuditCategory';
import AuditToolbar from './AuditToolbar';
import _ from 'lodash';
import {
  fetchAudit,
  setUrls,
  setFilterUrl,
  setShowFailsOnly
} from './actions';
import {withRouter} from 'react-router';

@withRouter
@connect(state => ({
  results: state.audit.list,
  urls: state.audit.urls,
  filterUrl: state.audit.filterUrl,
  showFailsOnly: state.audit.showFailsOnly
}), {
  fetchAudit,
  setUrls,
  setFilterUrl,
  setShowFailsOnly
})
export default class Audit extends Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
    results: React.PropTypes.array.isRequired,
    urls: React.PropTypes.array,
    filterUrl: React.PropTypes.string,
    setUrls: React.PropTypes.func.isRequired,
    fetchAudit: React.PropTypes.func.isRequired,
    setFilterUrl: React.PropTypes.func.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired,
    setShowFailsOnly: React.PropTypes.func.isRequired,
    showFailsOnly: React.PropTypes.bool.isRequired,
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    // first, we fetch all the audits
    const params = this.props.params;
    const projectId = params.projectId;
    const date = params.date;
    this.props.fetchAudit(projectId, date);
  }

  onUrlFilterChanged = url => {
    this.props.setFilterUrl(url);
  }

  navigateToProject() {
    const params = this.props.params;
    const projectId = params.projectId;
    const router = this.props.router;
    router.push(`/console/${projectId}`);
  }

  render() {
    const toolbar = (
      <AuditToolbar
        urls={this.props.urls}
        urlFilterSelected={this.onUrlFilterChanged}
        selectedUrl={this.props.filterUrl}
        setShowFailsOnly={this.props.setShowFailsOnly}
        showFailsOnly={this.props.showFailsOnly}
        navigateToProject={this.navigateToProject.bind(this)}
      />
    );

    // now we can create a card for each category
    const resultsPerCategory = _.chain(this.props.results)
      .filter(result => {
        return result.url === this.props.filterUrl;
      })
      .sortBy(result => {
        return result.category + result.rule;
      })
      .groupBy(result => {
        return result.category;
      })
      .map(results => {
        const categoryName = results[0].category;
        return (
          <AuditCategory
            key={categoryName}
            categoryName={categoryName}
            results={results}
            showFailsOnly={this.props.showFailsOnly}
            />
        );
      }).value();

    return (
      <Canvas
        toolbar={toolbar}
        drawerOpen={this.props.drawerOpen}
      >
        {resultsPerCategory}
      </Canvas>
    );
  }
}
