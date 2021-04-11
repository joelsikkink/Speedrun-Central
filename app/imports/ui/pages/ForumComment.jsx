import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Forums } from '../../api/forums/Forums';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  game: {
        type: String,
        allowedValues: ['General Speedrunning','Minecraft', 'Super Mario 64', 'Roblox: Speed Run 4', 'Off-Topic'],
        defaultValue: 'Minecraft',
      },
      comment: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class SubmitRun extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { game, comment } = data;
    const owner = Meteor.user().username;
	const time = Date().toLocaleString();
	console.log("getting here?")
    Forums.insert({ game, time, comment, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Comment to a Forum</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
				<SelectField name='game'/>
                <TextField name='comment'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default SubmitRun;
