import * as t from './actionTypes';
import Promise from "bluebird";
import {connect} from "@modules/search";
import _ from "lodash";
import rawQuery from "json!./searches/audit.json";

export const fetchAudit = (id, date) => ({
  type: t.FETCH_AUDIT,
  payload: new Promise((resolve, reject) => {
    const dateFloor = date.toDate();
    const dateCeiling = date.add(1, 'days').toDate();
    const query = _.chain(rawQuery)
      .set('body.query.bool.must[0].term.project', id)
      .set('body.query.bool.must[1].range.timestamp.gte', dateFloor)
      .set('body.query.bool.must[1].range.timestamp.lte', dateCeiling)
      .value();
    connect((err, client) => {
      if (err) return reject(err);
      client.search(query)
        .then(res => {
          resolve(_.map(res.hits.hits, hit => hit._source));
        })
        .catch(err => reject(err));
    });
  })
});
