from django.urls import path, include
from kudos_app.api.views.users_view import (
    UserListCreateView, UserDetailView, UserKudosReceivedView, UserKudosGivenView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from kudos_app.api.views.organizations_view import OrganizationListCreateView, OrganizationDetailView
from kudos_app.api.views.kudos_view import (
    KudosListCreateView, KudosDetailView
)
from kudos_app.api.views.kudos_view import KudosAssignmentListCreateView, KudosAssignmentDetailView

urlpatterns = [

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Organization endpoints (optional, for completeness)
    path('organizations/', OrganizationListCreateView.as_view(), name='organization-list-create'),
    path('organizations/<int:org_id>/', OrganizationDetailView.as_view(), name='organization-detail'),

    # User endpoints (nested under organization)
    path('organizations/<int:org_id>/users/', UserListCreateView.as_view(), name='user-list-create'),
    path('organizations/<int:org_id>/users/<int:user_id>/', UserDetailView.as_view(), name='user-detail'),

    # Kudos endpoints (nested under organization)
    path('organizations/<int:org_id>/kudos/', KudosListCreateView.as_view(), name='kudos-list-create'),
    path('organizations/<int:org_id>/kudos/<int:kudos_id>/', KudosDetailView.as_view(), name='kudos-detail'),

    # User-specific kudos endpoints
    path('organizations/<int:org_id>/users/<int:user_id>/kudos/', UserKudosReceivedView.as_view(), name='user-kudos-received'),
    path('organizations/<int:org_id>/users/<int:user_id>/kudos/given/', UserKudosGivenView.as_view(), name='user-kudos-given'),

    # Kudos assignment endpoints (nested under organization)
    path('organizations/<int:org_id>/kudos-assignments/', KudosAssignmentListCreateView.as_view(), name='kudos-assignment-list-create'),
    path('organizations/<int:org_id>/kudos-assignments/<int:assignment_id>/', KudosAssignmentDetailView.as_view(), name='kudos-assignment-detail'),
]
