from rest_framework.views import APIView
from rest_framework.response import Response
from users.application.services import create_user, login_user, logout_user
from .serializers import RegisterSerializer, LoginSerializer, LogoutSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = create_user(**serializer.validated_data)
            return Response({"id": user.id, "email": user.email})
        except ValueError as e:
            return Response({"error": str(e)}, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            tokens = login_user(**serializer.validated_data)
            return Response(tokens)
        except ValueError as e:
            return Response({"error": str(e)}, status=401)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            logout_user(serializer.validated_data["refresh"])
            return Response({"message": "Logout successful"})
        except ValueError as e:
            return Response({"error": str(e)}, status=400)