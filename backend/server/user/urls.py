from django.urls import path, include
from .views import UserLoginApiView

urlpatterns = [
    path('login/', UserLoginApiView.as_view()),
]
