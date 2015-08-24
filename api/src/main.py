from flask import Flask, request
app = Flask(__name__)

import testee

@app.before_first_request
def setup():
    pass
    

@app.route('/event/', methods=['GET'])
def event():
    1/0
    return 'Hello woooorld!'



def main():
    app.run(debug=True, threaded=True)


if __name__ == '__main__':
    main()

    kjkOHvOWth