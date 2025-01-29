from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine

from routes.records import records_blueprint
from routes.dashboard import dashboard_blueprint
from models.orms import mapper_registry

engine = create_engine('sqlite:///sleep_tracker.db')
mapper_registry.metadata.create_all(engine)

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(records_blueprint, url_prefix='/api')
app.register_blueprint(dashboard_blueprint, url_prefix='/')

if __name__ == "__main__":
    app.run('0.0.0.0', port=8080)

