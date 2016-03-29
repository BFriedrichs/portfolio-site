import tornado.ioloop
import tornado.web
import tornado.autoreload

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    def fn():
        print "reloading..."
    print "loaded.."
    app.listen(80)
    tornado.autoreload.add_reload_hook(fn)
    tornado.autoreload.start()

    tornado.ioloop.IOLoop.current().start()
