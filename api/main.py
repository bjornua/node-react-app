#import sqlite3



def get_directories(mainfile):
    from os.path import dirname, join
    rootdir = rootdir
    appdir = dirname(mainfile)
    datadir = dirname(datadir)

    return rootdir, appdir, datadir


def init_config():
    main_directory = get_path()




def initialize():
    get_directories()
    setup_runtime(root_directory)

    config = init_config(mainfile)
    dbpool = init_dbpool()

    eventstore = init_eventstore()

    return dbpool


def run(dbpool, config):
    pass

def shutdown(dbpool, config):
    pass


def main():
    dbpool, config = initialize(mainfile=__file__)
    run(dbpool, config)
    shutdown(dbpool, config)



if __name__ == "__main__":
    main()