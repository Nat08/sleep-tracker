from datetime import datetime

from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from sqlalchemy.orm import Session
from sqlalchemy import select, delete

from models.orms import engine
from models.orms import ActiveSleepRecords, SleepRecords

records_blueprint = Blueprint('records', __name__)

@records_blueprint.route('/records', methods=['GET'])
@cross_origin()
def get_records():
    with Session(engine) as session:
        statement = select(SleepRecords)
        records = session.scalars(statement).all()

        records = [record.as_json() for record in records]

        return jsonify({
            'status' : 'success',
            'data': records
        })

@records_blueprint.route('/records/<int:sleep_id>', methods=['DELETE'])
@cross_origin()
def delete_record(sleep_id):
    with Session(engine) as session:
        statement = delete(SleepRecords).where(SleepRecords.id==sleep_id)
        session.execute(statement)
        session.commit()

        return jsonify({
            'status' : 'success'
        })
    
@records_blueprint.route('/records', methods=['POST'])
@cross_origin()
def add_record():
    raw_sleep_record = request.json
    
    start_time = datetime.fromisoformat(raw_sleep_record['start_time'])
    end_time = datetime.fromisoformat(raw_sleep_record['end_time'])

    with Session(engine) as session:
        sleep_record = SleepRecords(duration=0, start_time=start_time, end_time=end_time)
        session.add(sleep_record)
        session.commit()

        return jsonify({
            'status' : 'success',
            'data': sleep_record.as_json()

        })

@records_blueprint.route('/records/<int:sleep_id>', methods=['PUT'])
@cross_origin()
def update_record(sleep_id):
    raw_new_sleep_record = request.json

    with Session(engine) as session:
        statement = select(SleepRecords).where(SleepRecords.id==sleep_id)
        sleep_record = session.scalars(statement).one()
        
        if 'start_time' in raw_new_sleep_record.keys():
            start_time = datetime.fromisoformat(raw_new_sleep_record['start_time'])
            sleep_record.start_time = start_time
        
        if 'end_time' in raw_new_sleep_record.keys():
            end_time = datetime.fromisoformat(raw_new_sleep_record['end_time'])
            sleep_record.end_time = end_time

        session.commit()

        print(sleep_record.start_time)
            
        return jsonify({
            'status' : 'success',
            'data': sleep_record.as_json()

        })
    