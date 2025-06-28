from django.db import models
from shortuuidfield import ShortUUIDField

class TourPackage(models.Model):
    uuid = ShortUUIDField(unique=True, editable=False)
    destination = models.CharField(max_length=100)  # Example: Thailand, UAE
    duration_days = models.PositiveIntegerField()  # Example: 3 days
    person_capacity = models.PositiveIntegerField()  # Example: 1 person
    title = models.CharField(max_length=200)  # Example: "Discover amazing places of the world with us"
    rating = models.DecimalField(max_digits=3, decimal_places=1)  # Example: 4.5
    review_count = models.PositiveIntegerField()  # Example: 250
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Example: $50
    image = models.ImageField(upload_to='tour_images/')  # For the image shown
    is_active = models.BooleanField(default=True)  # For enabling/disabling the package

    def __str__(self):
        return f"{self.title} - {self.destination}"

class Booking(models.Model):

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    ]
        
    uuid = ShortUUIDField(unique=True, editable=False)
    package = models.ForeignKey(TourPackage, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    number_of_people = models.PositiveIntegerField()
    booking_date = models.DateField(auto_now_add=True)
    travel_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    booking_status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='Pending'
    )

    def save(self, *args, **kwargs):
        self.total_price = self.number_of_people * self.package.price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking by {self.customer_name} for {self.package.title}"
