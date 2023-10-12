from django.db import models

# Create your models here.
class Profile(models.Model):
    email = models.CharField(max_length=40, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    secureLevel = models.IntegerField(default=1)
    brithDate = models.DateTimeField(null=True)

class Account(models.Model):
    username = models.CharField(unique=True, max_length=20)
    password = models.CharField(max_length=20)
    authority = models.IntegerField(default=1)
    profileid = models.ForeignKey(Profile,on_delete=models.DO_NOTHING,blank=True, null=True)


class Address(models.Model):
    country = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    city = models.CharField( max_length=20)
    street = models.CharField(max_length=20)
    profileid = models.OneToOneField(Profile, on_delete=models.CASCADE, primary_key=True)


class Event(models.Model):
    eventNote = models.CharField(max_length=200, blank=True, null=True)
    eventAddress = models.CharField(max_length=100, blank=True, null=True)
    participantsid = models.ForeignKey(Profile, models.DO_NOTHING, null=True)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    accountid = models.ForeignKey(Account, on_delete=models.CASCADE, blank=True, null=True)

class Name(models.Model):
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    midName = models.CharField(max_length=20, blank=True, null=True)
    profileid = models.OneToOneField(Profile, on_delete=models.CASCADE, primary_key=True)



class Task(models.Model):
    startDate = models.DateTimeField(null=True)
    endDate = models.DateTimeField(null=True)
    status = models.IntegerField(null=True)
    accountid = models.ForeignKey(Account, models.DO_NOTHING,blank=True, null=True)
    eventid = models.ForeignKey(Event, models.DO_NOTHING,blank=True, null=True)



class Verification(models.Model):
    email = models.CharField(max_length=50,unique=True)
    phone = models.CharField(max_length=20)
    securityQuestion = models.CharField( max_length=100, blank=True, null=True)
    securityAnswer = models.CharField(max_length=45, blank=True, null=True)
    accountid = models.OneToOneField(Account, on_delete=models.CASCADE, primary_key=True)


class Test(models.Model):
    name = models.CharField(max_length=100)
