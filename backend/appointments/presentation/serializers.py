from rest_framework import serializers
from appointments.domain.models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    product_line_display = serializers.CharField(source="get_product_line_display", read_only=True)
    supplier_display = serializers.CharField(source="get_supplier_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = Appointment
        fields = "__all__"
        read_only_fields = ["id", "created_by", "created_at", "updated_at"]