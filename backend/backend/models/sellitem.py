from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.sql import func
from .meta import Base

class SellItem(Base):
    __tablename__ = 'sell_items'
    id = Column(Integer, primary_key=True)
    category = Column(String, nullable=False)
    photo = Column(String)  # path foto
    weight = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    status = Column(String, default='Pending')  # status pengiriman
    is_deleted = Column(Boolean, default=False)  # flag hapus
    created_at = Column(DateTime(timezone=True), server_default=func.now())
