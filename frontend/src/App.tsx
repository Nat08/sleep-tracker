import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Alert from '@mui/material/Alert';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import prettyMs from 'pretty-ms';

function App() {

  const [isActiveSession, setIsActiveSession] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(startTime));
  const [duration, setDuration] = useState(0);
  const [stopWatchId, setStopWatchId] = useState(0);

  useEffect(() => {
    if (!isActiveSession) {
      clearInterval(stopWatchId);
      return;
    }
    
    const currentTime = new Date();
    setStartTime(currentTime);
    setEndTime(currentTime);

    const intervalId = setInterval(() => {
      setEndTime(endTime => {
        const currentTime = endTime.getTime();
        return new Date(currentTime + 1000)
      })
    }, 1000);

    setStopWatchId(intervalId);
  }, [isActiveSession])

  useEffect(() => {
    setDuration(endTime.getTime() - startTime.getTime());
  }, [endTime])

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
                <Typography variant='h2'>{prettyMs(duration)}</Typography>
                <Button variant="contained" size='large' onClick={(_) => {
                    setIsActiveSession(!isActiveSession)
                  }}>
                  {isActiveSession ? 'Stop' : 'Start'}
                </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </>
  )
}

export default App
