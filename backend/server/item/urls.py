from django.urls import path
from . import views

urlpatterns = [
    path('', views.SearchItemView.as_view()),
    path('<str:id>/', views.RetrieveItemView.as_view()),
    path('category/<str:category>/', views.ListCategoryView.as_view()),
]