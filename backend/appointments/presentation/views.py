from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import AppointmentSerializer
from appointments.domain.enums import Supplier, ProductLine, Status
from appointments.infrastructure.queries import get_delivery_stats
from datetime import datetime, time
from appointments.application.services import (
    list_appointments,
    get_appointment_by_id,
    cancel_appointment,
    update_appointment,
    create_appointment
)

# Funcion helper reutilizable para convertir enums a listas de opciones
def enum_to_list(enum):
    return [
        {"value": item.value, "label": item.label}
        for item in enum
    ]

class AppointmentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        appointment = create_appointment(
            serializer.validated_data,
            request.user
        )

        return Response(
            AppointmentSerializer(appointment).data,
            status=status.HTTP_201_CREATED
        )

class AppointmentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        filters = {
            "scheduled_date": request.query_params.get("scheduled_date"),
            "supplier": request.query_params.get("supplier"),
            "product_line": request.query_params.get("product_line"),
            "status": request.query_params.get("status"),
        }

        page = int(request.query_params.get("page", 1))
        limit = int(request.query_params.get("limit", 10))

        result = list_appointments(filters, page, limit)

        serializer = AppointmentSerializer(
            result["data"].object_list, 
            many=True
        )

        return Response({
            "total": result["total"],
            "page": result["page"],
            "total_pages": result["pages"],
            "data": serializer.data,
        })


class AppointmentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, appointment_id):
        appointment = get_appointment_by_id(appointment_id)

        if not appointment:
            return Response({"detail": "Not found"}, status=404)

        return Response(AppointmentSerializer(appointment).data)


class AppointmentCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, appointment_id):
        appointment = get_appointment_by_id(appointment_id)

        if not appointment:
            return Response({"detail": "Not found"}, status=404)

        cancel_appointment(appointment)

        return Response({"detail": "Appointment cancelled"})


class AppointmentUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, appointment_id):
        appointment = get_appointment_by_id(appointment_id)

        if not appointment:
            return Response({"detail": "Not found"}, status=404)

        updated = update_appointment(appointment, request.data)

        return Response(AppointmentSerializer(updated).data)

class SupplierListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(enum_to_list(Supplier))


class ProductLineListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(enum_to_list(ProductLine))


class StatusListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(enum_to_list(Status))
    
class DeliveryStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_from = request.query_params.get("date_from")
        date_to = request.query_params.get("date_to")

        # Validaciones básicas
        if not date_from or not date_to:
            return Response(
                {"detail": "You must provide date_from and date_to query parameters"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if date_from == date_to:
            return Response(
                {"detail": "date_from and date_to cannot be the same date"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Convertir strings a datetime
            date_from_dt = datetime.strptime(date_from, "%Y-%m-%d")
            date_to_dt = datetime.strptime(date_to, "%Y-%m-%d")

            # Rango completo del día
            date_from_dt = datetime.combine(date_from_dt.date(), time.min)
            date_to_dt = datetime.combine(date_to_dt.date(), time.max)

        except ValueError:
            return Response(
                {"detail": "Invalid date format, must be YYYY-MM-DD"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Ejecutar consulta SQL nativa
        stats = get_delivery_stats(date_from_dt, date_to_dt)

        # Transformar resultado en lista de dicts
        data = [
            {
                "product_line": row[0],
                "total_deliveries": row[1],
                "avg_hours": float(row[2]) if row[2] is not None else None,
                "avg_minutes": float(row[3]) if row[3] is not None else None,
            }
            for row in stats
        ]

        return Response({"data": data})