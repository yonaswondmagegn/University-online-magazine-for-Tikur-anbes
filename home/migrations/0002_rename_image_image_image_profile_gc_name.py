# Generated by Django 4.1.7 on 2023-03-07 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image',
            old_name='Image',
            new_name='image',
        ),
        migrations.AddField(
            model_name='profile',
            name='gc_name',
            field=models.CharField(max_length=225, null=True),
        ),
    ]