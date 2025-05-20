import os
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import SellItem

@view_config(route_name='sellitem_list', renderer='json', request_method='GET')
def sellitem_list(request):
    db = request.dbsession
    items = db.query(SellItem).filter(SellItem.is_deleted == False).all()
    return [dict(
        id=item.id,
        category=item.category,
        photo=item.photo,
        weight=item.weight,
        price=item.price,
        status=item.status
    ) for item in items]

@view_config(route_name='sellitem_add', renderer='json', request_method='POST', accept="multipart/form-data")
def sellitem_add(request):
    db = request.dbsession
    try:
        # Ambil field form biasa
        category = request.params.get('category')
        weight = request.params.get('weight')
        price = request.params.get('price')

        if not category or not weight or not price:
            return HTTPBadRequest(json_body={"error": "Field category, weight, dan price wajib diisi"})

        # Ambil file foto yang diupload
        upload_file = request.POST.get('photo')  # 'photo' = nama field upload di form

        photo_path = ''
        if upload_file and hasattr(upload_file, 'filename') and upload_file.filename:
            filename = upload_file.filename
            # Tentukan folder upload (pastikan folder ini ada)
            static_dir = request.registry.settings.get('static_dir', 'backend:static')
            # Untuk path fisik, kita bisa gunakan package_relative_path
            upload_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'static', 'uploads')
            os.makedirs(upload_dir, exist_ok=True)
            filepath = os.path.join(upload_dir, filename)

            with open(filepath, 'wb') as out_file:
                out_file.write(upload_file.file.read())

            # Simpan path relatif yang nantinya bisa diakses frontend
            photo_path = f'/static/uploads/{filename}'

        new_item = SellItem(
            category=category,
            photo=photo_path,
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
