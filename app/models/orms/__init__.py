from sqlalchemy.orm import registry

mapper_registry = registry()

# Imports the ORMs such that they can be picked up the by the registry
from .past_sleep_records import *
from .active_sleep_records import *
