from django.db import models
from django.conf import settings

class Candidate(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Review'),
        ('INTERVIEW', 'Interview'),
        ('HIRED', 'Hired'),
        ('REJECTED', 'Rejected'),
    ]
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    position = models.CharField(max_length=150)
    department = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    skills = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.position}'

class Interview(models.Model):
    INTERVIEW_TYPES = [
        ('PHONE', 'Phone Screen'),
        ('TECHNICAL', 'Technical Interview'),
        ('HR', 'HR Interview'),
        ('FINAL', 'Final Interview'),
    ]
    
    STATUS_CHOICES = [
        ('SCHEDULED', 'Scheduled'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]
    
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='interviews')
    interviewer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'INTERVIEWER'})
    interview_type = models.CharField(max_length=20, choices=INTERVIEW_TYPES, default='TECHNICAL')
    scheduled_at = models.DateTimeField()
    location = models.CharField(max_length=200, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SCHEDULED')
    score = models.PositiveSmallIntegerField(null=True, blank=True)
    feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.candidate} - {self.interview_type}'
