const neo4j = require('../conf/neo4j');
const pubsub = require('./pubsub');

module.exports = {
  Query: {
    allUsers: async () => {
      let query = `MATCH (u:User) return u`;
      let users = neo4j.getProperties(await neo4j.execute(query, {}), 'u');
      return users;
    },
    User: async (_, data) => {
      let query = 'MATCH (u:User {';
      for (let key in data) {
        query += `${key}: {${key}},`;
      }
      query = query.slice(0, -1);
      query += '}) return u';
      let users = neo4j.getProperties(await neo4j.execute(query, data), 'u');
      return users;
    }
  },
  Mutation: {
    addUser: async (_, data) => {
      let query = `CREATE (u:User { name: { name }, title: { title } }) RETURN u`;
      let newUser = neo4j.getProperties(await neo4j.execute(query, data), 'u');
      pubsub.publish('User', {User: { mutation: 'CREATED', node: newUser[0] }});
      return newUser.length > 0 ? newUser[0] : [];
    }
  },
  Subscription: {
    User: {
      subscribe: () => pubsub.asyncIterator('User')
    }
  }
}
