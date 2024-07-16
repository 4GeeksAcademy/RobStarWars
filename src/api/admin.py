import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from api.models import db, Users, Comments, Posts, Planets, Starships, Contacts


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the Users model to the admin
    admin.add_view(ModelView(Users, db.session))  # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
    admin.add_view(ModelView(Comments, db.session))
    admin.add_view(ModelView(Planets, db.session))
    admin.add_view(ModelView(Starships, db.session))
    admin.add_view(ModelView(Posts, db.session))
    admin.add_view(ModelView(Contacts, db.session))