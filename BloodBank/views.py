from django.urls import path
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate
from django.db import models
from django.contrib.auth.models import User


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})



urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    
]

class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    blood_group = models.CharField(max_length=3)
    last_donated = models.DateField(null=True, blank=True)

class BloodBank(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

class DonationRequest(models.Model):
    blood_group = models.CharField(max_length=3)
    quantity = models.IntegerField()
    blood_bank = models.ForeignKey(BloodBank, on_delete=models.CASCADE)
    requested_by = models.ForeignKey(User, on_delete=models.CASCADE)
    requested_on = models.DateField(auto_now_add=True)






const uri = "mongodb+srv://bloodDonation:6ynWPE15cXJRnqYT@cluster0.mg3dwiq.mongodb.net/donorDb?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const donorCollection = client.db("donorDb").collection("donor");

    app.post("/donor", async (req, res) => {
       {
        const newDonor = req.body;
        const result = await donorCollection.insertOne(newDonor);
        res.send(result)
      } 
    });

def donor_list(request):
    donors = Donor.objects.all()
    return render(request, 'donor_list.html', {'donors': donors})

def blood_bank_list(request):
    blood_banks = BloodBank.objects.all()
    return render(request, 'blood_bank_list.html', {'blood_banks': blood_banks})

def donation_request_list(request):
    donation_requests = DonationRequest.objects.all()
    return render(request, 'donation_request_list.html', {'donation_requests': donation_requests})






urlpatterns = [
    path('donors/', donor_list, name='donor_list'),
    path('blood-banks/', blood_bank_list, name='blood_bank_list'),
    path('donation-requests/', donation_request_list, name='donation_request_list'),
    
]