from django.urls import path
from . import views

urlpatterns = [
    path('candidates/', views.CandidateListCreateView.as_view(), name='candidate-list'),
    path('candidates/<int:pk>/', views.CandidateDetailView.as_view(), name='candidate-detail'),
    path('interviews/', views.InterviewListCreateView.as_view(), name='interview-list'),
    path('interviews/<int:pk>/', views.InterviewDetailView.as_view(), name='interview-detail'),
    path('my-interviews/', views.MyInterviewsView.as_view(), name='my-interviews'),
]
