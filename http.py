import tornado.ioloop
import tornado.web
import tornado.autoreload
import os
import smtplib

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html", title="My title")

class MailHandler(tornado.web.RequestHandler):
    def post(self):
        email = self.get_argument('email')
        name = self.get_argument('sender')
        message = self.get_argument('message')

        if email and name and message:

            server.starttls()

            msg = '\r\n'.join([
                'From: My website',
                'To: ' + __EMAIL,
                'Subject: New Message from website',
                '',
                'Name: ' + name,
                'E-Mail: ' + email,
                '',
                message
            ])

            server.sendmail("mail@server.de", __EMAIL, msg)
            server.quit()

            self.write({'ok': True})

settings = {'debug': True,
            'static_path': os.path.join(os.path.dirname(__file__), 'static'),
            'template_path': os.path.join(os.path.dirname(__file__), 'templates')}

handlers = [(r'/', MainHandler),
            (r'/mail', MailHandler),
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
