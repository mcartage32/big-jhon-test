from django.apps import AppConfig

# App base configuration, open for adding initialization hooks. Currently, it only sets the default auto field and the app name.

class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "users"