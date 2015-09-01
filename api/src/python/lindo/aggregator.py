import lindo.agglib as agglib


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
