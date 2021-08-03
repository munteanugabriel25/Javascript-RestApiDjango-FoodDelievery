# Generated by Django 3.2.5 on 2021-08-03 19:48

from django.db import migrations, models
import item.models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='id',
            field=models.CharField(blank=True, default=item.models.generate_random_id, max_length=20, primary_key=True, serialize=False, unique=True),
        ),
    ]