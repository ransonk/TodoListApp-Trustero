from werkzeug.security import generate_password_hash
from app.models import db, User, List, Task, Comment

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password')

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()

def seed_lists():

    demo1 = List(name="X")
    demo2 = List(name="Y")
    demo3 = List(name="Z")

    db.session.add_all([demo1,
                        demo2,
                        demo3])

    db.session.commit()

def seed_tasks():

    demo1 = Task(name="Task 1",
                description="This is Task 1",
                status=False,
                list_id=1)
    demo2 = Task(name="Task 2",
                description="This is Task 2",
                status=False,
                list_id=1)
    demo3 = Task(name="Task 3",
                description="This is Task 3",
                status=False,
                list_id=1)

    demo4 = Task(name="Task 4",
                description="This is Task 4",
                status=False,
                list_id=2)
    demo5 = Task(name="Task 5",
                description="This is Task 5",
                status=False,
                list_id=2)
    demo6 = Task(name="Task 6",
                description="This is Task 6",
                status=False,
                list_id=2)

    demo7 = Task(name="Task 7",
                description="This is Task 7",
                status=False,
                list_id=3)
    demo8 = Task(name="Task 8",
                description="This is Task 8",
                status=False,
                list_id=3)
    demo9 = Task(name="Task 9",
                description="This is Task 9",
                status=False,
                list_id=3)

    db.session.add_all([demo1,
                        demo2,
                        demo3,
                        demo4,
                        demo5,
                        demo6,
                        demo7,
                        demo8,
                        demo9])
    db.session.commit()

def seed_comments():

    demo1 = Comment(description="Comment1",
                    task_id=1)
    demo2 = Comment(description="Comment2",
                    task_id=1)

    demo3 = Comment(description="Comment3",
                    task_id=4)

    demo4 = Comment(description="Comment4",
                    task_id=6)

    demo5 = Comment(description="Comment5",
                    task_id=7)
    demo6 = Comment(description="Comment6",
                    task_id=7)
    demo7 = Comment(description="Comment7",
                    task_id=7)

    demo8 = Comment(description="Comment8",
                    task_id=8)

    demo9 = Comment(description="Comment9",
                    task_id=9)


    db.session.add_all([demo1,
                        demo2,
                        demo3,
                        demo4,
                        demo5,
                        demo6,
                        demo7,
                        demo8,
                        demo9])
    db.session.commit()
