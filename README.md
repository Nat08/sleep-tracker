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


curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"start_time":"2011-11-04T00:05:23","end_time":"2011-11-04T00:09:23"}' \
  http://192.168.86.65:8080/api/records

  curl \
  --request GET \
  http://192.168.86.65:8080/api/records