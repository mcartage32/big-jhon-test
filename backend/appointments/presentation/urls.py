from django.urls import path
from .views import (
    AppointmentListView,
    AppointmentDetailView,
    AppointmentCancelView,
    AppointmentUpdateView,
    AppointmentCreateView
)

urlpatterns = [
    path("", AppointmentCreateView.as_view()),
    path("list/", AppointmentListView.as_view()),
    path("<uuid:appointment_id>/", AppointmentDetailView.as_view()),
    path("<uuid:appointment_id>/cancel/", AppointmentCancelView.as_view()),
    path("<uuid:appointment_id>/update/", AppointmentUpdateView.as_view()),
    
]