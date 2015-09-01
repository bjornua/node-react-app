import lindo.db as dblib
from psycopg2.extras import Json


class Event(object):
    def __init__(self, name, payload=None, pos=None, timestamp=None):
        if payload is None:
            self.payload = {}
        else:
            self.payload = payload

        self.pos = pos
        self.timestamp = timestamp
        self.name = name

    def __repr__(self):
        return u"Event(name={!r}, payload={!r}, pos={!r}, timestamp={!r})".format(self.name, self.payload, self.pos, self.timestamp)


class Events(object):
    def __init__(self, db):
        self.db = db

    def append(self, event):
        pos, timestamp = dblib.execute_file(
            self.db,
            'insert_event.sql',
            {
                'name': event.name,
                'payload': Json(event.payload)
            }
        )[0]
        event.pos = pos
        event.timestamp = timestamp

    def getrange(self, start, end):
        result = dblib.execute_file(
            self.db,
            'select_events.sql',
            {
                'start': start,
                'end': end
            }
        )
        for e in result:
            yield Event(
                pos=e[0],
                date=e[1],
                name=e[2],
                payload=e[3]
            )

    def put(self, name, payload=None):
        e = Event(name=name, payload=payload)
        self.append(e)
        self.db.commit()
        return e