from django.urls import path

from rest_framework_simplejwt.views import (
    token_obtain_pair,
    token_refresh
)

from .views import (
    UserCreateAPIView,
    NoteDestroyAPIView,
    NoteListCreateAPIView
)

urlpatterns = [
    path('token/', token_obtain_pair),
    path('token/refresh/', token_refresh),

    path('register/', UserCreateAPIView.as_view()),
    path('notes/<str:pk>/', NoteDestroyAPIView.as_view()),
    path('notes/', NoteListCreateAPIView.as_view()),
]
