import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Alert from '@mui/material/Alert';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import EqualizerIcon from '@mui/icons-material/Equalizer';

function App() {
  return (
    <>
      <Paper elevation={2} className='app-frame'>
        <Stack direction={'column'} height={'100%'} sx={{flex: '1'}}>
          <Box height={'10%'} width={'100%'} sx={{'border-bottom': 'solid 1px black'}}>
            <Stack direction='row-reverse' >
              <Button>
                <TimerIcon sx={{width: '30px', height: '30px'}}/>
              </Button>
              <Button>
                <EqualizerIcon sx={{width: '30px', height: '30px'}}/>
              </Button>
            </Stack>
          </Box>
          <Box sx={{height: '90%', width: '100%'}}>
            <Stack direction={'column'} alignItems='center' alignContent='center' justifyContent='center' sx={{flex: '1'}} height={'100%'} spacing={10}>
                <Typography variant='h2'>01:10:36</Typography>
                <Button variant="contained" size='large'>
                  Stop
                </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </>
  )
}

export default App
