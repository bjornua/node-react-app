import stats


aggregators = {
    'stats': stats
}

g = object()
event_id = 4

count = g.query.get('stats',  event_id)
