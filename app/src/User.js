import React, { Component } from 'react';

class User extends Component {
  render () {
    return (
      <div>{ this.props.name } : { this.props.title }</div>
    )
  }
}

export default User;
