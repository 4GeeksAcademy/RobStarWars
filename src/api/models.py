from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False)
    last_name = db.Column(db.String(), unique=False)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name}

class Posts(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f'<Post: {self.title}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'title': self.title,
                'user_id': self.user_id}


class Comments(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    body = db.Column(db.String(), nullable=False)
    date_comment = db.Column(db.Date)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    author_to = db.relationship('Users', foreign_keys=[author_id])
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id])

    def __repr__(self):
        return f'<Comments: {self.post_id}>'
        
    def serialize(self):
        return {'id': self.id,
                'author_id': self.author_id,
                'post_id': self.post_id,
                'body': self.body,
                'date_comment': self.date_comment}

class Planets(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    discovery_date = db.Column(db.Date)
    planetarian_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    planetarian_to = db.relationship('Users', foreign_keys=[planetarian_id])


    def __repr__(self):
        return f'<Planet: {self.name}>'
        
    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'discovery_date': self.discovery_date,
                'planetarian_id': self.planetarian_id}

class Starships(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    model = db.Column(db.String(), unique=True, nullable=False)
    creation_date = db.Column(db.Date)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    owner_to = db.relationship('Users', foreign_keys=[owner_id])


    def __repr__(self):
        return f'<Model: {self.model}>'
        
    def serialize(self):
        return {'id': self.id,
                'model': self.model,
                'creation_date': self.creation_date,
                'owner_id': self.owner_id}