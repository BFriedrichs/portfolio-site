import tornado.ioloop
import tornado.web
import tornado.autoreload
import os
import sys, getopt
import smtplib
import pdfkit
import signal

minified = False

class MainHandler(tornado.web.RequestHandler):
    def get(self):

        if minified:
            css = ['css/style.min.css']
            js = ['js/script.min.js']
        else:
            css = ['css/style.css', 'css/material-icons.css', 'css/extras.css']
            js = ['js/jquery-1.11.3.min.js', 'js/main.js', 'js/helper.js']
        self.render("index.html", css=css, js=js)

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
                'Name: ' + name.encode('utf-8'),
                'E-Mail: ' + email.encode('utf-8'),
                '',
                message.encode('utf-8')
            ])

            server.sendmail("mail@server.de", __EMAIL, msg)
            server.quit()

            self.write({'ok': True})

"""
class PdfHandler(tornado.web.RequestHandler):
    def post(self):
        css = [
            'static/css/bootstrap.min.css',
            'static/css/extras.css',
            'static/css/material-icons.css',
            'static/css/style.css'
        ]

        pdfkit.from_file('templates/index.html', 'out.pdf', css=css)
        self.set_header('Content-Type', 'application/pdf')
        self.set_header('Content-Disposition', 'attachment; filename="out.pdf"')
        self.write(b64decode(escape.url_unescape(self.request.body.split("=")[1])))
"""

settings = {'debug': True,
            'static_path': os.path.join(os.path.dirname(__file__), 'static'),
            'template_path': os.path.join(os.path.dirname(__file__), 'templates')}

handlers = [(r'/', MainHandler),
            (r'/mail', MailHandler),
            #(r'/pdf', PdfHandler)
            #(r'/favicon.ico', tornado.web.StaticFileHandler, {'path': favicon_path}),
            ]

additional_settings = {'port': 8000,
                      'minified': False}

def signal_handler(signum, frame):
    tornado.ioloop.IOLoop.instance().stop()

if __name__ == "__main__":
    myopts, args = getopt.getopt(sys.argv[1:], "p:m:", ['port=', 'minified'])

    for arg, val in myopts:
        if arg in ('-p', '--port'):
            additional_settings['port'] = val
        if arg in ('-m', '--minified'):
            additional_settigns['minified'] = True

    app = tornado.web.Application(handlers, **settings)
    def fn():
        print "reloading..."

    app.listen(additional_settings['port'])
    print "Server restarted.."
    tornado.autoreload.add_reload_hook(fn)
    tornado.autoreload.start()

    tornado.ioloop.IOLoop.current().start()
