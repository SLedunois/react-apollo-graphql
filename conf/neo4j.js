const neo4j = require('neo4j-driver').v1;

const neo4jUtils = {
  driver: null,
  init: (url, username, password) => {
    neo4jUtils.driver = neo4j.driver(url, neo4j.auth.basic(username, password));
    neo4jUtils.driver.close();
  },
  execute: async (query, params, callback) => {
    let session = neo4jUtils.driver.session();
    let result = await session.run(query, params)
    return result;
  },
  getProperties: (data, key) => {
    let results = [];
    data.records.map(record => results.push(record.get(key).properties));
    return results;
  }
}

module.exports = neo4jUtils;
