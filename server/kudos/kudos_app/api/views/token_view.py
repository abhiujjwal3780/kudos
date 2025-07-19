from kudos_app.api.serializers.token_serializer import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView as SimpleJWTTokenObtainPairView, TokenRefreshView as SimpleJWTTokenRefreshView
from kudos_app.api.utils.response_utils import success_response, error_response
from rest_framework import status

class TokenObtainPairView(SimpleJWTTokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            return success_response(data=response.data, message="Token obtained successfully")
        return error_response(message="Token obtain failed", errors=response.data, status_code=response.status_code)

class TokenRefreshView(SimpleJWTTokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            return success_response(data=response.data, message="Token refreshed successfully")
        return error_response(message="Token refresh failed", errors=response.data, status_code=response.status_code)