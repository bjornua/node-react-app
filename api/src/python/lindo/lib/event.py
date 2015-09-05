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
    def __init__(self, db, on_event):
        self.db = db
        self.on_event = on_event

    def append(self, event):
        params = {'name': event.name, 'payload': Json(event.payload)}

        res = self.db.runfile('insert_event.sql', params, one=True)

        event.pos = res['pos']
        event.timestamp = res['date']

        return event

    def getrange(self, start, end):
        result = self.db.runfile(
            'select_events.sql',
            {
                'start': start,
                'end': end
            }
        )
        for e in result:
            yield Event(
                pos=e['pos'],
                date=e['date'],
                name=e['name'],
                payload=e['payload']
            )

    def put(self, name, payload=None):
        e = Event(name=name, payload=payload)
        self.append(e)
        self.on_event(event=e, events=self)
        self.db.commit()

        return e
