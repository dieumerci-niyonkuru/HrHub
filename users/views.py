from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils import timezone
from datetime import timedelta
import uuid
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
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'message': 'Registration successful! You can now login.',
            'user': {
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role
            }
        }, status=status.HTTP_201_CREATED)

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

class ForgotPasswordView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            user.password_reset_token = uuid.uuid4()
            user.password_reset_expires = timezone.now() + timedelta(hours=24)
            user.save()
            
            reset_link = f"https://hr-hub-9j1a.vercel.app/reset-password/{user.password_reset_token}/"
            
            print(f"\n{'='*60}")
            print(f"🔐 PASSWORD RESET REQUEST")
            print(f"To: {user.email}")
            print(f"Reset Link: {reset_link}")
            print(f"Expires in: 24 hours")
            print(f"{'='*60}\n")
            
            return Response({
                'message': 'Password reset link has been sent to your email.',
                'reset_link': reset_link
            }, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({
                'message': 'If an account exists with this email, a reset link has been sent.'
            }, status=status.HTTP_200_OK)

class ResetPasswordView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, token):
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')
        
        if not new_password or not confirm_password:
            return Response({'error': 'Both password fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if new_password != confirm_password:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        if len(new_password) < 8:
            return Response({'error': 'Password must be at least 8 characters'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(
                password_reset_token=token,
                password_reset_expires__gt=timezone.now()
            )
            
            user.set_password(new_password)
            user.password_reset_token = uuid.uuid4()
            user.password_reset_expires = None
            user.save()
            
            print(f"\n✅ Password reset successful for: {user.email}")
            
            return Response({
                'message': 'Password reset successful! You can now login with your new password.'
            }, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({
                'error': 'Invalid or expired reset token'
            }, status=status.HTTP_400_BAD_REQUEST)

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
