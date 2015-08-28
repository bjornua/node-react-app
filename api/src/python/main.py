import sys
from lindo.app import app


def main(host='127.0.0.1'):
    app.run(debug=True, threaded=True, host=host)


if __name__ == '__main__':
    args = sys.argv[1:]
    if len(args) > 0:
        main(args[0])
    else:
        main()
