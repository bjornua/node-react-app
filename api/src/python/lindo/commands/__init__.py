from flask import Blueprint, request, g

from lindo.utils import debug_response

commands = Blueprint('commands', __name__)


@commands.route('/session/new/')
def new_session():
    res = g.events.put(name='session_added')
    return debug_response(res)


@commands.route('/session/renew/')
def session_renew():
    if 'session_id' not in request.args:
        return debug_response('Fail')

    res = g.events.put(
        name='session_pinged',
        payload={
            'session_id': request.args['session_id']
        }
    )
    return debug_response(res)
