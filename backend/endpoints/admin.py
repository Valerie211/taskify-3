from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin


class MessagesAdmin(ImportExportModelAdmin):
    pass

admin.site.register(Messages, MessagesAdmin)
# Register your models here.
admin.site.register(Project)
admin.site.register(Mood)
admin.site.register(Task)
admin.site.register(TaskReflection)
