from lindo.db import dblib
from itertools import chain

def get_events(start, end):
    pass


def start():
    update_loop()


def init_aggregator(aggregator):
    pass


def set_agg(agg, id):
    pass

def update_loop(event_queue, aggregators):
    while True:
        event = event_queue.get()
        for agg in aggregators:
            process_event(event)
            event_queue.task_complete()


def process_event(aggregator, event):
    event_pos = get_pos_event(event)
    agg_pos = get_pos_agg(aggregator)

    if agg_pos >= event_pos:
        events = []

    elif agg_pos + 1 != event_pos:

        events = chain(
            ,
            [event]
        )

    for event in events:
        aggregator(event)
        agg_pos = get_pos_event(event)
        set_pos_agg(agg_pos, agg_pos)


def aggregate_advance(aggregator, destination_id):
    get_pos_agg
    events = get_events(agg_pos + 1, destination_id)

    for event in events:


def get_pos_event(event):
    return event['id']


def get_pos_agg(aggregator):
    raise NotImplementedError('Not Implemented')

def pos_agg_set(aggregator, value):
    raise NotImplementedError('Not Implemented')
