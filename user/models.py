from django.db import models


# `ProfileID` int(11) NOT NULL AUTO_INCREMENT COMMENT '简介ID',
# `Email` varchar(20) DEFAULT NULL COMMENT '邮件',
# `Phone` varchar(20) DEFAULT NULL COMMENT '手机',
# `SecureLevel` int(11) NOT NULL COMMENT '安全级别',
# `BrithDate` datetime DEFAULT NULL COMMENT '生日',
# Personal information table
class Profile(models.Model):
    ProfileID = models.AutoField(primary_key=True, db_column='ProfileID')
    Email = models.CharField(max_length=20, db_column='Email')
    Phone = models.CharField(max_length=20, db_column='Phone')
    SecureLevel = models.IntegerField(db_column='SecureLevel')
    BrithDate = models.DateTimeField(db_column='BrithDate')

    class Meta:
        db_table = 'Profile'

    def to_dict(self):
        return {
            'ProfileID': self.ProfileID,
            'Email': self.Email,
            'Phone': self.Phone,
            'SecureLevel': self.SecureLevel,
            'BrithDate': self.BrithDate
        }


# Account table
class Account(models.Model):
    AccountID = models.AutoField(primary_key=True, db_column='AccountID')
    PassWord = models.CharField(max_length=20, db_column='PassWord')
    UserName = models.CharField(max_length=20, db_column='UserName')
    Authority = models.IntegerField(db_column='Authority')
    ProfileID = models.IntegerField(db_column='ProfileID')

    class Meta:
        db_table = 'Account'

    def to_dict(self):
        return {
            'AccountID': self.AccountID,
            # 'PassWord': self.PassWord,
            'UserName': self.UserName,
            'Authority': self.Authority,
            'ProfileID': self.ProfileID,
            'Profile': Profile.objects.get(ProfileID=self.ProfileID).to_dict()
        }
