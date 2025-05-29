import pytest
from pyramid import testing
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from backend.models import BuyItem, SellItem

@pytest.fixture
def dummy_request(db_session):
    req = testing.DummyRequest()
    req.dbsession = db_session
    return req

@pytest.fixture
def sell_item_fixture(db_session):
    item = SellItem(
        category='Plastic',
        description='Used bottle',
        address='Jl. Kebersihan 12',
        weight=10.0,
        price=5.0,
        status='Pending',
        is_deleted=False
    )
    db_session.add(item)
    db_session.flush()
    return item

@pytest.fixture
def buy_item_fixture(db_session, sell_item_fixture):
    buy = BuyItem(
        buyer_name='Ahmad',
        sell_item_id=sell_item_fixture.id,
        status='Pending',
        payment_method='Cash',
        price=5.0,
        weight=3.0
    )
    db_session.add(buy)
    db_session.flush()
    return buy

def test_buyitem_list(dummy_request, buy_item_fixture, sell_item_fixture):
    from backend.views import buyitem_views
    result = buyitem_views.buyitem_list(dummy_request)
    assert isinstance(result, list)
    assert any(b['id'] == buy_item_fixture.id for b in result)
    assert result[0]['sell_item_category'] == sell_item_fixture.category

def test_buyitem_get_found(dummy_request, buy_item_fixture):
    from backend.views import buyitem_views
    dummy_request.matchdict = {'id': buy_item_fixture.id}
    result = buyitem_views.buyitem_get(dummy_request)
    assert result['id'] == buy_item_fixture.id
    assert 'buyer_name' in result

def test_buyitem_get_not_found(dummy_request):
    from backend.views import buyitem_views
    dummy_request.matchdict = {'id': 9999}
    response = buyitem_views.buyitem_get(dummy_request)
    assert isinstance(response, HTTPNotFound)

def test_buyitem_update_success(dummy_request, buy_item_fixture):
    from backend.views import buyitem_views
    dummy_request.matchdict = {'id': buy_item_fixture.id}
    dummy_request.json_body = {'status': 'Completed'}
    response = buyitem_views.buyitem_update(dummy_request)
    assert response['success'] is True
    assert response['status'] == 'Completed'

def test_buyitem_update_no_status(dummy_request, buy_item_fixture):
    from backend.views import buyitem_views
    dummy_request.matchdict = {'id': buy_item_fixture.id}
    dummy_request.json_body = {}
    response = buyitem_views.buyitem_update(dummy_request)
    assert isinstance(response, HTTPBadRequest)

def test_buyitem_update_not_found(dummy_request):
    from backend.views import buyitem_views
    dummy_request.matchdict = {'id': 9999}
    dummy_request.json_body = {'status': 'Completed'}
    response = buyitem_views.buyitem_update(dummy_request)
    assert isinstance(response, HTTPNotFound)

def test_buyitem_create_success(dummy_request, sell_item_fixture):
    from backend.views import buyitem_views
    dummy_request.json_body = {
        'buyer_name': 'Siti',
        'sell_item_id': sell_item_fixture.id,
        'status': 'Pending',
        'payment_method': 'Cash',
        'price': 5.0,
        'weight': 3.0
    }
    response = buyitem_views.buyitem_create(dummy_request)
    assert response['success'] is True
    assert response['buyer_name'] == 'Siti'

def test_buyitem_create_missing_field(dummy_request):
    from backend.views import buyitem_views
    dummy_request.json_body = {
        'buyer_name': 'Siti',
        # missing sell_item_id and status
    }
    response = buyitem_views.buyitem_create(dummy_request)
    assert isinstance(response, HTTPBadRequest)
