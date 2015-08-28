DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM   pg_catalog.pg_user WHERE  usename = 'lindo'
    ) THEN
        CREATE ROLE lindo LOGIN CREATEDB;
    END IF;
END
$$;
COMMIT;