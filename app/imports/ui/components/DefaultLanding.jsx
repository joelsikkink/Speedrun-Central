import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Grid, Image, Icon, Form, Input, Divider, Checkbox, Button, Message } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

class DefaultLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        error: '',
        redirectToReferer: false
    }
    this.createUser = this.createUser.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  createUser() {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  updateState(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={'/add'}/>;
    }

    return (
        <div>
            <Container>
                <Grid>
                    <Grid.Row>
                        <Image
                            src='images/image-16by9.png'
                        />
                    </Grid.Row>

                    <Grid.Row>
                        <h2><Icon id="triangle-icon" fitted name='triangle right'/> Register Today!</h2>
                    </Grid.Row>

                    <Grid.Row>
                        <Form onSubmit={this.createUser}>
                            <Form.Field>
                                <label>Email</label>
                                <Input fluid name={'email'} placeholder='example@email.com' type={'email'} onChange={this.updateState} />
                            </Form.Field>

                            <Divider inverted />

                            <Form.Field>
                                <label>Password</label>
                                <Input fluid name={'password'} type={'password'} placeholder='' onChange={this.updateState}/>
                            </Form.Field>

                            <Divider inverted />

                            <Form.Field>
                                <Checkbox label='I agree to the Terms and Conditions.' />
                            </Form.Field>

                            <Button type='submit'>Submit</Button>
                        </Form>
                        {this.state.error === '' ? (
                        ''
                        ) : (
                        <Message
                            error
                            header="Registration was not successful"
                            content={this.state.error}
                        />
                        )}
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    );
  }
}

export default DefaultLanding;
