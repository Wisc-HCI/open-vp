import React, { useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';

export default function ErrorFallback({error, resetErrorBoundary}) {

    useEffect(()=>{
      resetErrorBoundary()
    })
  
    return (
      <Alert variant='info'>
        <AlertTitle>Loading...</AlertTitle>
        <p>Sometimes Storybook messes up the loading, so we are force-updating to bypass this.</p>
        <pre>{error.message}</pre>
      </Alert>
    )
  }