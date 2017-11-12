import React, { Component } from 'react';
import User from './User';
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

class UserList extends Component {

  constructor (props) {
    super(props);
    this.subscribeToNewUser = this._subscribeToNewUser.bind(this);
    this.subscribeToNewUser();
  }

  _subscribeToNewUser () {
    this.props.allUsersQuery.subscribeToMore({
      document: newUserScubscription,
      updateQuery: (previous, { subscriptionData }) => {
          const allUsers = [
            ...previous.allUsers,
            subscriptionData.User.node
          ]
          return { allUsers };
      }
    })
  }

  render () {

    if (this.props.allUsersQuery && this.props.allUsersQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allUsersQuery && this.props.allUsersQuery.error) {
      return <div>Error</div>
    }

    const users = this.props.allUsersQuery.allUsers;

    return (
        <div>
          {
            users.map((user, index) => (
              <User key={ index }
                name={ user.name }
                title={ user.title } />
            ))
          }
        </div>
    )
  }
}

const allUsersQuery = gql`
  query AllUsersQuery {
    allUsers {
      name
      title
    }
  }
`;

const newUserScubscription = gql`
  subscription {
    User(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        name
        title
      }
    }
  }
`;

export default graphql(allUsersQuery, { name: 'allUsersQuery' }) (UserList);
