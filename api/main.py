#!/bin/python2

import os
import sys
import subprocess
from os.path import dirname, join, realpath, exists


def run(venv_dir, executable, *args, **kwargs):
    path = join(venv_dir, 'bin', executable)
    args = (path, ) + args
    env = kwargs.get('env')

    return subprocess.check_call(args, env=env)


def install(venv_dir, upgrade, *args):
    if upgrade:
        run(venv_dir, 'pip', 'install', '--upgrade', *args)
    else:
        run(venv_dir, 'pip', 'install', *args)


def swaptovirtualenv(venv_dir, upgrade):
    if not exists(venv_dir):
        print "Installing virtualenv in {}".format(venv_dir)
        subprocess.check_output(['virtualenv2', venv_dir], env=os.environ)
        upgrade = True

    if upgrade:
        install(venv_dir, True, 'pip')

    install(venv_dir, upgrade, '-r', 'requirements.txt')


def setup_env(upgrade):
    root = realpath(__file__)
    root = dirname(root)
    venv_dir = join(root, 'venv')
    src = join(root, 'src')

    env = os.environ.copy()
    env['PYTHONPATH'] = src

    swaptovirtualenv(venv_dir, upgrade)

    run(venv_dir, 'python2', 'src/main.py', env=env)




if __name__ == '__main__':
    upgrade = '--upgrade' in sys.argv

    setup_env(upgrade)