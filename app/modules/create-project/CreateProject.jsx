import React from 'react'
import Canvas from '@components/Canvas'
import { withRouter } from 'react-router-dom'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import TextField from '@mui/material/TextField'
import {
  incrementStepper,
  decrementStepper,
  setUrl,
  setName,
} from './actions'
import { createProject } from '@modules/console/actions'
import CreateProjectStepActions from './CreateProjectStepActions'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

const STEPS_COUNT = 3

function CreateProject(props) {
  const dispatch = useDispatch()
  const {
    stepIndex,
    url,
    name } = useSelector(state => state.createProject)

  return (
    <Canvas title="Create a new audit configuration">
      <div>
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
                onChange={(event) => {
                  dispatch(setUrl(event.target.value))
                }}
              />
              <CreateProjectStepActions
                stepIndex={0}
                stepsCount={STEPS_COUNT}
                currentStep={stepIndex}
                handlePreviousStep={() => {
                  dispatch(decrementStepper())
                }}
                handleNextStep={() => {
                  dispatch(incrementStepper())
                }}
                handleLastStep={() => {
                  dispatch(createProject(url))
                  props.history.push('/console')
                }}
              />
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
                onChange={(event) => {
                  dispatch(setName(event.target.value))
                }}
              />
              <CreateProjectStepActions
                stepIndex={1}
                stepsCount={STEPS_COUNT}
                currentStep={stepIndex}
                handlePreviousStep={() => {
                  dispatch(decrementStepper())
                }}
                handleNextStep={() => {
                  dispatch(incrementStepper())
                }}
                handleLastStep={() => {
                  dispatch(createProject(url))
                  props.history.push('/console')
                }}
              />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Confirm new site configuration</StepLabel>
            <StepContent>
              <CreateProjectStepActions
                stepIndex={2}
                stepsCount={STEPS_COUNT}
                currentStep={stepIndex}
                handlePreviousStep={() => {
                  dispatch(decrementStepper())
                }}
                handleNextStep={() => {
                  dispatch(incrementStepper())
                }}
                handleLastStep={() => {
                  dispatch(createProject(url, name))
                  props.history.push('/console/dashboard')
                }}
              />
            </StepContent>
          </Step>
        </Stepper>
      </div>
    </Canvas>
  )
}

CreateProject.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(CreateProject)
