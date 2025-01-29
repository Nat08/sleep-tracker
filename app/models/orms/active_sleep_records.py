"""
class ActiveSleepRecords
    start_time: date
"""

from datetime import datetime
from typing import Optional


from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped

from models.orms import mapper_registry

@mapper_registry.mapped
class ActiveSleepRecords:
    __tablename__ = 'active_sleep_records'

    id = mapped_column(Integer, primary_key=True)
    sleep_id: Mapped[int] = mapped_column(ForeignKey('sleep_records.id'))