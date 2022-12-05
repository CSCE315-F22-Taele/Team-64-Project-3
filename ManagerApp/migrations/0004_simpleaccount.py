# Generated by Django 4.1.3 on 2022-12-04 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ManagerApp', '0003_delete_account'),
    ]

    operations = [
        migrations.CreateModel(
            name='SimpleAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(max_length=150, verbose_name='First Name')),
                ('last_name', models.CharField(max_length=150, verbose_name='last Name')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
    ]
