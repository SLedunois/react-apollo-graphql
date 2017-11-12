const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolver');

const typeDefs = [`
  type User {
    name: String
    title: String
  }

  type Query {
    allUsers: [User]!
    User(name: String, title: String): [User]!
  }
`,
`
  type Mutation {
    addUser(name: String!, title: String!): User!
  }
`,
`
  type Subscription {
    User(filter: UserSubscriptionFilter): UserSubscriptionPayload
  }

  input UserSubscriptionFilter {
    mutation_in: [_ModelMutationType!]
  }

  type UserSubscriptionPayload {
    mutation: _ModelMutationType!
    node: User
  }

  enum _ModelMutationType {
    CREATED
    UPDATED
    DELETED
  }
`
]

module.exports = makeExecutableSchema({ typeDefs, resolvers });
