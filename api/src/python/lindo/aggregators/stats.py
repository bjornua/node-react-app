

<<<<<<< HEAD

def db_insert(db, event_type, counter):
    db.run(
        'INSERT into counter (event_type) VALUES (%(event_type)s)',
        {'event_type': event_type}
    )
=======
>>>>>>> 7422db9d6763f244e3618312e6b3963e0adcc299

class Reader(object):
    def __init__(self, db):
        self.db = db

    def count(self, event_type):
        return self.db.run(
            'SELECT counter WHERE event_type = %(event_type)s',
            {'event_type': event_type},
            one=True
        )


class Writer(object):
    def __init__(self, db):
        self.db = db
        self.reader = Reader(db)

    def init(self):
        self.db.run("""
            CREATE TABLE counter (
                event_type text PRIMARY KEY,
                counter bigint NOT NULL
            );
        """)


    def advance(self, db, event):
        if 'type' not in event:
            return

        event_type = event['type']

        count = self.reader.get(event_type)

        if count is None:
            self.db_insert(event_type, 1)
            return

        self.db_update(event_type, count + 1)


    def db_insert(self, event_type, counter):
        self.db.run(
            'INSERT into counter (event_type) VALUES (%(event_type)s)',
            {'event_type': event_type}
        )

    def db_update(self, event_type, count):
        self.db.run(
            'UPDATE counter SET counter = %(count)s WHERE %(event_type)s',
            {'event_type': event_type, 'count': count}
        )
