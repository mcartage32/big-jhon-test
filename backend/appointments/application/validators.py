from django.utils import timezone
from appointments.domain.enums import Status
from datetime import datetime, time
from rest_framework.exceptions import ValidationError

def validate_scheduled_at(date):
    if date < timezone.now():
        raise ValidationError("Scheduled date cannot be in the past")

def validate_delivery(status, delivered_at):
    # Si el estado es "delivered", entonces delivered_at debe estar presente
    if status == Status.DELIVERED and not delivered_at:
        raise ValidationError("Delivered appointments must have delivered_at")

    # Si el estado no es "delivered", entonces delivered_at no debe estar presente
    if status != Status.DELIVERED and delivered_at:
        raise ValidationError("Only delivered appointments can have delivered_at")

def normalize_scheduled_at(dt):
    # Si la hora es exactamente 00:00:00, cambiarla a 08:00:00
    if dt.hour == 0 and dt.minute == 0 and dt.second == 0:
        dt = datetime.combine(dt.date(), time(8, 0))

    # Solo hacer aware si es naive
    if timezone.is_naive(dt):
        dt = timezone.make_aware(dt)

    return dt

def validate_status_transition(current_status, new_status):
    if current_status == Status.DELIVERED and new_status == Status.SCHEDULED:
        raise ValidationError("Cannot change status from DELIVERED to SCHEDULED")