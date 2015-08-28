from flask import Flask, g, make_response
import json


app = Flask(__name__)


import os
import db
import sys
print sys.path

print os.getcwd()


def json_response(object):
    s = json.dumps(object, indent=4, sort_keys=True)
    r = make_response(s)
    r.mimetype = 'application/json'
    return r


@app.before_first_request
def setup():
    conn = db.get_conn()
    db.execute_file(conn, 'create.sql')


@app.before_request
def setup_request():
    g.db = db.get_conn()


@app.route('/event/', methods=['GET'])
def event():
    db = g.db
    c = db.cursor()
    c.execute('select * from event')
    return json_response(c.fetchall())


def main(host='127.0.0.1'):
    app.run(debug=True, threaded=True, host=host)


if __name__ == '__main__':
    import sys
    args = sys.argv[1:]
    if len(args) > 0:
        main(args[0])
    else:
        main()
