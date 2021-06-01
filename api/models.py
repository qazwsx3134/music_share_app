from django.db import models
import string
import random

def generate_unique_code():
    length = 6
    
    while True:
        room_code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(room_code=room_code).count() ==0:
            break

    return room_code

# Create your models here.


class Room(models.Model):
    room_code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

#HW
#School

class School(models.Model):
    name = models.CharField(max_length=60)
    school_id = models.CharField(max_length=60)

    def __str__(self):
        return self.name

# Teacher

class Teacher(models.Model):
    name = models.CharField(max_length=60)
    email = models.EmailField(("email"), max_length=254)

    school_id = models.ForeignKey('School', on_delete=models.CASCADE)
    courses = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Course

class Course(models.Model):
    name = models.CharField(max_length=60)
    description = models.TextField(blank=True, default='')

    homeworks = models.ForeignKey('School', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Homework

class Homework(models.Model):
    name = models.CharField(max_length=60)

    student_homeworks = models.ForeignKey('StudentHomework', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Student

class Student(models.Model):
    name = models.CharField(max_length=60)
    student_code = models.CharField(max_length=60)

    School = models.ForeignKey('School', on_delete=models.CASCADE, related_name='school_code')
    courses = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# StudentHomework

class StudentHomework(models.Model):
    name = models.CharField(max_length=60)
    image = models.URLField(blank=True)
    review_image = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    student_id = models.ForeignKey('Student', on_delete=models.CASCADE)
    comments = models.ForeignKey('Comments', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Comments

class Comments(models.Model):
    comment = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name