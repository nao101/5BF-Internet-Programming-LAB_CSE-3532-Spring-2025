from django import forms
from . models import Booking

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['customer_name', 'customer_email', 'number_of_people', 'travel_date']
        widgets = {
            'travel_date': forms.DateInput(attrs={'type': 'date'})
        }