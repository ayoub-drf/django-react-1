from rest_framework.permissions import (
    AllowAny,
    IsAuthenticatedOrReadOnly,
    IsAuthenticated
)
from rest_framework.generics import (
    ListCreateAPIView,
    DestroyAPIView,
    CreateAPIView
)

from django.contrib.auth.models import User


from .serializers import (
    UserSerializer,
    NoteSerializer
)
from .models import Note

class NoteListCreateAPIView(ListCreateAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer = serializer.save(owner=self.request.user)
        return serializer
    
class NoteDestroyAPIView(DestroyAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)
    
class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

