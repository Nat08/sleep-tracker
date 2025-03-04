from datetime import datetime

from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from sqlalchemy.orm import Session
from sqlalchemy import select, delete

from models.orms import engine
from models.orms import ActiveSleepRecords, SleepRecords

active_records_blueprint = Blueprint('active_records', __name__)

@active_records_blueprint.route('/active-records', methods=['GET'])
@cross_origin()
def get_active_records():
    with Session(engine) as session:
        statement = select(ActiveSleepRecords)
        records = session.scalars(statement).all()

        records = [record.as_json() for record in records]

        return jsonify({
            'status' : 'success',
            'data': records
        })


@active_records_blueprint.route('/active-records/<int:sleep_id>', methods=['DELETE'])
@cross_origin()
def delete_record(sleep_id):
    with Session(engine) as session:
        statement = delete(ActiveSleepRecords).where(ActiveSleepRecords.id==sleep_id)
        session.execute(statement)
        session.commit()

        return jsonify({
            'status' : 'success'
        })
    
@active_records_blueprint.route('/active-records', methods=['POST'])
@cross_origin()
def add_record():
    raw_sleep_record = request.json
    
    start_time = datetime.fromisoformat(raw_sleep_record['start_time'])

    with Session(engine) as session:
        active_sleep_record = ActiveSleepRecords()
        sleep_record = SleepRecords(duration=0, start_time=start_time)
        
        session.add(sleep_record)
        session.commit()

        active_sleep_record.sleep_id = sleep_record.id

        session.add(active_sleep_record)
        session.commit()

        return jsonify({
            'status' : 'success',
            'data': active_sleep_record.as_json()
        })


@active_records_blueprint.route('/active-records/<int:sleep_id>/stop', methods=['POST'])
@cross_origin()
def stop_active_sleep_session(sleep_id):
    raw_sleep_record = request.json
    end_time = datetime.fromisoformat(raw_sleep_record['end_time'])

    with Session(engine) as session:
        select_active_sleep_record_statement = select(ActiveSleepRecords).where(ActiveSleepRecords.id==sleep_id)
        active_sleep_record = session.scalars(select_active_sleep_record_statement).one()
        
        select_sleep_record_statement = select(SleepRecords).where(SleepRecords.id==active_sleep_record.sleep_id)
        sleep_record = session.scalars(select_sleep_record_statement).one()
        sleep_record.end_time = end_time
        duration = end_time - sleep_record.start_time
        sleep_record.duration = int(duration.total_seconds())
        session.add(sleep_record)
        session.commit()

        delete_active_record= delete(ActiveSleepRecords).where(ActiveSleepRecords.id==sleep_id)
        session.execute(delete_active_record)
        session.commit()
        
        return jsonify({
            'status' : 'success',
            'data': sleep_record.as_json()
        })