import lindo.lib.event as eventlib


class Aggregate(object):
    def __init__(self, meta_db, name):
        self.meta_db = meta_db
        self.name = name

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
