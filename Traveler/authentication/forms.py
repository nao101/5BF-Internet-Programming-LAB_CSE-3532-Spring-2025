# forms.py
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class SignupForm(UserCreationForm):

    username = forms.CharField(
        label='',
        widget= forms.TextInput(attrs={'class': 'form-control p-4', 'placeholder' : 'Username'} ))
    
    email = forms.EmailField(
        required=True,
        label='',
        widget= forms.EmailInput(attrs={'class': 'form-control p-4', 'placeholder' : 'Your email'} ))
    
    password1 = forms.CharField(
        label='',
        widget= forms.PasswordInput(attrs={'class': 'form-control p-4', 'placeholder' : 'Password'} ))
    
    password2 = forms.CharField(
        label='',
        widget= forms.PasswordInput(attrs={'class': 'form-control p-4', 'placeholder' : 'Confirm password'} ))
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        
        
class LoginForm(forms.Form):
    username = forms.CharField(
        label='',
        widget=forms.TextInput(attrs={'class': 'form-control p-4', 'placeholder' : 'Username'} )
    )
    password = forms.CharField(
        label='',
        widget=forms.PasswordInput(attrs={'class': 'form-control p-4', 'placeholder' : 'Password'} )

        )
    
    