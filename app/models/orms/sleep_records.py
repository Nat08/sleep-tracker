"""
class PastSleepRecords:
    sleep_duration: int
    start_time: date
    end_time: date
"""

from datetime import datetime
from typing import Optional
from dataclasses import dataclass

from sqlalchemy import func
from sqlalchemy import Integer
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped

from models.orms import mapper_registry

@mapper_registry.mapped
class SleepRecords:
    __tablename__ = 'sleep_records'

    id = mapped_column(Integer, primary_key=True)
    duration: Mapped[int]
    start_time: Mapped[datetime] = mapped_column(insert_default=func.now())
    end_time: Mapped[Optional[datetime]]

    def as_json(self):
        return {
            'id': self.id,
            'start_time': self.start_time.isoformat(), 
            'end_time': self.end_time.isoformat(),
            'duration': self.duration
        }
