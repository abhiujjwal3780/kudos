from rest_framework import serializers
from kudos_app.models import Kudos, KudosAssignment, User
from kudos_app.constants import (
    KUDOS_STATUS_CHOICES, KUDOS_STATUS_VALUES,
    ERROR_SAME_USER, ERROR_ORG_MISMATCH, ERROR_EMPTY_MESSAGE,
    ERROR_POINTS_MIN, ERROR_SELF_KUDOS, ERROR_START_AFTER_END,
    ERROR_INVALID_STATUS, ERROR_START_REQUIRED, ERROR_END_REQUIRED
)
from kudos_app.api.serializers.users_serializer import UserSimpleSerializer

class KudosSerializer(serializers.ModelSerializer):
    sender = UserSimpleSerializer(read_only=True)
    receiver = UserSimpleSerializer(read_only=True)

    class Meta:
        model = Kudos
        fields = ['id', 'sender', 'receiver', 'level', 'behaviour', 'message', 'points', 'created_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if not instance.sender or not instance.receiver:
            data['sender'] = None
            data['receiver'] = None
        return data

    
    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request.user != instance.user:
            raise serializers.ValidationError(ERROR_SELF_KUDOS)
        return super().update(instance, validated_data)
    
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.context.get('request')
        return context
    
    
    def validate_message(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError(ERROR_EMPTY_MESSAGE)
        return value
    
    def validate_points(self, value):
        if value < 1:
            raise serializers.ValidationError(ERROR_POINTS_MIN)
        return value
    
    def validate_receiver(self, value):
        if value == self.context['request'].user:
            raise serializers.ValidationError(ERROR_SELF_KUDOS)
        return value
    
    def validate(self, attrs):
        sender = attrs.get('sender')
        receiver = attrs.get('receiver')
        message = attrs.get('message', '').strip()

        if not message:
            raise serializers.ValidationError(ERROR_EMPTY_MESSAGE)

        # Convert sender/receiver to User objects if they are IDs
        if isinstance(sender, int):
            sender = User.objects.filter(id=sender).first()
        if isinstance(receiver, int):
            receiver = User.objects.filter(id=receiver).first()

        if sender and receiver:
            if sender == receiver:
                raise serializers.ValidationError(ERROR_SAME_USER)
            if sender.organization_id != receiver.organization_id:
                raise serializers.ValidationError(ERROR_ORG_MISMATCH)
        if sender is None or receiver is None:
            raise serializers.ValidationError("Sender or receiver does not exist.")

        return attrs

    def create(self, validated_data):
        kudos_assignment = validated_data.get('kudos_assignment')
        instance = super().create(validated_data)
        if kudos_assignment:
            kudos_assignment.status = KUDOS_STATUS_CHOICES[1][0]  # 'completed'
            kudos_assignment.save(update_fields=['status'])
        return instance


class KudosAssignmentSerializer(serializers.ModelSerializer):
    sender = UserSimpleSerializer(read_only=True)
    receiver = UserSimpleSerializer(read_only=True)
    organization = serializers.StringRelatedField(read_only=True)  # or use a custom serializer if you want more org details

    class Meta:
        model = KudosAssignment
        fields = [
            'id', 'sender', 'receiver', 'organization',
            'assignment_start_date', 'assignment_end_date', 'status'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, attrs):
        sender = attrs.get('sender')
        receiver = attrs.get('receiver')

        # Convert sender/receiver to User objects if they are IDs
        if isinstance(sender, int):
            sender = User.objects.filter(id=sender).first()
        if isinstance(receiver, int):
            receiver = User.objects.filter(id=receiver).first()

        if sender and receiver:
            if sender == receiver:
                raise serializers.ValidationError(ERROR_SAME_USER)
            if sender.organization != receiver.organization:
                raise serializers.ValidationError(ERROR_ORG_MISMATCH)
        if 'assignment_start_date' in attrs and 'assignment_end_date' in attrs:
            if attrs['assignment_start_date'] > attrs['assignment_end_date']:
                raise serializers.ValidationError(ERROR_START_AFTER_END)
        if 'status' in attrs and attrs['status'] not in KUDOS_STATUS_VALUES:
            raise serializers.ValidationError(ERROR_INVALID_STATUS)
        if 'assignment_start_date' in attrs and not attrs['assignment_start_date']:
            raise serializers.ValidationError(ERROR_START_REQUIRED)
        if 'assignment_end_date' in attrs and not attrs['assignment_end_date']:
            raise serializers.ValidationError(ERROR_END_REQUIRED)
        return super().validate(attrs)

