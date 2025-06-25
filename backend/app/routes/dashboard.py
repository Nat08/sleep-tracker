from flask import Blueprint, render_template
from flask_cors import cross_origin

dashboard_blueprint = Blueprint('dashboard', __name__)

@dashboard_blueprint.route('/dashboard', methods=['GET'])
@cross_origin()
def get_dashboard():
    return render_template('dashboard.jinja2')