from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Candidate, Interview
from .serializers import CandidateSerializer, InterviewSerializer
from users.views import IsHROrAbove, IsSuperHR

class CandidateListCreateView(generics.ListCreateAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    permission_classes = [IsAuthenticated, IsHROrAbove]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class CandidateDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAuthenticated(), IsSuperHR()]
        return [IsAuthenticated(), IsHROrAbove()]

class InterviewListCreateView(generics.ListCreateAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated, IsHROrAbove]

class InterviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAuthenticated(), IsSuperHR()]
        return [IsAuthenticated()]

class MyInterviewsView(generics.ListAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Interview.objects.filter(interviewer=self.request.user)
