import os.path
import psycopg2


def createuser():
    db = psycopg2.connect(user='postgres')
    execute(db, 'SELECT 1')
    execute_file(db, 'create_role.sql')
    try:
        execute_file(db, 'create_db.sql')
    except psycopg2.ProgrammingError, e:
        if e.message != 'database "lindo" already exists\n':
            raise e

    db.close()


def connect():
    # createuser('lindo')

    try:
        db = psycopg2.connect(user='lindo')
    except psycopg2.OperationalError, e:
        print repr(e.message)
        if e.message != 'FATAL:  role "lindo" does not exist\n':
            raise e
        createuser()
        db = psycopg2.connect(user='lindo')

    return db


def execute_file(db, filename, kwargs=None):
    path = os.path.join('sql', filename)

    with open(path, 'r') as f:
        sql = f.read()

    return execute(db, sql, kwargs)


def execute(db, query, kwargs=None):
    if kwargs is None:
        kwargs = {}

    import psycopg2
    print
    print 'SEND QUERY: {!r}'.format(query)
    cursor = db.cursor()
    cursor.execute(query, kwargs)

    try:
        results = cursor.fetchall()
    except psycopg2.ProgrammingError:
        results = None

    print'GET RESULT: {!r}'.format(results)
    print
    cursor.close()
    return results