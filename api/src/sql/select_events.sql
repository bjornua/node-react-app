SELECT pos, date, name, payload FROM event
WHERE pos BETWEEN %(start)s AND %(end)s
