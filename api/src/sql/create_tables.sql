CREATE TABLE IF NOT EXISTS event_counter (
    "cur" bigint
);
DO $$
BEGIN
IF
    (select count(1) from event_counter) = 0
THEN
    INSERT INTO event_counter (cur) VALUES (0);
END IF;
END
$$;

CREATE OR REPLACE FUNCTION event_counter_next()
    returns bigint AS
$$
DECLARE
    next_pk bigint;
    BEGIN
    UPDATE event_counter set "cur" = "cur" + 1;
    SELECT INTO next_pk "cur" from event_counter;
    RETURN next_pk;
END;
$$ LANGUAGE 'plpgsql';


CREATE TABLE IF NOT EXISTS event (
    id bigint default event_counter_next() PRIMARY KEY,
    date timestamp default current_timestamp,
    type text,
    payload json
);

CREATE TABLE IF NOT EXISTS aggregate (
    id serial PRIMARY KEY,
    name text,
    counter_pos bigint default 0,
);

-- CREATE TABLE IF NOT EXISTS instance (
--     id text PRIMARY KEY,
--     ping timestamp
-- );

-- CREATE TABLE IF NOT EXISTS instance_aggregate
--     instance_id text,
--     aggregate_id bigint
-- )

/*

Start server:
    for a in aggregate:
        if a.selected():

/*

COMMIT;