from pyramid.config import Configurator

class CORSMiddleware:
    def __init__(self, app, allowed_origin='http://localhost:3000'):
        self.app = app
        self.allowed_origin = allowed_origin

    def __call__(self, environ, start_response):
        def custom_start_response(status, headers, exc_info=None):
            headers.append(('Access-Control-Allow-Origin', self.allowed_origin))
            headers.append(('Access-Control-Allow-Headers', 'Content-Type, Authorization'))
            headers.append(('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'))
            return start_response(status, headers, exc_info)

        if environ['REQUEST_METHOD'] == 'OPTIONS':
            start_response('204 No Content', [
                ('Access-Control-Allow-Origin', self.allowed_origin),
                ('Access-Control-Allow-Headers', 'Content-Type, Authorization'),
                ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
                ('Content-Length', '0'),
            ])
            return [b'']

        return self.app(environ, custom_start_response)


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        config.include('.routes')
        config.scan('.views')
        app = config.make_wsgi_app()
    
    app = CORSMiddleware(app)
    return app
