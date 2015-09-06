
def db_get(db, event_type):
    return db.run(
        'SELECT counter WHERE event_type = %(event_type)s',
        {'event_type': event_type},
        one=True
    )

def db_insert(db, event_type, counter):
    db.run(
        'INSERT into counter (event_type) VALUES (%(event_type)s)',
        {'event_type': event_type}
    )


def db_update(db, event_type, count):
    db.run(
        'UPDATE counter SET counter = %(count)s WHERE %(event_type)s',
        {'event_type': event_type, 'count': count}
    )


class Writer(object):
    def init(db):
        db.run("""
            CREATE TABLE counter (
                event_type text PRIMARY KEY,
                counter bigint NOT NULL
            );
        """)


    def advance(db, event):
        if 'type' not in event:
            return

        event_type = event['type']

        count = db_get(db, event_type)

        if count is None:
            db_insert(db, event_type, 1)
            return

        db_update(db, event_type, count + 1)


class Reader(object):
    def __init__(self, db):
        self.db = db


    def count(self, what=None):
        
        pass