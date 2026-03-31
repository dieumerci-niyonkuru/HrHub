from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'full_name', 'role', 
                  'phone', 'department', 'is_available', 'is_verified', 'created_at']
        read_only_fields = ['id', 'created_at', 'is_verified']
    
    def get_full_name(self, obj):
        return obj.get_full_name()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'confirm_password', 
                  'phone', 'department']
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.role = 'INTERVIEWER'
        user.is_verified = False
        user.save()
        
        # Print verification link to console
        verification_link = f"http://localhost:5173/verify-email/{user.email_verification_token}/"
        print(f"\n{'='*60}")
        print(f"VERIFICATION EMAIL SENT TO: {user.email}")
        print(f"Click to verify: {verification_link}")
        print(f"{'='*60}\n")
        
        return user
