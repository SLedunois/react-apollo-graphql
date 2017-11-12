const express =require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const neo4j = require('./conf/neo4j');

const schema = require('./graphql/schema');

const app = express();

neo4j.init('bolt://127.0.0.1:7687', 'neo4j', 'password');

const server = createServer(app);

const wsServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

wsServer.listen(5000, () => console.log('Websocket Server running on ws://localhost:5000/subscriptions'))

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: wsServer,
    path: '/subscriptions',
  },
);

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: '/subscriptions'
}));

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
