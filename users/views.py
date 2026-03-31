from rest_framework import generics, status, serializers
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from .serializers import UserSerializer, RegisterSerializer

class IsSuperHR(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   (request.user.is_superuser or request.user.role == 'SUPER_HR'))

class IsHROrAbove(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   (request.user.is_superuser or request.user.is_staff or 
                    request.user.role in ['SUPER_HR', 'HR_ASSISTANT']))

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.role
        token['full_name'] = user.get_full_name()
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_verified and not self.user.is_superuser:
            raise serializers.ValidationError('Please verify your email before logging in.')
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'full_name': self.user.get_full_name(),
            'role': self.user.role,
            'is_verified': self.user.is_verified,
        }
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class VerifyEmailView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        try:
            user = User.objects.get(email_verification_token=token)
            if user.is_verified:
                return Response({'message': 'Email already verified'})
            user.is_verified = True
            user.save()
            return Response({'message': 'Email verified successfully! You can now login.'})
        except User.DoesNotExist:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class MeView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class InterviewerListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsHROrAbove]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(role='INTERVIEWER')

    def perform_create(self, serializer):
        serializer.save(role='INTERVIEWER', is_verified=True)

class InterviewerDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsHROrAbove]
    serializer_class = UserSerializer
    queryset = User.objects.filter(role='INTERVIEWER')
