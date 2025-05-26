from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import BuyItem, SellItem

@view_config(route_name='buyitems', renderer='json', request_method='GET')
def buyitem_list(request):
    db = request.dbsession
    buy_items = db.query(BuyItem).all()
    result = []
    for b in buy_items:
        sell_item = db.query(SellItem).filter_by(id=b.sell_item_id, is_deleted=False).first()
        result.append({
            'id': b.id,
            'buyer_name': b.buyer_name,
            'status': b.status,
            'sell_item_id': b.sell_item_id,
            'sell_item_category': sell_item.category if sell_item else None,
            'price': sell_item.price if sell_item else None,
            'weight': sell_item.weight if sell_item else None,
            
        })
    return result

@view_config(route_name='buyitem', renderer='json', request_method='GET')
def buyitem_get(request):
    buyitem_id = int(request.matchdict.get('id'))
    db = request.dbsession
    buy_item = db.query(BuyItem).filter_by(id=buyitem_id).first()
    if not buy_item:
        return HTTPNotFound(json_body={"error": "Buy item tidak ditemukan"})
    sell_item = db.query(SellItem).filter_by(id=buy_item.sell_item_id).first()

    return {
        "id": buy_item.id,
        "buyer_name": buy_item.buyer_name,
        "status": buy_item.status,
        "payment_method": buy_item.payment_method,
        "price": buy_item.price,
        "weight": buy_item.weight,
        "sell_item_category": sell_item.category if sell_item else None,
    }

@view_config(route_name='buyitem', renderer='json', request_method='PUT')
def buyitem_update(request):
    buyitem_id = int(request.matchdict.get('id'))
    data = request.json_body
    new_status = data.get('status')

    if not new_status:
        return HTTPBadRequest(json_body={"error": "Status wajib diisi"})

    buy_item = request.dbsession.query(BuyItem).filter_by(id=buyitem_id).first()
    if not buy_item:
        return HTTPNotFound(json_body={"error": "Buy item tidak ditemukan"})

    buy_item.status = new_status
    request.dbsession.flush()

    return {"success": True, "id": buyitem_id, "status": new_status}
