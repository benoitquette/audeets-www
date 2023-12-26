import React, {useEffect} from "react";
import Canvas from "@components/Canvas";
import _ from 'lodash';
import moment from 'moment';
import {fetchAuditsList} from './actions';
import {withRouter} from 'react-router-dom';
import constants from '@modules/constants';
import LogList from './LogList';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from "react-redux";

function Log(props) {
  const dispatch = useDispatch();
  const results = useSelector(state => state.log.list)
  const projectId = props.match.params.projectId;
  const {drawerOpen} = useSelector(state => state.console)

  useEffect(() => {
    dispatch(fetchAuditsList(projectId));
  }, [projectId]);

  // first, we group by date because we want to show one row per date
  const items = _.chain(results)
    .groupBy(result => {
      return moment(result.timestamp).format(constants.shortDateFormat);
    })
    .map(results => {
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
      return ({
        shortDate,
        longDate,
        urlCount,
        multipleAuditsWarning: categories.length !== categoriesList.length,
        categories
      });
    })
    .reverse()
    .value();
  return (
    <Canvas drawerOpen={drawerOpen}>
      <LogList
        items={items}
        getOnClickUrl={(date) => {
          return `/console/${projectId}/${date}`;
        }}
      />
    </Canvas>
  )
}

Log.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(Log);
