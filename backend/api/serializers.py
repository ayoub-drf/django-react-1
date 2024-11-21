from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Note

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        return user

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(read_only=True)
    class Meta:
        model = Note
        fields = "__all__"
