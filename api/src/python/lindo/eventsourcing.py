import lindo.db as db
from psycopg2.extras import Json

def event(connection, type, kwargs=None):
    if kwargs is None:
        kwargs = {}

    db.execute_file(connection, 'insertevent.sql',
        {
            'type': type,
            'payload': Json(kwargs)
        }
    )
