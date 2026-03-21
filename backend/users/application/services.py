from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .validators import validate_email, validate_password

User = get_user_model()

def create_user(email: str, password: str):
    validate_email(email)
    validate_password(password)

    return User.objects.create_user(
        email=email,
        password=password
    )


def login_user(email: str, password: str):
    user = authenticate(username=email, password=password)

    if not user:
        raise ValueError("Invalid credentials")

    refresh = RefreshToken.for_user(user)

    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }

def logout_user(refresh_token: str):
    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
    except Exception:
        raise ValueError("Invalid or expired token")