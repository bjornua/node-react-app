import os.path


def createuser():
    import psycopg2
    db = psycopg2.connect(user='postgres')
    execute(db, 'SELECT 1')
    execute_file(db, 'createrole.sql')
    try:
        execute_file(db, 'createdb.sql')
    except psycopg2.ProgrammingError, e:
        if e.message != 'database "lindo" already exists\n':
            raise e

    db.close()



def get_conn():
    # createuser('lindo')
    import psycopg2

    try:
        db = psycopg2.connect(user='lindo')
    except psycopg2.OperationalError, e:
        print repr(e.message)
        if e.message != 'FATAL:  role "lindo" does not exist\n':
            raise e
        createuser()
        db = psycopg2.connect(user='lindo')



    return db


def execute_file(db, filename):
    path = os.path.join('sql', filename)

    with open(path, 'r') as f:
        sql = f.read()

    execute(db, sql)


def execute(db, query):
    import psycopg2
    print
    print 'SEND QUERY: {!r}'.format(query)
    cursor = db.cursor()
    cursor.execute(query)


    try:
        results = cursor.fetchall()
    except psycopg2.ProgrammingError:
        results = None

    print'GET RESULT: {!r}'.format(results)
    print
    cursor.close()    
    return results