from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from . import views
import uuid

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('me/', views.MeView.as_view(), name='me'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('verify-email/<uuid:token>/', views.VerifyEmailView.as_view(), name='verify-email'),
    path('forgot-password/', views.ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/<uuid:token>/', views.ResetPasswordView.as_view(), name='reset-password'),
    path('interviewers/', views.InterviewerListCreateView.as_view(), name='interviewer-list'),
    path('interviewers/<int:pk>/', views.InterviewerDetailView.as_view(), name='interviewer-detail'),
]
