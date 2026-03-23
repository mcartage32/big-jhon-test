import uuid
from django.db import models
from django.conf import settings
from .enums import Supplier, ProductLine, Status

class Appointment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    scheduled_at = models.DateTimeField()
    supplier = models.CharField(max_length=20, choices=Supplier.choices)
    product_line = models.CharField(max_length=20, choices=ProductLine.choices)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.SCHEDULED
    )
    delivered_at = models.DateTimeField(null=True, blank=True)
    observations = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="appointments"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} - {self.supplier} - {self.status}"