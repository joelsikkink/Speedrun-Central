import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header, Icon, Divider, Button, Form, Input, Table, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profile.js';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            ready: false,
            username: '',
            image: '',
            email: '',
            password: '',
            oldPassword: '',
            submittedUsername: '',
            submittedEmail: '',
            submittedImage: '',
        };
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.updateState = this.updateState.bind(this);
        this.initialStates = this.initialStates.bind(this);
    }

    edit() {
        this.setState({
            editing: true,
        });
    }

    save() {
        this.setState({
            editing: false,
        });
    }

    updateState(e, { name, value }) {
        this.setState({ [name]: value });
    }

    initialStates() {
        const username = this.props.profile.username;
        const image = this.props.profile.image;
        const email = Meteor.user().emails[0].address;
        this.setState({
            username: username,
            image: image,
            email: email,
            submittedUsername: username,
            submittedImage: image,
            submittedEmail: email,
        })
    }

    submitInfo() {
        const { username, email, password, oldPassword } = this.state;
        const id = this.props.profile._id;
        this.setState({
            submittedUsername: username,
            submittedEmail: email,
        });

        Profiles.update(id, {
            $set: {
                username: username,
                owner: email,
            },
        },
        (err) => {
            if (err) {
              this.setState({ error: err.reason });
            } else {
              this.setState({ error: '', redirectToReferer: true });
            }});
        Meteor.users.update(this.props.currentId, {
            $set: {
                'emails.0.address': email,
            },
        });
        if (password === '' && oldPassword === '') {
            // do nothing
        } else {
            Accounts.changePassword(oldPassword, password, function (error) {
                if (!error) {
                    // do nothing
                } else {
                    console.log(`${error.message}`);
                }
            });
        }
        this.setState({
            password: '',
            oldPassword: '',
        });
        return this.save();
    }

    render() {
        if (!this.state.ready && this.props.ready) {
            this.initialStates();
            this.setState({
                ready: true,
            });
        }
        return (this.props.ready) ? this.renderPage() :
            <Container>
                <Loader active>Getting data</Loader>
            </Container>
    }

    renderPage() {
        const { username, email, image } = this.state;
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Container>
                            <Header as='h2'>
                                <Icon name='settings' />
                                <Header.Content>
                                    Account Settings
                                    <Header.Subheader>
                                        Manage your account information
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            {this.state.editing ? (
                                <div>
                                    <Form onSubmit={this.submitInfo}>
                                        <Form.Field>
                                            <label style={{ float: 'left', fontSize: '1em' }}>Username:</label>
                                            <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px' }}>
                                                <Input fluid
                                                    name={'username'}
                                                    value={username}
                                                    onChange={this.updateState}
                                                />
                                            </span>
                                        </Form.Field>
                                        <Form.Field>
                                            <label style={{ float: 'left', fontSize: '1em' }}>Email:</label>
                                            <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px' }}>
                                                <Input fluid
                                                    name={'email'}
                                                    value={email}
                                                    onChange={this.updateState}
                                                />
                                            </span>
                                        </Form.Field>
                                        <Form.Field>
                                            <label style={{ float: 'left', fontSize: '1em' }}>Old Password:</label>
                                            <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px' }}>
                                            <Input fluid transparent
                                                type={'password'}
                                                name={'oldPassword'}
                                                value={oldPassword}
                                                onChange={this.updateState}
                                            />
                                            </span>
                                        </Form.Field>
                                        <Form.Field>
                                            <label style={{ float: 'left', fontSize: '1em' }}>New Password:</label>
                                            <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px' }}>
                                            <Input fluid transparent
                                                type={'password'}
                                                name={'password'}
                                                value={password}
                                                onChange={this.updateState}
                                            />
                                            </span>
                                        </Form.Field>
                                        <Divider/>
                                        <Form.Button floated='right' content={'Save Changes'} basic color={'green'} />
                                    </Form>
                                </div>
                            )
                            : (
                                <div>
                                    <p>
                                    <span style={{ fontWeight: 'bold' }}>
                                        Username: </span>
                                    {this.state.submittedUsername}
                                    </p>
                                    <p>
                                    <span style={{ fontWeight: 'bold' }}>
                                        Email: </span>
                                    {this.state.submittedEmail}
                                    </p>
                                    <Divider/>
                                    <Button floated='right' onClick={this.edit} basic>
                                        <Icon name="pencil alternate"/> Edit Profile
                                    </Button>
                            </div>
                            )}
                        </Container>
                    </Grid.Row>
                    <Grid.Row>
                        <Container>
                            <Header as="h2" textAlign="center">Submitted Runs</Header>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Game</Table.HeaderCell>
                                        <Table.HeaderCell>Run</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                            </Table>
                        </Container>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

UserPage.propTypes = {
    profile: PropTypes.object,
    currentId: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
}

export default withTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    return {
      profile: Profiles.collection.find({}).fetch()[0],
      currentId: Meteor.user() ? Meteor.userId() : '',
      ready: subscription.ready(),
    };
})(UserPage);