import random
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import get_user_model
from appointments.domain.enums import Supplier, ProductLine, Status
from django.core.management.base import BaseCommand
from appointments.domain.models import Appointment

User = get_user_model()


class Command(BaseCommand):
    help = "Seed appointments"

    def handle(self, *args, **kwargs):
        if Appointment.objects.exists():
            self.stdout.write(self.style.WARNING("Appointments table is not empty. Seed skipped."))
            return

        users = list(User.objects.all())
        if not users:
            self.stdout.write(self.style.ERROR("No users found. Run seed_users first"))
            return

        suppliers = list(Supplier.values)
        product_lines = list(ProductLine.values)
        statuses = list(Status.values)

        for i in range(20):
            status = random.choice(statuses)

            # fecha base (futuro o pasado controlado)
            scheduled_at = timezone.now() + timedelta(days=random.randint(1, 10))

            delivered_at = None

            if status == Status.DELIVERED:
                delivered_at = scheduled_at + timedelta(hours=random.randint(1, 5))

            appointment = Appointment.objects.create(
                scheduled_at=scheduled_at,
                supplier=random.choice(suppliers),
                product_line=random.choice(product_lines),
                status=status,
                delivered_at=delivered_at,
                observations=f"Test appointment {i+1}",
                created_by=random.choice(users),
            )

            self.stdout.write(
                self.style.SUCCESS(f"Created appointment {appointment.id}")
            )