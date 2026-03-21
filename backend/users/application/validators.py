import re

def validate_email(email: str):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"

    if not re.match(pattern, email):
        raise ValueError("Invalid email format")

def validate_password(password: str):
    if len(password) < 4:
        raise ValueError("Password must be at least 4 characters")