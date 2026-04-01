from django.contrib import admin
from django.urls import path, include
from .views import home, health

urlpatterns = [
    path('', home, name='home'),
    path('health/', health, name='health'),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/recruitment/', include('recruitment.urls')),
]
