import React, { Component } from 'react';
import UserList from './UserList';
import Userform from './UserForm';

class Container extends Component {

    constructor () {
        super();
        this.state = { edition: false };
        this.openUserCreation = this._openUserCreation.bind(this);
        this.handler = this._handler.bind(this);
    }

    _openUserCreation () {
        this.setState({ edition: true });
    }

    _handler (newStateProperties) {
        const newState = this.state;
        for (let key in newStateProperties) {
            newState[key] = newStateProperties[key];
        }
        this.setState(newState);
    }

    render () {
        return (
            <div>
                <h1>GraphQL - React - Node - Neo4j Application</h1>
                <header>
                    <button onClick={ this.openUserCreation }>
                        Ajouter un utilisateur
                    </button>
                </header>
                {
                    this.state.edition
                        ? <Userform handler={ this.handler }/>
                        : <UserList />
                }
            </div>
        )
    }
}

export default Container;