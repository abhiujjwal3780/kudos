from rest_framework import generics
from kudos_app.models import Kudos, Organization, KudosAssignment
from kudos_app.api.serializers.kudos_serializer import KudosSerializer, KudosAssignmentSerializer


class KudosListCreateView(generics.ListCreateAPIView):
    serializer_class = KudosSerializer

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return Kudos.objects.filter(organization_id=org_id)

    def perform_create(self, serializer):
        org_id = self.kwargs['org_id']
        organization = Organization.objects.get(id=org_id)
        serializer.save(organization=organization)


class KudosDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = KudosSerializer
    lookup_url_kwarg = 'kudos_id'

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return Kudos.objects.filter(organization_id=org_id)
    
class KudosAssignmentListCreateView(generics.ListCreateAPIView):
    serializer_class = KudosAssignmentSerializer

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return KudosAssignment.objects.filter(organization_id=org_id)

    def perform_create(self, serializer):
        org_id = self.kwargs['org_id']
        organization = Organization.objects.get(id=org_id)
        serializer.save(organization=organization)

class KudosAssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = KudosAssignmentSerializer
    lookup_url_kwarg = 'assignment_id'

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return KudosAssignment.objects.filter(organization_id=org_id)
    
