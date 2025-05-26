def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('sellitems', '/api/sellitems')
    config.add_route('sellitem_update_status', '/api/sellitems/{id}/status')
    config.add_route('sellitem_delete', '/api/sellitems/{id}')
    config.add_route('buyitems', '/api/buyitems')
    config.add_route('buyitem', '/api/buyitems/{id}')