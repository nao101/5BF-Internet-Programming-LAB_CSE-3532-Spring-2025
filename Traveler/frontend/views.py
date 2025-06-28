# views.py
from django.shortcuts import render, redirect, get_object_or_404
from . models import TourPackage, Booking
from . forms import BookingForm
from django.contrib.auth.decorators import login_required



def success_view(request):
    return render(request, 'success.html')


def home(request):
    return render(request,'index.html')

def about(request):
    return render(request,'about.html')

def tour_packages(request):
    packages = TourPackage.objects.filter(is_active=True)

    context = {
        'packages': packages
    }

    return render(request,'tour_packages.html', context)

def destination(request):
    return render(request,'destination.html')

def team(request):
    return render(request,'team.html')

@login_required
def checkout(request, package_uuid):

    package = get_object_or_404(TourPackage, uuid=package_uuid)

    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            booking = form.save(commit=False)
            booking.package = package
            booking.total_price = package.price * booking.number_of_people
            booking.save()
            return redirect('booking_success', booking_uuid=booking.uuid)  # Redirect to success page
    else:
        form = BookingForm()

    context = {
        'package': package,
        'form': form
    }

    return render(request, 'checkout.html', context)

@login_required
def booking_success(request, booking_uuid):
    booking = get_object_or_404(Booking, uuid=booking_uuid)
    return render(request, 'booking_success.html', {'booking': booking})
