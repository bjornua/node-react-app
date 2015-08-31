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


CREATE TABLE IF NOT EXISTS event_aggregates (
    instance_id serial,
    counter_pos bigint default 0
    


);

COMMIT;
