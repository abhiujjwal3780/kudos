from rest_framework import generics
from kudos_app.models import Organization
from kudos_app.api.serializers.organizations_serializer import OrganizationSerializer

class OrganizationListCreateView(generics.ListCreateAPIView):
    """
    A viewset for viewing and editing organization instances.
    """
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned organizations to a given user,
        by filtering against a `user` query parameter in the URL.
        """
        queryset = super().get_queryset()
        user = self.request.query_params.get('user', None)
        if user is not None:
            queryset = queryset.filter(users__id=user)
        return queryset

class OrganizationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    lookup_url_kwarg = 'org_id'