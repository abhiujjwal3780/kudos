from rest_framework import generics, viewsets
from kudos_app.models import User, Organization, Kudos
from kudos_app.api.serializers.users_serializer import UserSerializer
from kudos_app.api.serializers.kudos_serializer import KudosSerializer

class UserListCreateView(generics.ListCreateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return User.objects.filter(organization_id=org_id)

    def perform_create(self, serializer):
        org_id = self.kwargs['org_id']
        organization = Organization.objects.get(id=org_id)
        serializer.save(organization=organization)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return User.objects.filter(organization_id=org_id)

class UserKudosReceivedView(generics.ListAPIView):
    serializer_class = KudosSerializer

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        user_id = self.kwargs['user_id']
        return Kudos.objects.filter(organization_id=org_id, receiver_id=user_id)

class UserKudosGivenView(generics.ListAPIView):
    serializer_class = KudosSerializer

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        user_id = self.kwargs['user_id']
        return Kudos.objects.filter(organization_id=org_id, sender_id=user_id)
