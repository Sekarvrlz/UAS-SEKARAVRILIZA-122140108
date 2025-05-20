from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from .meta import Base

class BuyItem(Base):
    __tablename__ = 'buy_items'
    id = Column(Integer, primary_key=True)
    sell_item_id = Column(Integer, ForeignKey('sell_items.id'), nullable=False)
    buyer_name = Column(String, nullable=False)
    status = Column(String, default='Pending')
    created_at = Column(DateTime(timezone=True), server_default=func.now())
