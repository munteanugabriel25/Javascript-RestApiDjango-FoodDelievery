# Generated by Django 3.2.5 on 2021-08-01 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15, unique=True)),
                ('unit', models.CharField(choices=[('grams', 'g'), ('piece', 'pc'), ('milliliters', 'ml'), ('undefined', ' '), ('table_spoon', 'tsp'), ('cup', 'cup')], default='undefined', max_length=100)),
                ('quantity', models.CharField(max_length=8)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]
