import elasticsearch from "elasticsearch";
import config from "json!@config/config.json";

export default new elasticsearch.Client({
  host: config.elasticsearch.connect,
  log: config.elasticsearch.log
});
