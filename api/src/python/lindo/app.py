from flask import Flask, g, render_template
from os.path import join, dirname, realpath

import lindo.db as db

from lindo.utils import debug_response
from lindo.commands import commands


template_folder = realpath(join(dirname(__file__), '..', '..', 'jinja'))

app = Flask(
    import_name=__name__,
    template_folder=template_folder
)
app.register_blueprint(commands, url_prefix='/api')


@app.before_first_request
def setup():
    conn = db.Connection(user='lindo')
    conn.runfile('create_tables.sql')
    conn.commit()


@app.before_request
def setup_request():
    from lindo.lib.event import Events
    g.db = db.Connection(user='lindo')
    g.events = Events(g.db)


@app.teardown_request
def teardown_request(exception=None):
    g.db.rollback()
    g.db.close()


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


@app.route("/")
def site_map():
    rules = sorted(r.rule for r in app.url_map.iter_rules())

    return render_template('index.html', rules=rules)


@app.route('/event/latests/', methods=['GET'])
def latests_event():
    result = g.db.run('select * from event order by id desc')

    return debug_response(result)
