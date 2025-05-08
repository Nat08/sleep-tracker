import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SleepTimer from './SleepTimer'
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
  const [activeSleepId, setActiveSleepId] = useState(-1);
  const [sleepId, setSleepId] = useState(-1);
  const [offset, setOffset] = useState(new Date().getTimezoneOffset() * 60000);

  // retrieve the active/sleep ids
  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/active-records', {method: 'GET'}).then(
      async (resp) => {
        if (!resp.ok) {
          alert('Unable to connect to the backend.')
          return;
        }

        const contents = await resp.json()
        if (contents.data.length == 0) {
          return;
        }
        
        const {id, sleep_id} = contents.data[0] // {id: xxx, sleep_id: xxx}
        setSleepId(sleep_id);
        setActiveSleepId(id)
      }
    )
  }, [])

  // retrieve start time if an active record exists
  useEffect(() => {
    if (sleepId == -1) {
      return;
    }

    fetch(`http://127.0.0.1:8080/api/records/${sleepId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }).then(
      async (resp) => {
        if (!resp.ok) {
          alert('Unable to connect to the backend.')
          return;
        }

        const contents = await resp.json()
        const {start_time} = contents.data // {id: xxx, sleep_id: xxx}
        const start_time_local = new Date(start_time);

        setStartTime(new Date(start_time_local.getTime() - offset))
        setIsActiveSession(true);
      }
    )
  }, [sleepId])
 
  useEffect(() => {
    if (isActiveSession) {
      
      const currentTime = new Date();
      setEndTime(currentTime);

      if (sleepId == -1) {
          // reset the timer
          setStartTime(currentTime);
      }

      const intervalId = setInterval(() => {
        setEndTime(endTime => {
          const currentTime = endTime.getTime();
          return new Date(currentTime + 1000)
        })
      }, 1000);
  
      setStopWatchId(intervalId);

      if (sleepId == -1) {
        fetch('http://127.0.0.1:8080/api/active-records', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({start_time: currentTime.toISOString().slice(0, -5)})
        }).then(
          async (resp) => {
            if (!resp.ok) {
              alert('Unable to connect to the backend.')
              return;
            }
            
            const contents = await resp.json()
            
            const {id, sleep_id} = contents.data // {id: xxx, sleep_id: xxx}
            setSleepId(sleep_id);
            setActiveSleepId(id)
          }
        )
      }
    } else {
      // if trying to press stop but not in an active sleep session
      if (activeSleepId == -1) {
        return;
      }

      clearInterval(stopWatchId);

      fetch(`http://127.0.0.1:8080/api/active-records/${activeSleepId}/end`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({end_time: endTime.toISOString().slice(0, -5)})
        }).then(
        async (resp) => {
          if (!resp.ok) {
            alert('Unable to connect to the backend.')
            return;
          }
  
          const contents = await resp.json()
          if (contents.status == 'failed') {
            alert(`Unable to find the active sleep record with id ${activeSleepId}`)
            return;
          }
          

          const {end_time} = contents.data // {id: xxx, sleep_id: xxx}
          const end_time_local =  new Date(new Date(end_time).getTime() - offset);
          setSleepId(-1);
          setActiveSleepId(-1);
          
          setEndTime(end_time_local)
        }
      )
    }
  }, [isActiveSession])

  useEffect(() => {
    setDuration(endTime.getTime() - startTime.getTime());
  }, [endTime])

  return (
    <>
      <Paper elevation={2} className='app-frame'>
        <Stack direction={'column'} height={'100%'} sx={{flex: '1'}}>
          <Box height={'10%'} width={'100%'} sx={{'border-bottom': 'solid 1px black', padding: 0, margin: 0}}>
            <Stack direction='row-reverse' alignItems='center' height={'100%'}>
              <Button>
                <TimerIcon sx={{width: '30px', height: '30px'}}/>
              </Button>
              <Button>
                <EqualizerIcon sx={{width: '30px', height: '30px'}}/>
              </Button>
            </Stack>
          </Box>
          <Box sx={{height: '90%', width: '100%', padding: 0, margin: 0}}>
            <SleepTimer></SleepTimer>
          </Box>
        </Stack>
      </Paper>
    </>
  )
}

export default App
