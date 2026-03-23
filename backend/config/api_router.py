from django.urls import path, include

urlpatterns = [
    path("users/", include("users.presentation.urls")),
    path("appointments/", include("appointments.presentation.urls")),
]