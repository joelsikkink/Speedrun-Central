import React from 'react';
import { Modal, Grid, Segment, Header, Divider, Icon, Message, Button } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
  LongTextField, ListItemField, ListField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { _ } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import MultiSelectField from '../../components/form-fields/MultiSelectField';
import RadioField from '../../components/form-fields/RadioField';
import { Teams } from '../../../api/team/TeamCollection';
import { Challenges } from '../../../api/challenge/ChallengeCollection';
import { Skills } from '../../../api/skill/SkillCollection';
import { Tools } from '../../../api/tool/ToolCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import { Participants } from '../../../api/user/ParticipantCollection';
import { TeamInvitations } from '../../../api/team/TeamInvitationCollection';

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */
class CreateTeamWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false, errorModal: false, isRegistered: [], notRegistered: [] };
  }

  buildTheModel() {
    return {
      skills: [],
      tools: [],
    };
  }

  buildTheFormSchema() {
    const challengeNames = _.map(this.props.challenges, c => c.title);
    const skillNames = _.map(this.props.skills, s => s.name);
    const toolNames = _.map(this.props.tools, t => t.name);
    const schema = new SimpleSchema({
      open: {
        type: String,
        allowedValues: ['Open', 'Close'],
        label: 'Availability',
      },
      name: { type: String, label: 'Team Name' },
      image: { type: String, optional: true },
      challenges: { type: Array, label: 'Challenges' },
      'challenges.$': { type: String, allowedValues: challengeNames },
      skills: { type: Array, label: 'Skills', optional: true },
      'skills.$': { type: String, allowedValues: skillNames },
      tools: { type: Array, label: 'Toolsets', optional: true },
      'tools.$': { type: String, allowedValues: toolNames },
      // participants: { type: String, label: 'participants' },
      description: String,
      devpostPage: { type: String, optional: true },
      affiliation: { type: String, optional: true },

      participants: {
        type: Array,
        minCount: 1,
      },
      'participants.$': {
        type: Object,
      },
      'participants.$.email': {
        type: String,
        min: 3,
      },
    });
    return schema;
  }

  /** On submit, insert the data.
   * @param formData {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  // eslint-disable-next-line no-unused-vars
  submit(formData, formRef) {
    this.setState({ isRegistered: [] });
    this.setState({ notRegistered: [] });
    const owner = this.props.participant.username;
    const { name, description, challenges, skills, tools, image, participants } = formData;
    if (/^[a-zA-Z0-9-]*$/.test(name) === false) {
      swal('Error', 'Sorry, no special characters or space allowed.', 'error');
      return;
    }
    const partArray = participants;
    const currPart = Participants.find({}).fetch();
    const isRegistered = [];
    const notRegistered = [];

    for (let i = 0; i < partArray.length; i++) {
      let registered = false;
      for (let j = 0; j < currPart.length; j++) {
        if (currPart[j].username === partArray[i].email) {
          registered = true;
          this.setState({
            isRegistered: [
              this.state.isRegistered,
              `-${partArray[i].email}\n`,
            ],
          });
          isRegistered.push(partArray[i].email);
        }
      }
      if (!registered) {
        this.setState({
          notRegistered: [
            this.state.notRegistered,
            `-${partArray[i].email}\n`,
          ],
        });
        notRegistered.push(partArray[i].email);
      }
    }
    if (notRegistered.length !== 0) {
      this.setState({ errorModal: true });
    }

    let { open } = formData;
    if (open === 'Open') {
      open = true;
    } else {
      open = false;
    }

    const skillsArr = _.map(skills, n => {
      const doc = Skills.findDoc({ name: n });
      return Slugs.getNameFromID(doc.slugID);
    });
    const toolsArr = _.map(tools, t => {
      const doc = Tools.findDoc({ name: t });
      return Slugs.getNameFromID(doc.slugID);
    });
    const challengesArr = _.map(challenges, title => {
      const doc = Challenges.findDoc({ title });
      return Slugs.getNameFromID(doc.slugID);
    });

    // If the name has special character or space, throw a swal error and return early.
    const collectionName = Teams.getCollectionName();
    const definitionData = {
      name,
      description,
      owner,
      open,
      image,
      challenges: challengesArr,
      skills: skillsArr,
      tools: toolsArr,
    };
    defineMethod.call(
        {
          collectionName,
          definitionData,
        },
        error => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            if (!this.state.errorModal) {
              swal('Success', 'Team created successfully', 'success');
            }
            formRef.reset();
          }
        },
    );

    // sending invites out to registered members
    for (let i = 0; i < isRegistered.length; i++) {
      const newTeamID = Teams.find({ name: name }).fetch();
      const teamDoc = Teams.findDoc(newTeamID[0]._id);
      const team = Slugs.getNameFromID(teamDoc.slugID);
      const inviteCollection = TeamInvitations.getCollectionName();
      const inviteData = { team: team, participant: isRegistered[i] };
      defineMethod.call({ collectionName: inviteCollection, definitionData: inviteData },
          (error) => {
            if (error) {
              console.error(error.message);
            } else {
              console.log('Success');
            }
          });
    }
  }

  closeModal = () => {
    this.setState({ errorModal: false });
    swal('Success', 'Team created successfully', 'success');
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    // const { email } = this.state;
    if (!this.props.participant.isCompliant) {
      return (
          <div align={'center'}>
            <Header as='h2' icon>
              <Icon name='thumbs down outline'/>
              You have not agreed to the <a href="https://hacc.hawaii.gov/hacc-rules/">HACC Rules</a>
              &nbsp;or we&apos;ve haven&apos;t received the signed form yet.
              <Header.Subheader>
                You cannot create a team until you do agree to the rules. Please check back later.
              </Header.Subheader>
            </Header>
          </div>
      );
    }

    let fRef = null;
    const formSchema = new SimpleSchema2Bridge(this.buildTheFormSchema());
    const model = this.buildTheModel();

    return (
        <Grid container centered>
          <Grid.Column>
            <Divider hidden />
            <Segment
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#E5F0FE',
                }} className={'createTeam'}>
              <Header as="h2" textAlign="center">Create a Team</Header>
              {/* eslint-disable-next-line max-len */}
              <Message>
                <Header as="h4" textAlign="center">Team name and Devpost page ALL
                  have to use the same name</Header>
              </Message>
              <AutoForm
                  ref={ref => {
                    fRef = ref;
                  }}
                  schema={formSchema}
                  model={model}
                  onSubmit={data => this.submit(data, fRef)}
                  style={{
                    paddingBottom: '40px',
                  }}
              >
                <Grid columns={1} style={{ paddingTop: '20px' }}>
                  <Grid.Column style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <Grid className='doubleLine'>
                      <TextField name='name'/>
                      <RadioField
                          name='open'
                          inline
                      />
                    </Grid>
                    <TextField name='image' placeholder={'Team Image URL'} />
                    <LongTextField name='description' />
                    <MultiSelectField name='challenges' />
                    <Grid columns={2}>
                      <Grid.Column><MultiSelectField name='skills' /></Grid.Column>
                      <Grid.Column><MultiSelectField name='tools' /></Grid.Column>
                    </Grid>
                    <TextField name="devpostPage" />
                    <TextField name="affiliation" />

                    <ListField name="participants" label={'Enter each participant\'s email'}>
                      <ListItemField name="$">
                        <TextField showInlineError
                                   iconLeft='mail'
                                   name="email"
                                   label={'Email'}/>
                      </ListItemField>
                    </ListField>

                  </Grid.Column>
                </Grid>
                <div align='center'>
                  <SubmitField value='Submit'
                               style={{
                                 color: 'white', backgroundColor: '#dd000a',
                                 margin: '20px 0px',
                               }} />
                </div>
                <ErrorsField />
              </AutoForm>
            </Segment>
            <Modal
                onClose={this.close}
                open={this.state.errorModal}
            >
              <Modal.Header>Member Warning</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>Some Members you are trying to invite have not registered with SlackBot.</Header>
                  <b>Registered Members:</b>
                  <br />
                  {this.state.isRegistered.map((item) => <p key={item}>{item}</p>)}
                  <b>Not Registered Members:</b>
                  <br />
                  {this.state.notRegistered.map((item) => <p key={item}>{item}</p>)}
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                {/* eslint-disable-next-line max-len */}
                <b>Slackbot will only send invites to registered members, please confirm.</b>
                <Button
                    content="I Understand"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => this.closeModal()}
                    positive
                />
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid>

    );
  }
}

CreateTeamWidget.propTypes = {
  participant: PropTypes.object.isRequired,
  skills: PropTypes.arrayOf(PropTypes.object).isRequired,
  challenges: PropTypes.arrayOf(PropTypes.object).isRequired,
  tools: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(() => ({
  participant: Participants.findDoc({ userID: Meteor.userId() }),
  challenges: Challenges.find({}).fetch(),
  skills: Skills.find({}).fetch(),
  tools: Tools.find({}).fetch(),
}))(CreateTeamWidget);
