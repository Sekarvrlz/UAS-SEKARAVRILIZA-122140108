import pytest
from pyramid import testing
from backend.models import SellItem  # import sudah disesuaikan

@pytest.fixture
def dummy_sell_item(db_session):
    item = SellItem(
        category='Paper',
        description='Used newspapers',
        address='Jl. Bersih No. 10',
        weight=15,
        price=35000,
        status='Pending',
        is_deleted=False
    )
    db_session.add(item)
    db_session.flush()
    return item

def test_sellitem_list(db_session, dummy_sell_item):
    from backend.views.sellitem_views import sellitem_list
    request = testing.DummyRequest(dbsession=db_session)
    result = sellitem_list(request)
    assert any(i['id'] == dummy_sell_item.id for i in result)

def test_sellitem_add_success(db_session):
    from backend.views.sellitem_views import sellitem_add
    data = {
        'category': 'Metal',
        'description': 'Scrap iron pieces',
        'address': 'Jl. Tembaga No. 5',
        'weight': 20,
        'price': 7000
    }
    request = testing.DummyRequest(dbsession=db_session, json_body=data)
    response = sellitem_add(request)
    assert response['success'] is True
