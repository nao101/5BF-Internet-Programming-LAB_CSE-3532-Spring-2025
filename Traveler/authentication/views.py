from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import SignupForm, LoginForm
from frontend.models import Booking
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.http import JsonResponse


MY_EMAIL = "sbxp1966@gmail.com"
MY_PASSWORD = "gogatmuwcjufqlet"

def register(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()  # Save data to the database
            return redirect('home')  # Redirect to a success page or message
    else:
        form = SignupForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username = username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, "Login Successfull")
                return redirect('home')
            else:
                messages.error(request, "Incorrect Username or Password")
        return render(request, 'login.html', {'form': form} )
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('login')


@login_required
def dashboard(request):
    bookings = Booking.objects.all()

    context = {
        'bookings': bookings
    }

    return render(request, 'dashboard.html', context)


def send_booking_email(request, booking_id):
    print("send_booking_email")
    if request.method == "POST":
        try:
            booking = Booking.objects.get(uuid = booking_id)
            
            # Email configuration
            sender_email = MY_EMAIL
            sender_password = MY_PASSWORD
            recipient_email = booking.customer_email

            # Create email content
            subject = f"🌟 Booking Confirmation - #{booking.id} 🌟"

            body = f"""
            🛫 **Your Booking Details** 🛬

            📃 **Booking ID:** {booking.id}  
            👤 **Customer Name:** {booking.customer_name}  
            📦 **Package Selected:** {booking.package.title}  
            👥 **Number of People:** {booking.number_of_people}  
            📅 **Travel Date:** {booking.travel_date}  
            🟢 **Booking Status:** {booking.booking_status}  
            💰 **Total Price:** ₹{booking.total_price}  

            🌈 Thank you for choosing us! We wish you a wonderful journey ahead. 🌍✨

            For any assistance, feel free to contact us! 📞
            """

            # Create the email message
            message = MIMEMultipart()
            message["From"] = sender_email
            message["To"] = recipient_email
            message["Subject"] = subject
            message.attach(MIMEText(body, "plain"))

            print("Sending email")

            # Send email using SMTP
            with smtplib.SMTP("smtp.gmail.com") as server:
                server.starttls()  # Secure the connection
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, recipient_email, message.as_string())
                print("Email sent successfully.")

            return JsonResponse({"message": "Email sent successfully."})

        except Booking.DoesNotExist:
            return JsonResponse({"message": "Booking not found."}, status=404)
            print("Invalid request")
        except Exception as e:
            return JsonResponse({"message": f"Failed to send email: {str(e)}"}, status=500)
            print("Invalid request")
    return JsonResponse({"message": "Invalid request."}, status=400)
