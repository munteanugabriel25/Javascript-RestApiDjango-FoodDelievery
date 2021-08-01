from django.urls import path
from . import views

urlpatterns = [
    path('', views.RetrieveItem.as_view()),
    path('<str:id>/', views.RetrieveItem.as_view()),
]