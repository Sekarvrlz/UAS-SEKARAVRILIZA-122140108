import os
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import SellItem
from pyramid.response import Response

@view_config(route_name='sellitems', renderer='json', request_method='GET')
def sellitem_list(request):
    db = request.dbsession
    items = db.query(SellItem).filter(SellItem.is_deleted == False).all()
    return [dict(
        id=item.id,
        category=item.category,
        description=item.description,
        address=item.address,
        weight=item.weight,
        price=item.price,
        status=item.status
    ) for item in items]

@view_config(route_name='sellitems', renderer='json', request_method='POST', accept="application/json")
def sellitem_add(request):
    db = request.dbsession
    try:
        data = request.json_body

        category = data.get('category')
        description = data.get('description')
        address = data.get('address')
        weight = data.get('weight')
        price = data.get('price')

        if not all([category, description, address, weight, price]):
            return HTTPBadRequest(json_body={"error": "Field category, description, address, weight, dan price wajib diisi"})

        new_item = SellItem(
            category=category,
            description=description,
            address=address,
            weight=float(weight),
            price=float(price),
            status='Pending'
        )
        db.add(new_item)
        db.flush()
        return {"success": True, "id": new_item.id}
    except Exception as e:
        return HTTPBadRequest(json_body={"error": str(e)})

@view_config(route_name='sellitem_update_status', renderer='json', request_method='PUT')
def sellitem_update_status(request):
    db = request.dbsession
    item_id = int(request.matchdict['id'])
    try:
        data = request.json_body
        item = db.query(SellItem).filter_by(id=item_id).first()
        if not item:
            return HTTPNotFound(json_body={"error": "Item tidak ditemukan"})
        item.status = data['status']
        return {"success": True}
    except Exception as e:
        return HTTPBadRequest(json_body={"error": str(e)})

@view_config(route_name='sellitem_delete', renderer='json', request_method='DELETE')
def sellitem_delete(request):
    db = request.dbsession
    item_id = int(request.matchdict['id'])
    item = db.query(SellItem).filter_by(id=item_id).first()
    if not item:
        return HTTPNotFound(json_body={"error": "Item tidak ditemukan"})
    item.is_deleted = True
    return {"success": True}
