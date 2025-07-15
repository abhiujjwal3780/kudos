
from token_serializer import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView as SimpleJWTTokenObtainPairView, TokenRefreshView as SimpleJWTTokenRefreshView

class TokenObtainPairView(SimpleJWTTokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer  
class TokenRefreshView(SimpleJWTTokenRefreshView):
    pass