from django.db import models
from django.contrib.auth.models import AbstractUser

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Organization(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class User(AbstractUser, BaseModel):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)  
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    manager = models.ForeignKey('self', on_delete=models.CASCADE, null=False, related_name='subordinates')

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='users', null=False)

    def __str__(self):
        return self.username

class Kudos(BaseModel):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_kudos', db_index=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_kudos', db_index=True)
    level = models.CharField(max_length=30, blank=True)
    behaviour = models.CharField(max_length=30, blank=True)
    message = models.TextField()
    points = models.PositiveIntegerField(default=1)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='kudos', null=False, db_index=True)
    kudos_assignment = models.ForeignKey('KudosAssignment', on_delete=models.CASCADE, related_name='kudos', null=True, blank=True)
    def __str__(self):
        return f"Kudos from {self.sender.username} to {self.receiver.username}"
    
class KudosAssignment(BaseModel):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='kudos_assignments', null=False, db_index=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='kudos_assignments', db_index=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_kudos_assignments')
    assignment_start_date = models.DateField(null=True, blank=True, db_index=True)
    assignment_end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], default='pending')
    
    def __str__(self):
        return f"Kudos Assignment from {self.sender.username} to {self.receiver.username} ({self.status})"
