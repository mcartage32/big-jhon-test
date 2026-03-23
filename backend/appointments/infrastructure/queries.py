from appointments.domain.models import Appointment

def get_appointments(filters: dict):
    qs = Appointment.objects.all()

    # Excluir canceladas
    qs = qs.exclude(status="CANCELLED")

    if filters.get("date"):
        qs = qs.filter(scheduled_at__date=filters["date"])

    if filters.get("supplier"):
        qs = qs.filter(supplier=filters["supplier"])

    if filters.get("product_line"):
        qs = qs.filter(product_line=filters["product_line"])

    if filters.get("status"):
        qs = qs.filter(status=filters["status"])

    return qs.order_by("-scheduled_at")