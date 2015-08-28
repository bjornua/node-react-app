import json
from flask import make_response


def json_response(object):
    s = json.dumps(object, indent=4, sort_keys=True)
    r = make_response(s)
    r.mimetype = 'application/json'
    return r



debug_response = json_response