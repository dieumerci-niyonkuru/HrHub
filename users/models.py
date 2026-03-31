from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra):
        if not email:
            raise ValueError('Email required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra):
        extra.setdefault('is_staff', True)
        extra.setdefault('is_superuser', True)
        extra.setdefault('role', 'SUPER_HR')
        extra.setdefault('is_verified', True)
        return self.create_user(email, password, **extra)

class User(AbstractUser):
    ROLE_CHOICES = [
        ('SUPER_HR', 'Super HR'),
        ('HR_ASSISTANT', 'HR Assistant'),
        ('INTERVIEWER', 'Interviewer'),
    ]
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='INTERVIEWER')
    phone = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    position = models.CharField(max_length=100, blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    is_available = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    email_verification_token = models.UUIDField(default=uuid.uuid4, editable=False)
    password_reset_token = models.UUIDField(default=uuid.uuid4, editable=False)
    password_reset_expires = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = UserManager()

    def __str__(self):
        return f'{self.get_full_name()} ({self.email})'

    @property
    def is_super_hr(self):
        return self.is_superuser or self.role == 'SUPER_HR'

    @property
    def is_hr_assistant(self):
        return self.is_staff or self.role == 'HR_ASSISTANT'
