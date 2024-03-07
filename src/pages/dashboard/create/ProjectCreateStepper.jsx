import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, StepLabel, StepContent, TextField, Step, Typography, Box } from '@mui/material';
import ProjectCreateStepActions from './ProjectCreateStepActions';
import { useAddProjectMutation } from '~/store/reducers/projects-api';

const STEPS_COUNT = 3;
const URL_REGEX =
  /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

function ProjectCreateStepper() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [url, setUrl] = useState({ url: '', error: true });
  const [name, setName] = useState({ name: '', error: true });
  const [addProject] = useAddProjectMutation();

  const handleChangeUrl = (e) => {
    const newUrl = e.target.value;
    setUrl({ url: newUrl, error: !URL_REGEX.test(newUrl) });
  };

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setName({ name: newName, error: newName.length <= 0 });
  };

  return (
    <Stepper activeStep={stepIndex} orientation="vertical">
      <Step>
        <StepLabel>Please enter the URL of the homepage of the site to audit:</StepLabel>
        <StepContent>
          <TextField placeholder="https://www.google.com" fullWidth value={url.url} onChange={handleChangeUrl} error={url.error} required />
          <ProjectCreateStepActions
            stepIndex={0}
            stepsCount={STEPS_COUNT}
            currentStep={stepIndex}
            setStepIndex={setStepIndex}
            enabled={!url.error}
          />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Please enter a name for this site:</StepLabel>
        <StepContent>
          <TextField fullWidth value={name.name} onChange={handleChangeName} error={name.error} required />
          <ProjectCreateStepActions stepIndex={1} stepsCount={STEPS_COUNT} currentStep={stepIndex} setStepIndex={setStepIndex} />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Confirm new site configuration</StepLabel>
        <StepContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Project name: &nbsp;
            </Typography>
            <Typography variant="body1">{name.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Project domain: &nbsp;
            </Typography>
            <Typography variant="body1">{!url.error && new URL(url.url).hostname}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Initial URL: &nbsp;
            </Typography>
            <Typography variant="body1">{!url.error && new URL(url.url).href}</Typography>
          </Box>
          <ProjectCreateStepActions
            stepIndex={2}
            stepsCount={STEPS_COUNT}
            currentStep={stepIndex}
            setStepIndex={setStepIndex}
            handleLastStep={() => {
              addProject({ domain: new URL(url.url).hostname, title: name.name, urls: [new URL(url.url).pathname] });
              navigate('/');
            }}
          />
        </StepContent>
      </Step>
    </Stepper>
  );
}

export default ProjectCreateStepper;
