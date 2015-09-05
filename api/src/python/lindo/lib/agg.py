import lindo.lib.event as eventlib
from gevent import Queue, Pool


class Aggregate(object):
    def __init__(self, meta_db, name, f):
        self.meta_db = meta_db
        self.name = name
        self.f = f

    @property
    def db(self):
        raise NotImplementedError('Not Implemented')

    @property
    def pos(self):
        raise NotImplementedError('Not Implemented')

    def set_pos(self, pos):
        raise NotImplementedError('Not Implemented')

    def process_event(self, event):
        if self.pos >= event.pos:
            return

        if self.pos != event.pos - 1:
            self.advance(event.pos - 1)

        self.apply(event)
        self.set_pos(event.pos)

    def advance(self, destination_pos):
        events = eventlib.getrange(self.pos + 1, destination_pos)

        for event in events:
            self.process_event(event)

    def apply(self, event):
        raise NotImplementedError('Not Implemented')


class Aggregators(object):
    def __init__(self, db):
        self.aggs = []
        self.db = db
        self.queue = Queue()
        self.pool = Pool(10)

    def add_func(self, f):
        name = f.__name__

        agg = Aggregate(meta_db=self.db, name=name, f)

        self.aggs.append(agg)
        return f

    def apply(self, event):
        self.pool.imap_unordered(
            lambda a: a.process_event(event),
            self.aggs
        ).join()

    def loop(self):
        for e in self.queue:
            self.apply(e)