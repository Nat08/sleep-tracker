from sqlalchemy.orm import registry
from sqlalchemy import create_engine

mapper_registry = registry()

engine = create_engine('sqlite:///sleep_tracker.db')

# Imports the ORMs such that they can be picked up the by the registry
from .sleep_records import *
from .active_sleep_records import *
