# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-06-02 04:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='text',
            field=models.CharField(max_length=3000),
        ),
    ]
