from typing import TYPE_CHECKING
from django.contrib.auth import get_user_model
from appointments.domain.models import Appointment
from appointments.domain.enums import Status
from .validators import validate_scheduled_at, validate_delivery, normalize_scheduled_at
from django.core.paginator import Paginator
from appointments.infrastructure.queries import get_appointments
from appointments.domain.enums import Status
from .validators import validate_status_transition

if TYPE_CHECKING:
    from users.domain.models import User  

UserModel = get_user_model()

def create_appointment(data: dict, user: "User") -> Appointment:
    # usar default si no viene status
    status = data.get("status", Status.SCHEDULED)

    # validaciones
    validate_scheduled_at(data["scheduled_at"])
    validate_delivery(status, data.get("delivered_at"))
    scheduled_at = normalize_scheduled_at(data["scheduled_at"])

    # construir dinámicamente para no romper defaults
    appointment_data = {
        "scheduled_at": scheduled_at,
        "supplier": data["supplier"],
        "product_line": data["product_line"],
        "observations": data.get("observations"),
        "created_by": user,
    }

    # solo agregar si vienen
    if data.get("status") is not None:
        appointment_data["status"] = data["status"]

    if data.get("delivered_at") is not None:
        appointment_data["delivered_at"] = data["delivered_at"]

    appointment = Appointment.objects.create(**appointment_data)

    return appointment

def list_appointments(filters: dict, page: int, limit: int):
    qs = get_appointments(filters)

    paginator = Paginator(qs, limit)
    page_obj = paginator.get_page(page)

    return {
        "data": page_obj,
        "total": paginator.count,
        "page": page_obj.number,  
        "pages": paginator.num_pages,
    }

def get_appointment_by_id(appointment_id):
    return Appointment.objects.filter(
        id=appointment_id
    ).exclude(status=Status.CANCELLED).first()


def cancel_appointment(appointment):
    appointment.status = Status.CANCELLED
    appointment.save()
    return appointment


def update_appointment(appointment, data: dict):
    new_status = data.get("status", appointment.status)
    new_delivered_at = data.get("delivered_at", appointment.delivered_at)

    # validar transición de estado (no se pude pasar de entregado a programado)
    validate_status_transition(appointment.status, new_status)

    # verifica estado "delivered" y el campo delivered_at
    validate_delivery(new_status, new_delivered_at)

    # actualizar campos
    for field in ["scheduled_at", "supplier", "product_line", "observations"]:
        if field in data:
            setattr(appointment, field, data[field])

    if "status" in data:
        appointment.status = new_status

    if "delivered_at" in data:
        appointment.delivered_at = new_delivered_at

    appointment.save()
    return appointment