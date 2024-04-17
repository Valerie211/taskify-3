from django.db import models
from django.db import models
from PIL import Image
from django.db.models import Max
from django.forms import DateTimeField
from django.conf import settings
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.urls import reverse

# User = settings.AUTH_USER_MODEL
UserModel = get_user_model()

PROGRESS = (
    ("progress", "Progress"),
    ("pending", "Pending"),
    ("testing", "Testing"),
    ("complete", "Complete"),
    ("not_assigned", "Not assigned"),
    ("awaiting", "Awaiting"),
)
MOOD = (
    ("green", "Satisfaction"),
    ("blue", "Calm/Relieved"),
    ("yellow", "Mixed Feelings/Neutral"),
    ("red", "Stressed/Frustrated"),
)
PRIYORITY_CHOICE = (
    ("medium", "Medium"),
    ("low", "Low"),
    ("high", "High"),
)

class Project(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_projects')
    shared_with = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='received_projects', blank=True)
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now=True)
    description = models.TextField(null=True, blank=True)
    due_date = models.DateField(blank=True, null=True)
    progress_status = models.CharField(choices=PROGRESS, max_length=30, default="progress")
    
    def get_absolute_url(self):
        return reverse('chats:create_task', kwargs={'pk': self.pk})

    def __str__(self):
        return self.title

class Mood(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    mood = models.CharField(choices=MOOD, max_length=30, default="green")
    what_contributed_most = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now=True)
    what_challenges_encounterd = models.TextField(null=True, blank=True)
    took_more_or_less_time = models.TextField(null=True, blank=True)
    What_did_you_learn = models.TextField(null=True, blank=True)
    if_approach_task_again = models.TextField(null=True, blank=True)
    done = models.BooleanField(default=False)
    
    # def get_absolute_url(self):
    #     return reverse('chats:create_task', kwargs={'pk': self.pk})

    def __str__(self):
        return self.mood

class Task(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_tasks')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    start_date = models.DateField(blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    due_time = models.CharField(blank=True,max_length=20, null=True)
    emoji = models.CharField(max_length=1, blank=True, null=True)
    emotion_comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now=True)
    pri_status = models.CharField(choices=PRIYORITY_CHOICE, max_length=30, default="medium")
    # completed = models.BooleanField(default=False)
    progress_status = models.CharField(choices=PROGRESS, max_length=30, default="progress")

    @property
    def shared_with_project_users(self):
        return self.project.shared_with.all()

    def __str__(self):
        return self.title



class Messages(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="from_user")
    reciepient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="to_user")
    body = models.TextField(null=True)
    date = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def sender_message(from_user, to_user, body):
        sender_message = Messages(
            user=from_user,
            sender = from_user,
            reciepient = to_user,
            body = body,
            is_read = True
            )
        sender_message.save()
    
        reciepient_message = Messages(
            user=to_user,
            sender = from_user,
            reciepient = from_user,
            body = body,
            is_read = True
            )
        reciepient_message.save()
        return sender_message

    def get_message(user):
        users = []
        messages = Messages.objects.filter(user=user).values('reciepient').annotate(last=Max('date')).order_by('-last')
        for message in messages:
            users.append({
                'user': UserModel.objects.get(pk=message['reciepient']),
                'last': message['last'],
                'unread': Messages.objects.filter(user=user, reciepient__pk=message['reciepient'], is_read=False).count()
            })
        return users
    
class TaskReflection(models.Model):
    # MOOD_CHOICES = [
    #     ('green', 'Satisfaction'),
    #     ('red', 'Stressed/Frustrated'),
    #     ('yellow', 'Mixed Feelings/Neutral'),
    #     ('blue', 'Calm/Relieved'),
    # ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    mood = models.CharField(max_length=10)
    what_contributed_most = models.CharField(max_length=255)
    challenges_encountered = models.TextField()
    took_more_or_less_time = models.TextField()
    what_did_you_learn = models.TextField()
    approach_task_again = models.TextField()
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='tasks')

    def _str_(self):
        return f"Task Feedback for Task ID: {self.task_id}"