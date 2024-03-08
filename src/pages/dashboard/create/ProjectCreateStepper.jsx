import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, StepLabel, StepContent, TextField, Step, Typography, Box } from '@mui/material';
import ProjectCreateStepActions from './ProjectCreateStepActions';
import { regexDomain } from '~/utils/string-helpers';
import { useAddProjectMutation } from '~/store/reducers/projects-api';

const STEPS_COUNT = 3;

const ProjectCreateStepper = () => {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [domain, setDomain] = useState({ name: '', error: true });
  const [name, setName] = useState({ title: '', error: true, url: null });
  const [addProject] = useAddProjectMutation();

  const handleChangeDomain = (e) => {
    const newDomain = e.target.value;
    const error = !regexDomain.test(newDomain);
    setDomain({ name: newDomain, error, url: !error && new URL('https://' + newDomain).href });
  };

  const handleChangeName = (e) => {
    const newTitle = e.target.value;
    setName({ title: newTitle, error: newTitle.length <= 0 });
  };

  return (
    <Stepper activeStep={stepIndex} orientation="vertical">
      <Step>
        <StepLabel>Please enter the domain of the site to audit</StepLabel>
        <StepContent>
          <TextField
            placeholder="www.google.com"
            fullWidth
            value={domain.name}
            onChange={handleChangeDomain}
            error={domain.error}
            required
          />
          <ProjectCreateStepActions
            stepIndex={0}
            stepsCount={STEPS_COUNT}
            currentStep={stepIndex}
            setStepIndex={setStepIndex}
            enabled={!domain.error}
          />
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Please enter a name for this site</StepLabel>
        <StepContent>
          <TextField fullWidth value={name.title} onChange={handleChangeName} error={name.error} required />
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
            <Typography variant="body1">{name.title}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Project domain: &nbsp;
            </Typography>
            <Typography variant="body1">{!domain.error && domain.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Initial URL: &nbsp;
            </Typography>
            <Typography variant="body1">{!domain.error && domain.url}</Typography>
          </Box>
          <ProjectCreateStepActions
            stepIndex={2}
            stepsCount={STEPS_COUNT}
            currentStep={stepIndex}
            setStepIndex={setStepIndex}
            handleLastStep={() => {
              addProject({ domain: domain.name, title: name.title, urls: [new URL(domain.url).pathname] });
              navigate('/');
            }}
          />
        </StepContent>
      </Step>
    </Stepper>
  );
};

export default ProjectCreateStepper;
