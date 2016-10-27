import * as t from './actionTypes';
import Promise from "bluebird";
import {connect} from "@modules/search";
import _ from "lodash";
import rawQuery from "json!./searches/auditsList.json";

export const fetchAuditsList = id => ({
  type: t.FETCH_AUDITS_LIST,
  payload: new Promise((resolve, reject) => {
    const query = _.set(rawQuery,
      'body.query.filtered.query.match.project', id);
    connect((err, client) => {
      if (err) return reject(err);
      client.search(query)
        .then(res => {
          const categories = res.aggregations.categories.buckets;
          resolve(_.reduce(categories, (result, cat) => {
            return _.concat(result, _.map(cat.day.buckets, day => {
              return {
                timestamp: new Date(day.key_as_string),
                category: cat.key
              };
            }));
          }, []));
        });
    });
  })
});
