from rest_framework import generics, status
from django_filters.rest_framework import DjangoFilterBackend
from kudos_app.models import Kudos, Organization, KudosAssignment
from kudos_app.api.serializers.kudos_serializer import KudosSerializer, KudosAssignmentSerializer
from kudos_app.api.utils.response_utils import success_response, error_response


class KudosListCreateView(generics.ListCreateAPIView):
    serializer_class = KudosSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sender', 'receiver', 'level', 'behaviour', 'points', 'kudos_assignment', 'created_at']

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return Kudos.objects.filter(organization_id=org_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return success_response(data=serializer.data, message="Kudos list fetched successfully")

    def create(self, request, *args, **kwargs):
        org_id = self.kwargs['org_id']
        organization = Organization.objects.get(id=org_id)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(organization=organization)
            return success_response(data=serializer.data, message="Kudos created successfully", status_code=status.HTTP_201_CREATED)
        return error_response(message="Kudos creation failed", errors=serializer.errors)


class KudosDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = KudosSerializer
    lookup_url_kwarg = 'kudos_id'

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return Kudos.objects.filter(organization_id=org_id)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return success_response(data=serializer.data, message="Kudos details fetched successfully")

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, message="Kudos updated successfully")
        return error_response(message="Kudos update failed", errors=serializer.errors)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response(message="Kudos deleted successfully")


class KudosAssignmentListCreateView(generics.ListCreateAPIView):
    serializer_class = KudosAssignmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sender', 'receiver', 'status', 'assignment_start_date', 'assignment_end_date']

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return KudosAssignment.objects.filter(organization_id=org_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return success_response(data=serializer.data, message="Kudos assignments list fetched successfully")

    def create(self, request, *args, **kwargs):
        org_id = self.kwargs['org_id']
        organization = Organization.objects.get(id=org_id)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(organization=organization)
            return success_response(data=serializer.data, message="Kudos assignment created successfully", status_code=status.HTTP_201_CREATED)
        return error_response(message="Kudos assignment creation failed", errors=serializer.errors)


class KudosAssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = KudosAssignmentSerializer
    lookup_url_kwarg = 'assignment_id'

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return KudosAssignment.objects.filter(organization_id=org_id)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return success_response(data=serializer.data, message="Kudos assignment details fetched successfully")

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, message="Kudos assignment updated successfully")
        return error_response(message="Kudos assignment update failed", errors=serializer.errors)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response(message="Kudos assignment deleted successfully")

