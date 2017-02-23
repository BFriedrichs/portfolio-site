import uglipyjs
from csscompressor import compress
from PIL import Image
import os

from progress.bar import Bar

libs = ['jquery/jquery-1.11.3.min.js', 'pixi/pixi.min.js'];

js_files = os.listdir('static/js')
js_files[::-1]
js_file = open('static/js/script.min.js', 'w')
js_text = ''

print 'Start script compression'
print '========================\n'
bar = Bar('Collecting script files', max=len(js_files) + len(libs) - 2)
for file_name in js_files:
    if file_name == 'script.min.js' or not os.path.isfile(os.path.join('static', 'js', file_name)):
        continue
    curr = open(os.path.join('static', 'js', file_name), 'r')
    js_text += curr.read()
    curr.close()
    bar.next()

for lib in libs:
    curr = open(os.path.join('static', 'js', 'lib', lib), 'r')
    js_text += curr.read()
    curr.close()
    bar.next()

bar.finish()
print '=> Compressing script'
js_text = uglipyjs.compile(js_text)
print '=> Writing minified JS file'
js_file.write(js_text)
js_file.close

print '\nStart CSS compression'
print '=====================\n'
css_files = os.listdir('static/css')
css_file = open('static/css/style.min.css', 'w')
css_text = ''
bar = Bar('Collecting CSS files', max=len(css_files) - 1)
for file_name in css_files:
    if file_name == 'style.min.css':
        continue
    curr = open('static/css/' + file_name, 'r')
    css_text += curr.read()
    curr.close()
    bar.next()
bar.finish()

print '=> Compressing CSS'
css_text = compress(css_text)
print '=> Writing minified CSS file'
css_text = css_text.replace('/img/', '/img/compressed/')

css_file.write(css_text)
css_file.close


print '\nStart Image compression'
print '=======================\n'
image_files = [f for f in os.listdir('static/img') if os.path.isfile('static/img/' + f)]

new_img_height = 600
bar = Bar('Compressing image files', max=len(image_files))
for file_name in image_files:
    curr = Image.open('static/img/' + file_name)
    if curr.size[0] > new_img_height:
        ratio = float(list(curr.size)[0]) / float(list(curr.size)[1])
        curr = curr.resize((int(new_img_height * ratio), new_img_height), Image.ANTIALIAS)
    curr.save('static/img/compressed/' + file_name, optimize=True, quality=90)
    curr.close()
    bar.next()
bar.finish()
