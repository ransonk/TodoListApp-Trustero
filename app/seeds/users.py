from werkzeug.security import generate_password_hash
from app.models import db, User, List, Task, Comment

def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password')

    db.session.add(demo)

    db.session.commit()


def undo_seed_all():
    db.session.execute('TRUNCATE users;')
    db.session.execute('TRUNCATE lists CASCADE;')
    db.session.commit()

def seed_lists():

    demo1 = List(name="List X")
    demo2 = List(name="List Y")
    demo3 = List(name="List Z")

    db.session.add_all([demo1,
                        demo2,
                        demo3])

    db.session.commit()

def seed_tasks():

    demo1 = Task(name="Task 1",
                description="Task 1 Description",
                status=False,
                list_id=1)
    demo2 = Task(name="Task 2",
                description="Task 2 Description",
                status=False,
                list_id=1)
    demo3 = Task(name="Task 3",
                description="Task 3 Description",
                status=False,
                list_id=1)

    demo4 = Task(name="Task 4",
                description="Task 4 Description",
                status=False,
                list_id=2)
    demo5 = Task(name="Task 5",
                description="Task 5 Description",
                status=False,
                list_id=2)
    demo6 = Task(name="Task 6",
                description="Task 6 Description",
                status=False,
                list_id=2)

    demo7 = Task(name="Task 7",
                description="Task 7 Description",
                status=False,
                list_id=3)
    demo8 = Task(name="Task 8",
                description="Task 8 Description",
                status=False,
                list_id=3)
    demo9 = Task(name="Task 9",
                description="Task 9 Description",
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
