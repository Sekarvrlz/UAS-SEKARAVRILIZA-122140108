import pytest
from pyramid import testing
from backend.models import BuyItem, SellItem  # import sudah disesuaikan

@pytest.fixture
def dummy_sell_item(db_session):
    item = SellItem(
        category='Plastic',
        description='Used PET bottles, cleaned',
        address='Jl. Kebersihan No. 12',
        weight=10,
        price=50000,
        status='Pending',
        is_deleted=False
    )
    db_session.add(item)
    db_session.flush()
    return item

@pytest.fixture
def dummy_buy_item(db_session, dummy_sell_item):
    buy = BuyItem(
        sell_item_id=dummy_sell_item.id,
        buyer_name='Ahmad',
        status='Pending',
        payment_method='Cash',
        price=50000,
        weight=3
    )
    db_session.add(buy)
    db_session.flush()
    return buy

def test_buyitem_list(db_session, dummy_buy_item):
    from backend.views.buyitem_views import buyitem_list
    request = testing.DummyRequest(dbsession=db_session)
    result = buyitem_list(request)
    assert isinstance(result, list)
    assert any(b['id'] == dummy_buy_item.id for b in result)

def test_buyitem_get_found(db_session, dummy_buy_item):
    from backend.views.buyitem_views import buyitem_get
    request = testing.DummyRequest(dbsession=db_session, matchdict={'id': str(dummy_buy_item.id)})
    response = buyitem_get(request)
    assert response['id'] == dummy_buy_item.id
    assert response['buyer_name'] == 'Ahmad'

def test_buyitem_get_not_found(db_session):
    from backend.views.buyitem_views import buyitem_get
    request = testing.DummyRequest(dbsession=db_session, matchdict={'id': '9999'})
    response = buyitem_get(request)
    assert response.status_code == 404

def test_buyitem_create_success(db_session, dummy_sell_item):
    from backend.views.buyitem_views import buyitem_create
    data = {
        'buyer_name': 'Siti',
        'sell_item_id': dummy_sell_item.id,
        'status': 'Pending',
        'payment_method': 'Transfer'
    }
    request = testing.DummyRequest(dbsession=db_session, json_body=data)
    response = buyitem_create(request)
    assert response['success'] is True
    assert response['buyer_name'] == 'Siti'

def test_buyitem_create_missing_field(db_session):
    from backend.views.buyitem_views import buyitem_create
    data = {
        'buyer_name': 'Siti',
        'sell_item_id': 1  # status missing
    }
    request = testing.DummyRequest(dbsession=db_session, json_body=data)
    response = buyitem_create(request)
    assert response.status_code == 400

def test_buyitem_update_success(db_session, dummy_buy_item):
    from backend.views.buyitem_views import buyitem_update
    data = {'status': 'Completed'}
    request = testing.DummyRequest(dbsession=db_session, json_body=data, matchdict={'id': str(dummy_buy_item.id)})
    response = buyitem_update(request)
    assert response['success'] is True
    assert response['status'] == 'Completed'

def test_buyitem_update_no_status(db_session, dummy_buy_item):
    from backend.views.buyitem_views import buyitem_update
    data = {}
    request = testing.DummyRequest(dbsession=db_session, json_body=data, matchdict={'id': str(dummy_buy_item.id)})
    response = buyitem_update(request)
    assert response.status_code == 400

def test_buyitem_update_not_found(db_session):
    from backend.views.buyitem_views import buyitem_update
    data = {'status': 'Completed'}
    request = testing.DummyRequest(dbsession=db_session, json_body=data, matchdict={'id': '9999'})
    response = buyitem_update(request)
    assert response.status_code == 404
