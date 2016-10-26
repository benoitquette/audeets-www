import * as t from './actionTypes';
import Promise from "bluebird";
import client from "@modules/SearchClient";
import _ from "lodash";
import rawQuery from "json!./searches/auditsList.json";

export const fetchAuditsList = id => ({
  type: t.FETCH_AUDITS_LIST,
  payload: new Promise(resolve => {
    const query = _.set(rawQuery,
      'body.query.filtered.query.match.project', id);
    client.search(query)
      .then(res => {
        resolve(_.reduce(res.aggregations.categories.buckets, (result, cat) => {
          return _.concat(result, _.map(cat.day.buckets, day => {
            return {
              timestamp: new Date(day.key_as_string),
              category: cat.key
            };
          }));
        }, []));
      });
  })
});
