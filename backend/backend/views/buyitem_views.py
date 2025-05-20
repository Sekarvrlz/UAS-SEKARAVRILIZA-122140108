from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import BuyItem, SellItem

@view_config(route_name='buyitem_list', renderer='json', request_method='GET')
def buyitem_list(request):
    db = request.dbsession
    buy_items = db.query(BuyItem).all()
    result = []
    for b in buy_items:
        sell_item = db.query(SellItem).filter_by(id=b.sell_item_id).first()
        result.append({
            'id': b.id,
            'buyer_name': b.buyer_name,
            'status': b.status,
            'sell_item_category': sell_item.category if sell_item else None,
            'price': sell_item.price if sell_item else None,
            'weight': sell_item.weight if sell_item else None,
        })
    return result

@view_config(route_name='buyitem_add', renderer='json', request_method='POST')
def buyitem_add(request):
    db = request.dbsession
    try:
        data = request.json_body
        sell_item = db.query(SellItem).filter_by(id=data['sell_item_id'], is_deleted=False).first()
        if not sell_item:
            return HTTPNotFound(json_body={"error": "Sell item tidak ditemukan"})
        
        new_buy = BuyItem(
            sell_item_id = data['sell_item_id'],
            buyer_name = data['buyer_name'],
            status = 'Pending'
        )
        db.add(new_buy)
        db.flush()
        return {"success": True, "id": new_buy.id}
    except Exception as e:
        return HTTPBadRequest(json_body={"error": str(e)})
