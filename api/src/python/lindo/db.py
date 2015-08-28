import os.path

def get_conn():
    import psycopg2
    db = psycopg2.connect(user='lindo')
    return db



def execute_file(db, filename):
    path = os.path.join('sql', filename)

    with open(path, 'r') as f:
        sql = f.read()

    cursor = db.cursor()
    cursor.execute(sql)
    cursor.close()