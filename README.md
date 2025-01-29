# sleep-tracker

MM/DD/YYYY
HH:MM:SS

MM/DD/YYYY HH:MM:SS 
UNIX TIME (number of seconds since Jan 1 1970)

past_sleep_records
| sleep_duration | start_time | end_time 


class PastSleepRecords:
    sleep_duration: int
    start_time: date
    end_time: date

active_sleep_records
| start_time |


class ActiveSleepRecords
    start_time: date


x = PastSleepRecords(sleep_duration=6, .....)
x.insert()
x.delete()