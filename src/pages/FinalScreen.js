import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { handleAmountChange, handleScoreChange } from '../redux/actions';

const FinalScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {score} = useSelector(state =>state);
  const handleBackToSettings = () =>{
  
    dispatch (handleScoreChange(0));
    dispatch (handleAmountChange(10));
    Navigate('/');

  }
  return (
   <Box mt={30}  >
     <Typography variant='h3' fontWeight="bold" mb={3} >
       Final Score {score}
     </Typography>
     <Button variant='outlined' onClick={handleBackToSettings} >back to settings</Button>
   </Box>
  )
}

export default FinalScreen


