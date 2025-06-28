from . import views
from django.urls import path
from django.contrib import admin
from django.urls import path


urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),

    path('about/', views.about, name='about'),

    path('destination/', views.destination, name='destination'),

    path('tour_packages/', views.tour_packages, name='tour_packages'),

    path('team/', views.team, name='team'),

    path('checkout/<str:package_uuid>/', views.checkout, name='checkout'),

    path('booking-success/<str:booking_uuid>/', views.booking_success, name='booking_success')

]
