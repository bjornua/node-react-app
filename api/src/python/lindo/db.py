import os.path
import psycopg2
import json
from collections import OrderedDict


class Connection(object):
    def __init__(self, user):
        try:
            db = psycopg2.connect(user=user)
        except psycopg2.OperationalError as e:
            if e.message != 'FATAL:  role "lindo" does not exist\n':
                raise e
            Connection(user='postgres').createuser('lindo').close()
            db = psycopg2.connect(user='lindo')

        self.db = db

    def createuser(self, username):
        self.runfile('create_role.sql', {'username': username})
        try:
            self.runfile('create_db.sql')
        except psycopg2.ProgrammingError as e:
            if e.message != 'database "lindo" already exists\n':
                raise e

        return self

    def runfile(self, filename, kwargs=None, one=False):
        path = os.path.join('sql', filename)

        with open(path, 'r') as f:
            query = f.read()

        return self.run(query=query, kwargs=kwargs, one=one)

    def run(self, query, kwargs=None, one=False):
        if kwargs is None:
            kwargs = {}

        print()
        print('SEND QUERY: {!r}'.format(query))
        cursor = self.db.cursor()
        cursor.execute(query, kwargs)
        results = querytodict(cursor, one)

        print('GET RESULT: {!r}'.format(results))
        print()
        cursor.close()
        return results

    def commit(self):
        self.db.commit()

    def rollback(self):
        self.db.rollback()

    def close(self):
        self.db.close()


def querytodict(cursor, one=False):
    desc = cursor.description
    if desc is None:
        return

    def convtypes(row):
        for i, v in enumerate(row):
            if desc[i].type_code == 114:  # PostgreSQL JSON
                yield json.loads(v)
            else:
                yield v

    generator = (
        OrderedDict(zip([col.name for col in desc], convtypes(row)))
        for row in cursor.fetchall()
    )

    if one:
        for res in generator:
            return res

        return False

    return generator