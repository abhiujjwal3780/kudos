from rest_framework import serializers
from kudos_app.models import Organization
class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {
            'name': {'required': True, 'max_length': 255},
            'description': {'required': False, 'allow_blank': True}
        }   