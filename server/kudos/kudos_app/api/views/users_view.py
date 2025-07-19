from rest_framework import generics, viewsets, status
from kudos_app.models import User, Organization, Kudos
from kudos_app.api.serializers.users_serializer import UserSerializer
from kudos_app.api.serializers.kudos_serializer import KudosSerializer
from rest_framework_simplejwt.views import TokenObtainPairView as SimpleJWTTokenObtainPairView, TokenRefreshView as SimpleJWTTokenRefreshView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from kudos_app.api.utils.response_utils import success_response, error_response

class UserListCreateView(generics.ListCreateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return User.objects.filter(organization_id=org_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return success_response(data=serializer.data, message="User list fetched successfully")

    def create(self, request, *args, **kwargs):
        org_id = self.kwargs['org_id']
        organization = Organization.objects.get(id=org_id)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(organization=organization)
            return success_response(data=serializer.data, message="User created successfully", status_code=status.HTTP_201_CREATED)
        return error_response(message="User creation failed", errors=serializer.errors)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return User.objects.filter(organization_id=org_id)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return success_response(data=serializer.data, message="User details fetched successfully")

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data, message="User updated successfully")
        return error_response(message="User update failed", errors=serializer.errors)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return success_response(message="User deleted successfully")

class UserKudosReceivedView(generics.ListAPIView):
    serializer_class = KudosSerializer

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        user_id = self.kwargs['user_id']
        return Kudos.objects.filter(organization_id=org_id, receiver_id=user_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return success_response(data=serializer.data, message="Received kudos fetched successfully")

class UserKudosGivenView(generics.ListAPIView):
    serializer_class = KudosSerializer

    def get_queryset(self):
        org_id = self.kwargs['org_id']
        user_id = self.kwargs['user_id']
        return Kudos.objects.filter(organization_id=org_id, sender_id=user_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return success_response(data=serializer.data, message="Given kudos fetched successfully")

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return success_response(data=serializer.data, message="Current user fetched successfully")
