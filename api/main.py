#!/bin/python2

import subprocess
import sys
from os.path import dirname, join, realpath, exists
from os import execv
import os

def install(venv_dir, upgrade, *args):
    pip = join(venv_dir, 'bin', 'pip')

    pargs = (pip, 'install')

    if upgrade:
        pargs += ('--upgrade',)

    pargs += args

    subprocess.check_call(pargs)
     
    


def swaptovirtualenv(root, upgrade):
    venv_dir = join(root, 'venv')
    venv_interpreter = join(venv_dir, 'bin', 'python2')

    interpreter = realpath(sys.executable)

    if interpreter == venv_interpreter:
        if upgrade:
            install(venv_dir, True, 'pip')

        install(venv_dir, upgrade, '-r', 'requirements.txt')
        return

    if not exists (venv_dir):
        print "Installing virtualenv in {}".format(venv_dir)
        subprocess.check_output(['virtualenv2', venv_dir], env=os.environ)
        upgrade = True

    if not exists(venv_interpreter):
        print "Could not find interpreter {}".format(venv_interpreter)
        return

    print
    print '-- EXEC {}'.format(venv_interpreter)
    print

    args = venv_interpreter, realpath(__file__)
    if upgrade:
        args = args + ('--upgrade', )

    execv(venv_interpreter, args)


def setup_env(upgrade):
    root = realpath(__file__)
    root = dirname(root)
    src = join(root, 'src')

    swaptovirtualenv(root, upgrade)

    sys.path[0] = src

    print
    print '-- setup_env_complete'
    print

    import main
    main.main()


if __name__ == '__main__':
    upgrade = '--upgrade' in sys.argv

    setup_env(upgrade)