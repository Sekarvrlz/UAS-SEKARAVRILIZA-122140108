import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models.meta import Base  

@pytest.fixture(scope='function')
def db_session():
    
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)  
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()
