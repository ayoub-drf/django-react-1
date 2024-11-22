from rest_framework.permissions import (
    AllowAny,
    IsAuthenticatedOrReadOnly,
    IsAuthenticated
)
from rest_framework.generics import (
    ListCreateAPIView,
    DestroyAPIView,
    CreateAPIView,
    UpdateAPIView
)

from django.contrib.auth.models import User

from rest_framework_simplejwt.authentication import JWTAuthentication


from .serializers import (
    UserSerializer,
    NoteSerializer
)
from .models import Note

class NoteListCreateAPIView(ListCreateAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer = serializer.save(owner=self.request.user)
        return serializer
    
class NoteDestroyAPIView(DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = "pk"
    

class NoteUpdateAPIView(UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = "pk"

    # def get_queryset(self):
    #     return Note.objects.filter(owner=self.request.user)
    
class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

