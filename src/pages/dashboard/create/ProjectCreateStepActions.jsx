import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function ProjectCreateStepActions({ stepIndex, stepsCount, currentStep, handleLastStep, setStepIndex }) {
  const nextStep = () => {
    if (stepIndex === stepsCount - 1) {
      handleLastStep();
    } else {
      setStepIndex(stepIndex + 1);
    }
  };
  return (
    <>
      {currentStep > 0 && (
        <Button disabled={stepIndex === 0} onClick={() => setStepIndex(stepIndex - 1)}>
          Back
        </Button>
      )}
      <Button variant="contained" onClick={() => nextStep()} sx={{ marginRight: 1 }}>
        {stepIndex === stepsCount - 1 ? 'Finish' : 'Next'}
      </Button>
    </>
  );
}

ProjectCreateStepActions.propTypes = {
  stepIndex: PropTypes.number.isRequired,
  stepsCount: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  handleLastStep: PropTypes.func,
  setStepIndex: PropTypes.func.isRequired
};

export default ProjectCreateStepActions;
