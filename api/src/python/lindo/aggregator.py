from lindo.lib.agg import Aggregators

aggregators = Aggregators


class Counter(object):
    def __init__(self):
        pass

    def setup(self):
        """
            CREATE TABLE IF NOT EXISTS counter (
                id serial PRIMARY KEY,
                name text,
                counter_pos bigint default 0
            );
        """

    def advance(self):
        pass

    def destroy(self):
        pass


@aggregators.add
def event_count(db, event, first=False):
    if first:
        db.run('create table')


def main():
    pass


def start(event_queue):
    aggregates = agglib.getall()
    update_loop(event_queue, aggregates)


def update_loop(event_queue, aggregates):
    for event in event_queue:
        for agg in aggregates:
            agg.process_event(event)
            event_queue.task_complete()
