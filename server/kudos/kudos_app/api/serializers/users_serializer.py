from rest_framework.response import Response
from rest_framework import status, serializers
from django.shortcuts import get_object_or_404
from kudos_app.models import Kudos, User
from kudos_app.constants import (
    ERROR_EMAIL_IN_USE,
    ERROR_USERNAME_IN_USE,
    ERROR_PASSWORD_LENGTH,
    ERROR_PASSWORD_DIGIT,
    ERROR_PASSWORD_LETTER,
    ERROR_MANAGER_ORG,
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'organization', 'manager', 'password']
        read_only_fields = ['id']


    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(ERROR_EMAIL_IN_USE)
        return value     
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(ERROR_USERNAME_IN_USE)
        return value    
    
    def validate(self, attrs):
        if 'password' in attrs:
            password = attrs['password']
            if len(password) < 8:
                raise serializers.ValidationError(ERROR_PASSWORD_LENGTH)
            if not any(char.isdigit() for char in password):
                raise serializers.ValidationError(ERROR_PASSWORD_DIGIT)
            if not any(char.isalpha() for char in password):
                raise serializers.ValidationError(ERROR_PASSWORD_LETTER)

        manager = attrs.get('manager')
        organization = attrs.get('organization')
        if manager and organization and manager.organization != organization:
            raise serializers.ValidationError(ERROR_MANAGER_ORG)

        return super().validate(attrs)

