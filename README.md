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
  http://127.0.0.1:8080/api/records

  curl \
  --request GET \
  http://127.0.0.1:8080/api/records'2025-04-23T00:30:42.460Z

  curl   --request DELETE   http://192.168.86.65:8080/api/records/1

  curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"start_time":"2011-11-03T00:05:23"}' \
  http://192.168.86.65:8080/api/records/2

  curl --header "Content-Type: application/json" \
  --request GET \
  http://192.168.86.65:8080/api/active-records

  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"start_time":"2011-11-03T01:05:23"}' \
  http://192.168.86.65:8080/api/active-records

  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"end_time":"2011-11-03T02:06:23"}' \
  http://192.168.86.65:8080/api/active-records/1/stop



# Flow
1. Adds a record into the active sleep records (what that does is that it creates a active sleep_id along with the start_time). At the same time, it also creates a record in the sleep_records table (that includes the sleep_record_id, start_time). In the active sleep record, you need pass in the sleep_id of the sleep records.

2. When a person concludes the active sleep session, it does a look into active sleep record for that given session. From there it gets the sleep_record id, inputs the end_time along with the duration, the then deletes the active sleep record.