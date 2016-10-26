import elasticsearch from "elasticsearch";
import config from "./../../config/config.json";

export default new elasticsearch.Client({
  host: config.elasticsearch.connect,
  log: config.elasticsearch.log
});
