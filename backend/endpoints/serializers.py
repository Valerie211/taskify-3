from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        # fields = ['id', 'creator', 'shared_with', 'title', 'created_at', 'description', 'due_date', 'progress_status']
        fields = '__all__'

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['id', 'creator', 'shared_with', 'title', 'created_at', 'description', 'due_date', 'progress_status']
        fields = '__all__'

    # Override create method to handle shared_with field
    def create(self, validated_data):
        shared_with_data = validated_data.pop('shared_with', [])  # Get shared_with data if present, otherwise empty list
        project = Project.objects.create(**validated_data)
        project.shared_with.add(*shared_with_data)  # Add shared_with users to the project
        return project


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields = ['id', 'creator', 'shared_with', 'title', 'created_at', 'description', 'due_date', 'progress_status']
        fields = '__all__'
class TaskReflectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskReflection
        # fields = ['id', 'creator', 'shared_with', 'title', 'created_at', 'description', 'due_date', 'progress_status']
        fields = '__all__'        
        
        