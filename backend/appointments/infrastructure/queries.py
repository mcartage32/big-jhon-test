from appointments.domain.models import Appointment
from django.db import connection

def get_appointments(filters: dict):
    qs = Appointment.objects.all()

    # Excluir canceladas
    qs = qs.exclude(status="CANCELLED")

    if filters.get("scheduled_date"):
        qs = qs.filter(scheduled_at__date=filters["scheduled_date"])

    if filters.get("supplier"):
        qs = qs.filter(supplier=filters["supplier"])

    if filters.get("product_line"):
        qs = qs.filter(product_line=filters["product_line"])

    if filters.get("status"):
        qs = qs.filter(status=filters["status"])

    return qs.order_by("-scheduled_at")

def get_delivery_stats(date_from, date_to):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT
                product_line,
                COUNT(*) AS total_deliveries,
                AVG(EXTRACT(EPOCH FROM (delivered_at - scheduled_at)) / 3600) AS avg_hours,
                AVG(EXTRACT(EPOCH FROM (delivered_at - scheduled_at)) / 60) AS avg_minutes
            FROM appointments_appointment
            WHERE status = 'DELIVERED'
              AND scheduled_at BETWEEN %s AND %s
            GROUP BY product_line
            ORDER BY total_deliveries DESC
        """, [date_from, date_to])
        result = cursor.fetchall()
    return result