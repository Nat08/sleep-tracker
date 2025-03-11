import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Alert from '@mui/material/Alert';
import { Box, Button, Paper, Stack } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import EqualizerIcon from '@mui/icons-material/Equalizer';

function App() {
  return (
    <>
      <Paper elevation={3} className='app-frame'>
        <Stack>
          <Box height={'20%'} width={'100%'}>
            <Stack direction='row-reverse' >
              <Button>
                <TimerIcon/>
              </Button>
              <Button>
                <EqualizerIcon/>
              </Button>
            </Stack>
          </Box>
          <Box bgcolor={'blue'} sx={{height: '100%', width: '100%'}}>
          </Box>
        </Stack>
      </Paper>
    </>
  )
}

export default App
