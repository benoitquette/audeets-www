import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Stepper, StepLabel, StepContent, TextField, Step } from '@mui/material';

// project import
import ProjectCreateStepActions from './ProjectCreateStepActions';

// types
import { useAddProjectMutation } from '~/store/reducers/projectsApi';

// ============================|| PROJECT - CREATE ||============================ //

const STEPS_COUNT = 3;

function ProjectCreateStepper() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [addProject] = useAddProjectMutation();

  return (
    <Stepper activeStep={stepIndex} orientation="vertical">
      <Step>
        <StepLabel>Site to audit</StepLabel>
        <StepContent>
          <TextField
            id="text-field-url"
            placeholder="http://www.google.com"
            helperText="Enter the URL of the homepage of the site to audit"
            fullWidth
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <ProjectCreateStepActions stepIndex={0} stepsCount={STEPS_COUNT} currentStep={stepIndex} setStepIndex={setStepIndex} />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Name of the site</StepLabel>
        <StepContent>
          <TextField
            id="text-field-name"
            placeholder="Site name"
            helperText="Enter the name of the site to audit"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <ProjectCreateStepActions stepIndex={1} stepsCount={STEPS_COUNT} currentStep={stepIndex} setStepIndex={setStepIndex} />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Confirm new site configuration</StepLabel>
        <StepContent>
          <ProjectCreateStepActions
            stepIndex={2}
            stepsCount={STEPS_COUNT}
            currentStep={stepIndex}
            setStepIndex={setStepIndex}
            handleLastStep={() => {
              addProject({ url, title: name });
              navigate('/settings/projects');
            }}
          />
        </StepContent>
      </Step>
    </Stepper>
  );
}

export default ProjectCreateStepper;
