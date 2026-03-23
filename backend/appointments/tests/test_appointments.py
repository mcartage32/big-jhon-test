from django.utils import timezone
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from datetime import timedelta
from appointments.domain.models import Appointment
from appointments.domain.enums import Status, Supplier, ProductLine

User = get_user_model()


class AppointmentTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="test@test.com",
            password="test123"
        )

        self.client.force_authenticate(user=self.user)

        self.url = "/api/v1/appointments/"

    # No crear cita en el pasado
    def test_cannot_create_appointment_in_past(self):
        past_date = timezone.now() - timedelta(days=1)

        data = {
            "scheduled_at": past_date,
            "supplier": Supplier.SAMARA,
            "product_line": ProductLine.SHIRTS,
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Scheduled date cannot be in the past", str(response.data))

    # El estado "delivered" requiere el campo delivered_at
    def test_delivered_requires_delivered_at(self):
        future_date = timezone.now() + timedelta(days=1)

        data = {
            "scheduled_at": future_date,
            "supplier": Supplier.SAMARA,
            "product_line": ProductLine.SHIRTS,
            "status": Status.DELIVERED,
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Delivered appointments must have delivered_at", str(response.data))

    # No permitir cambio de estado de delivered a scheduled
    def test_invalid_status_transition(self):
        appointment = Appointment.objects.create(
            scheduled_at=timezone.now() + timedelta(days=1),
            supplier=Supplier.SAMARA,
            product_line=ProductLine.SHIRTS,
            status=Status.DELIVERED,
            delivered_at=timezone.now(),
            created_by=self.user
        )

        url = f"/api/v1/appointments/{appointment.id}/update/"

        data = {
            "status": Status.SCHEDULED
        }

        response = self.client.patch(url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Cannot change status from DELIVERED to SCHEDULED", str(response.data))

    # usuario no autenticado recibe 401
    def test_unauthenticated_user_gets_401(self):
        self.client.force_authenticate(user=None)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)