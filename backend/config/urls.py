from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (SpectacularSwaggerView)
from .views import OpenAPIView

urlpatterns = [
    path("api/schema/", OpenAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"),name="swagger-ui"),
    path('admin/', admin.site.urls),
    path("api/v1/", include("config.api_router")),
]
