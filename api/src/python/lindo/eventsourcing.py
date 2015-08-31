import lindo.db as db
from psycopg2.extras import Json


def event(connection, type, payload=None):
    if payload is None:
        payload = {}

    db.execute_file(connection, 'insert_event.sql',
        {
            'type': type,
            'payload': Json(payload)
        }
    )


