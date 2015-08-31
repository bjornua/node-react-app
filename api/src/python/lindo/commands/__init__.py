from flask import Blueprint, request, g

from lindo.utils import debug_response
from lindo.eventsourcing import event
commands = Blueprint('commands', __name__)


@commands.route('/session/new/')
def new_session ():
    event(g.db,
        type='session_added'
    )
    return debug_response(request.args)



@commands.route('/session/renew/')
def session_renew():
    if not 'session_id' in request.args:
        return debug_response('Fail')

    event(g.db,
        type='session_pinged',
        payload={
            'session_id': request.args['session_id']
        }
    )
    return debug_response(request.args)




