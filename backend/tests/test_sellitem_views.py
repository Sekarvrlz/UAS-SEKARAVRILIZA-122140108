import pytest
from pyramid import testing
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from backend.models import SellItem

@pytest.fixture
def dummy_request(db_session):
    req = testing.DummyRequest()
    req.dbsession = db_session
    return req

@pytest.fixture
def sell_item_fixture(db_session):
    item = SellItem(
        category='Metal',
        description='Old cans',
        address='Jl. Besi 8',
        weight=15.0,
        price=8.0,
        status='Pending',
        is_deleted=False
    )
    db_session.add(item)
    db_session.flush()
    return item

def test_sellitem_list(dummy_request, sell_item_fixture):
    from backend.views import sellitem_views
    result = sellitem_views.sellitem_list(dummy_request)
    assert isinstance(result, list)
    assert any(i['id'] == sell_item_fixture.id for i in result)

def test_sellitem_add_success(dummy_request):
    from backend.views import sellitem_views
    dummy_request.json_body = {
        'category': 'Glass',
        'description': 'Broken bottles',
        'address': 'Jl. Kaca 5',
        'weight': 12.0,
        'price': 7.5
    }
    response = sellitem_views.sellitem_add(dummy_request)
    assert response['success'] is True
    assert 'id' in response

def test_sellitem_add_missing_fields(dummy_request):
    from backend.views import sellitem_views
    dummy_request.json_body = {
        'category': 'Glass',
        # missing description, address, weight, price
    }
    response = sellitem_views.sellitem_add(dummy_request)
    assert isinstance(response, HTTPBadRequest)

def test_sellitem_update_status_success(dummy_request, sell_item_fixture):
    from backend.views import sellitem_views
    dummy_request.matchdict = {'id': sell_item_fixture.id}
    dummy_request.json_body = {'status': 'Completed'}
    response = sellitem_views.sellitem_update_status(dummy_request)
    assert response['success'] is True

def test_sellitem_update_status_not_found(dummy_request):
    from backend.views import sellitem_views
    dummy_request.matchdict = {'id': 9999}
    dummy_request.json_body = {'status': 'Completed'}
    response = sellitem_views.sellitem_update_status(dummy_request)
    assert isinstance(response, HTTPNotFound)

def test_sellitem_delete_success(dummy_request, sell_item_fixture):
    from backend.views import sellitem_views
    dummy_request.matchdict = {'id': sell_item_fixture.id}
    response = sellitem_views.sellitem_delete(dummy_request)
    assert response['success'] is True

def test_sellitem_delete_not_found(dummy_request):
    from backend.views import sellitem_views
    dummy_request.matchdict = {'id': 9999}
    response = sellitem_views.sellitem_delete(dummy_request)
    assert isinstance(response, HTTPNotFound)
