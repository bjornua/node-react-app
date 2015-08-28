#!/bin/python2
import os
import sys
import subprocess
from os.path import dirname, join, realpath, exists


def run(dir_venv, executable, *args, **kwargs):
    path = join(dir_venv, 'bin', executable)
    args = (path, ) + args
    env = kwargs.get('env')
    cwd = kwargs.get('cwd')

    return subprocess.check_call(args, env=env, cwd=cwd)


def install(dir_venv, upgrade, *args):
    if upgrade:
        run(dir_venv, 'pip', 'install', '--upgrade', *args)
    else:
        run(dir_venv, 'pip', 'install', *args)


def swaptovirtualenv(dir_python, dir_venv, upgrade):
    if not exists(dir_venv):
        print "Installing virtualenv in {}".format(dir_venv)
        subprocess.check_output(['virtualenv2', dir_venv], env=os.environ)
        upgrade = True

    if upgrade:
        install(dir_venv, True, 'pip')

    install(dir_venv, upgrade, '-r', join(dir_python, 'requirements.txt'))


def setup_env(upgrade, *args):
    dir_root = dirname(__file__)
    dir_root = join(dir_root, '..', '..')
    dir_root = realpath(dir_root)

    dir_venv = join(dir_root, 'venv')
    dir_src = join(dir_root, 'src')
    dir_python = join(dir_src, 'python')

    path_main = join(dir_python, 'main.py')

    env = os.environ.copy()
    env['PYTHONPATH'] = dir_python

    swaptovirtualenv(dir_python, dir_venv, upgrade)

    run(dir_venv, 'python2', path_main, *args, env=env, cwd=dir_src)



if __name__ == '__main__':
    args = sys.argv[1:]

    upgrade = '--upgrade' in args

    args = [a for a in args if a != '--upgrade']

    if len(args) > 0:
        setup_env(upgrade, *args)

    setup_env(upgrade)
