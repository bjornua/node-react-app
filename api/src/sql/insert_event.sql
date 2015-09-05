INSERT INTO
    event (name, payload)
    VALUES (%(name)s, %(payload)s)
    RETURNING date, pos;
