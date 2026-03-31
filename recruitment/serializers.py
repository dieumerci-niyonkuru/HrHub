from rest_framework import serializers
from .models import Candidate, Interview

class CandidateSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Candidate
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at', 'updated_at']
    
    def get_created_by_name(self, obj):
        return obj.created_by.get_full_name() if obj.created_by else None

class InterviewSerializer(serializers.ModelSerializer):
    candidate_name = serializers.SerializerMethodField()
    interviewer_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Interview
        fields = '__all__'
        read_only_fields = ['created_at']
    
    def get_candidate_name(self, obj):
        return str(obj.candidate)
    
    def get_interviewer_name(self, obj):
        return obj.interviewer.get_full_name()
