import stats


aggregators = {
    'stats': stats
}

g = object()
event_id = 4

count = g.data.get('stats',  event_id)

count.get('pageviews')

