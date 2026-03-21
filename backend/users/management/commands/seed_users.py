from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "Seed initial users"

    def handle(self, *args, **kwargs):
        users_data = [
            {
                "email": "admin@test.co",
                "password": "admin123",
                "is_staff": True,
                "is_superuser": True,
            },
            {
                "email": "user1@test.co",
                "password": "user123",
            },
            {
                "email": "user2@test.co",
                "password": "user123",
            },
        ]

        for user_data in users_data:
            email = user_data["email"]

            if User.objects.filter(email=email).exists():
                self.stdout.write(self.style.WARNING(f"{email} already exists"))
                continue

            password = user_data.pop("password")
            user_data.pop("email") 

            User.objects.create_user(
                email=email,
                password=password,
                **user_data
            )

            self.stdout.write(self.style.SUCCESS(f"Created {email}"))