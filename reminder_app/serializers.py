from rest_framework import serializers
from .models import reminder_tb

class reminder_serializer(serializers.ModelSerializer):
    class Meta:
        model = reminder_tb
        fields = "__all__"
