from flask import Flask, request, g
app = Flask(__name__)





@app.before_first_request
def setup():
    pass
    

@app.before_request
def setup_request():
    import psycopg2

    db = psycopg2.connect(user="lindo")
    g.db = db



@app.route('/event/', methods=['GET'])
def event():
    db = g.db
    1/0
    return 'Hello woooorld!'



def main():
    app.run(debug=True, threaded=True)


if __name__ == '__main__':
    main()
