from rest_framework.views import APIView
from rest_framework.response import Response
from config.schema import load_schema


class OpenAPIView(APIView):
    permission_classes = []

    def get(self, request):
        return Response(load_schema())