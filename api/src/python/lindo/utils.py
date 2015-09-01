import json
from flask import make_response


def json_response(obj):
    mimetype = None
    try:
        s = json.dumps(obj, indent=4, sort_keys=True)
        mimetype = 'application/json'
    except TypeError:
        s = repr(obj)
        mimetype = 'text/plain'

    r = make_response(s)
    r.mimetype = mimetype

    return r

debug_response = json_response
