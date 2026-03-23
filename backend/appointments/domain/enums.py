from django.db import models

class Supplier(models.TextChoices):
    SAMARA = "SAMARA", "Samara Ropa intima"
    URBAN = "URBAN", "Costura Urbana"
    GOLDEN = "GOLDEN", "Hilo Dorado"


class ProductLine(models.TextChoices):
    SHIRTS = "SHIRTS", "Camisetas"
    PANTS = "PANTS", "Pantalones"
    SHOES = "SHOES", "Zapatos"
    ACCESSORIES = "ACCESSORIES", "Accesorios"


class Status(models.TextChoices):
    SCHEDULED = "SCHEDULED", "Programada"
    IN_PROGRESS = "IN_PROGRESS", "En proceso"
    DELIVERED = "DELIVERED", "Entregada"
    CANCELLED = "CANCELLED", "Cancelada"