import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';
import AddFamily from './AddFamily';
import AddHOF from './AddHOF';
import AddMember from './AddMember';

const steps = [
  'Add Family',
  'Add HOF',
  'Add Member',
];

export default function StepperView({selectedFamilyMember}) {
    const [activeStepper, setActiveStepper] = React.useState(0)
  return (
    <>
    <Box sx={{ width: '100%' }} mt={5}>
      <Stepper activeStep={activeStepper} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
   
    </Box>
    {activeStepper == 0 && <AddFamily setActiveStepper={setActiveStepper}  selectedFamilyMember={selectedFamilyMember}/>}
      {activeStepper == 1 && <AddHOF setActiveStepper={setActiveStepper} selectedFamilyMember={selectedFamilyMember} />}
      {activeStepper == 2 && <AddMember selectedFamilyMember={selectedFamilyMember}/>}
    </>
  );
}
