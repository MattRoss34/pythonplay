import datetime

from django.db import models
from django.utils import timezone


class Note(models.Model):
    title = models.CharField(max_length=50)
    text = models.CharField(max_length=3000)
    mod_date = models.DateTimeField('modified date')

    def __str__(self):
        return '['+self.mod_date.strftime("%m/%d/%Y %-I:%M%p")+'] '+self.title+': '+self.text

    def was_modified_recently(self):
        return self.mod_date >= timezone.now() - datetime.timedelta(days=1)

    def mod_date_short(self):
    	return self.mod_date.strftime("%m/%d/%Y")

    def mod_datetime_long(self):
    	return self.mod_date.strftime("%B %-d, %Y %-I:%M%p")
