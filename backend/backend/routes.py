def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    config.add_route('sellitem_list', '/api/sellitems', request_method='GET')
    config.add_route('sellitem_add', '/api/sellitems', request_method='POST')
    config.add_route('sellitem_update_status', '/api/sellitems/{id}/status', request_method='PUT')
    config.add_route('sellitem_delete', '/api/sellitems/{id}', request_method='DELETE')
    config.add_route('buyitem_list', '/api/buyitems', request_method='GET')
    config.add_route('buyitem_add', '/api/buyitems', request_method='POST')
    config.add_route('buyitem_delete', '/api/buyitems/{id}', request_method='DELETE')
    