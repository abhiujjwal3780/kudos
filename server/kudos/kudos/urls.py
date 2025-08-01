"""
URL configuration for kudos project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.http import JsonResponse

schema_view = get_schema_view(
   openapi.Info(
      title="Kudos API",
      default_version='v1',
      description="API documentation for the Kudos backend",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

def custom_404(request, exception):
    return JsonResponse({
        "success": False,
        "message": "Resource not found",
        "errors": {"detail": "The requested endpoint does not exist."}
    }, status=404)

handler404 = 'kudos.urls.custom_404'  # Update path as needed

urlpatterns = [
    path('admin/', admin.site.urls),
    path('kudos/', include('kudos_app.api.urls')),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
