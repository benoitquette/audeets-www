import React from "react";
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function CreateProjectStepActions(props) {
  const {stepIndex, stepsCount, currentStep} = props;
  const nextStep = () => {
    if (stepIndex === stepsCount - 1) {
      props.handleLastStep();
    } else {
      props.handleNextStep();
    }
  };
  return (
    <div>
      {currentStep > 0 && (
        <Button
          disabled={stepIndex === 0}
          onClick={() => props.handlePreviousStep()}
        >
          Back
        </Button>
      )}
      <Button
        variant="contained"
        onClick={() => nextStep()}
        sx={{marginRight: 1}}
      >
        {stepIndex === stepsCount - 1 ? 'Finish' : 'Next'}
      </Button>
    </div>
  )
}

CreateProjectStepActions.propTypes = {
  stepIndex: PropTypes.number.isRequired,
  stepsCount: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  handleLastStep: PropTypes.func.isRequired,
  handlePreviousStep: PropTypes.func.isRequired
};

export default CreateProjectStepActions;
