from django.db import models

# Create your models here.


class reminder_tb(models.Model):

    heading = models.CharField(max_length=20)

    created_date = models.DateTimeField(auto_now_add = True)

    reminder_time = models.DateTimeField()

    description = models.CharField(max_length=40)
    
    
    def __str__(self):
        return self.heading

    