from rest_framework.exceptions import APIException


class UserAlreadyExistsError(APIException):
    status_code = 409
    default_detail = "User with this email already exists"
    default_code = "user_exists"