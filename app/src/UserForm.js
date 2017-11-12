import React, { Component } from 'react';
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

class UserForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            name: '',
            title: ''
        }

        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleChange = this._handleChange.bind(this);
        this.createUser = this._createUser.bind(this);
    }

    _handleSubmit (event) {
        event.preventDefault();
        this.createUser();
    }

    _handleChange (event) {
        this.newState = {
            name: this.state.name,
            title: this.state.title
        }
        this.newState[event.target.name] = event.target.value;
        this.setState(this.newState);
    }

    async _createUser () {
        const { name, title } = this.state;
        await this.props.createUserMutation({
            variables: {
                name,
                title
            }
        });
        this.props.handler({ edition: false });
    }

    render () {
        return (
            <form onSubmit={ this.handleSubmit }>
                <input type="text" 
                    placeholder="Nom"
                    name="name"
                    value={ this.state.name }
                    onChange={ this.handleChange }/>
                <input type="text"
                    placeholder="Titre"
                    name="title"
                    value={ this.state.title }
                    onChange={ this.handleChange }/>
                <input type="submit" value="Créer" />
            </form>
        )
    }
}

const createUserMutation = gql`
    mutation createUserMutation($name: String!, $title: String!) {
        addUser(
            name: $name,
            title: $title
        ) {
            name
            title
        }
    }
`

export default graphql(createUserMutation, { name: 'createUserMutation' })(UserForm);