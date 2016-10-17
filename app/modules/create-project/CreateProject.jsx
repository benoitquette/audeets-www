import React, {Component} from "react";
import Canvas from "@components/Canvas";
import {withRouter} from "react-router";
import {Step, Stepper, StepLabel, StepContent} from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import {connect} from "react-redux";
import {
  incrementStepper,
  decrementStepper,
  setUrl
} from "./actions";
import CreateProjectFeedback from './CreateProjectFeedback';

const STEPS_COUNT = 2;

@withRouter
@connect(state => ({
  stepIndex: state.createProject.stepIndex,
  url: state.createProject.url
}), {
  incrementStepper,
  decrementStepper,
  setUrl
})
export default class CreateProject extends Component {
  static propTypes = {
    stepIndex: React.PropTypes.number.isRequired,
    incrementStepper: React.PropTypes.func.isRequired,
    decrementStepper: React.PropTypes.func.isRequired,
    url: React.PropTypes.string,
    setUrl: React.PropTypes.func.isRequired,
    addProject: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired,
    drawerOpen: React.PropTypes.bool.isRequired,
    errors: React.PropTypes.object.isRequired
  };

  handleNextStep() {
    if (this.props.stepIndex === STEPS_COUNT - 1) {
      this.props.addProject(this.props.url);
      const router = this.props.router;
      router.push('/console');
    } else this.props.incrementStepper();
  }

  renderStepActions(step) {
    const {stepIndex} = this.props;
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === STEPS_COUNT - 1 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={() => this.handleNextStep()}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={() => this.props.decrementStepper()}
          />
        )}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.props;
    return (
      <Canvas
        title="Create a new audit configuration"
        drawerOpen={this.props.drawerOpen}
      >
        <div style={styles.stepper}>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Site to audit</StepLabel>
              <StepContent>
                <p>
                  Enter the URL of the homepage of the site to audit:
                </p>
                <TextField
                  id="text-field-url"
                  hintText="http://www.google.com"
                  value={this.props.url}
                  onChange={event => {
                    this.props.setUrl(event.target.value);
                  }}
                />
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Confirm new configuration</StepLabel>
              <StepContent>
                <p>
                  Enter the URL of the homepage of the site to audit:
                </p>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
          </Stepper>
          <CreateProjectFeedback errors={this.props.errors} />
        </div>
      </Canvas>
    );
  }
}

const styles = {
  stepper: {
    maxWidth: 380,
    maxHeight: 400
  }
};
