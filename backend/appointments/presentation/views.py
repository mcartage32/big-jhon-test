from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import AppointmentSerializer
from appointments.domain.enums import Supplier, ProductLine, Status
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
            "date": request.query_params.get("date"),
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