from django.urls import path
from .views import (
    AppointmentListView,
    AppointmentDetailView,
    AppointmentCancelView,
    AppointmentUpdateView,
    AppointmentCreateView,
    SupplierListView,   
    ProductLineListView,
    StatusListView,
    DeliveryStatsView
)

urlpatterns = [
    path("", AppointmentCreateView.as_view()),
    path("list/", AppointmentListView.as_view()),
    path("<uuid:appointment_id>/", AppointmentDetailView.as_view()),
    path("<uuid:appointment_id>/cancel/", AppointmentCancelView.as_view()),
    path("<uuid:appointment_id>/update/", AppointmentUpdateView.as_view()),
    path("suppliers/", SupplierListView.as_view()),
    path("product-lines/", ProductLineListView.as_view()),
    path("statuses/", StatusListView.as_view()),
    path("delivery-stats/", DeliveryStatsView.as_view()),
]