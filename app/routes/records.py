from flask import Blueprint
from flask_cors import cross_origin

records_blueprint = Blueprint('records', __name__)

@records_blueprint.route('/records', methods=['GET'])
@cross_origin()
def get_records():
    return {'message': 'test'}

@records_blueprint.route('/records', methods=['DELETE'])
@cross_origin()
def delete_record():
    pass

@records_blueprint.route('/records', methods=['POST'])
@cross_origin()
def add_record():
    pass

@records_blueprint.route('/records', methods=['PUT'])
@cross_origin()
def update_record():
    pass


