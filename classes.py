class Course:
    def __init__(self, code, title, schedule):
        self.code = code
        self.title = title
        self.schedule = schedule


class Student:
    def __init__(self, sid, name):
        self.sid = sid
        self.name = name
        self.courses = []