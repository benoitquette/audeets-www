import PropTypes from 'prop-types';
import { Button, Box } from '@mui/material';

function ProjectCreateStepActions({ stepIndex, stepsCount, currentStep, handleLastStep, setStepIndex, enabled = true }) {
  const nextStep = () => {
    if (stepIndex === stepsCount - 1) {
      handleLastStep();
    } else {
      setStepIndex(stepIndex + 1);
    }
  };
  return (
    <Box sx={{ mt: 2 }}>
      {currentStep > 0 && (
        <Button disabled={stepIndex === 0} onClick={() => setStepIndex(stepIndex - 1)}>
          Back
        </Button>
      )}
      <Button type="submit" variant="contained" onClick={nextStep} sx={{ marginRight: 1 }} disabled={!enabled}>
        {stepIndex === stepsCount - 1 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  );
}

ProjectCreateStepActions.propTypes = {
  stepIndex: PropTypes.number.isRequired,
  stepsCount: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  handleLastStep: PropTypes.func,
  setStepIndex: PropTypes.func.isRequired,
  enabled: PropTypes.bool
};

export default ProjectCreateStepActions;
