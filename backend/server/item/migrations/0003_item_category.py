# Generated by Django 3.2.5 on 2021-08-01 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0002_auto_20210801_1308'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='category',
            field=models.CharField(choices=[('pizza', 'Pizza'), ('soups', 'Soups'), ('drinks', 'Drinks'), ('others', 'Others')], default='others', max_length=120),
        ),
    ]