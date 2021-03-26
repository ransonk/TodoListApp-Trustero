from flask.cli import AppGroup
from .users import seed_users, undo_seed_all, seed_lists, seed_tasks, seed_comments

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    seed_users()
    seed_lists()
    seed_tasks()
    seed_comments()

@seed_commands.command('undo')
def undo():
    undo_seed_all()
