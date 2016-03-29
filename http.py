import tornado.ioloop
import tornado.web
import tornado.autoreload
import os


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html", title="My title")

settings = {'debug': True,
            'static_path': os.path.join(os.path.dirname(__file__), 'static'),
            'template_path': os.path.join(os.path.dirname(__file__), 'templates')}

handlers = [(r'/', MainHandler),
            #(r'/favicon.ico', tornado.web.StaticFileHandler, {'path': favicon_path}),
            ]

if __name__ == "__main__":
    app = tornado.web.Application(handlers, **settings)
    def fn():
        print "reloading..."
    app.listen(8000)
    print "Server restarted.."
    tornado.autoreload.add_reload_hook(fn)
    tornado.autoreload.start()

    tornado.ioloop.IOLoop.current().start()
