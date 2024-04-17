from django.urls import path
from . import views

app_name = "chats"

urlpatterns = [
    path("", views.index, name="index"),
    # path('direct/<username>', views.Directs, name="directs"),
    # path('send/', views.SendDirect, name="send-directs"),
    # path('delete-message/<int:pk>.', views.deleteMessage, name='delete-message'),
    # path("task/", views.task, name="task"),
    # path("shead_task/", views.shead_task, name="shead_task"),
    # path("emoji_send/", views.emoji_send, name="emoji_send"),
    # path("shared_task/", views.shared_task, name="shared_task"),
    # path("chat/", views.chat, name="chat"),

    path("api/create_project/", views.create_project, name="create_project"),
    path("api/create_task/<int:pk>/", views.create_task, name="create_task"),
    path("api/user_list/", views.user_list, name="user_list"),
    path("api/reflection/", views.TaskReflections, name="reflection"),
    path("api/get_reflection/<int:creator>/", views.GetTaskReflections, name="get_reflection"),
    path('api/task-reflections/<int:task_reflection_id>/', views.edit_or_delete_task_reflection, name='edit_or_delete_task_reflection'),
    path('api/update_task/<int:task_id>/', views.edit_task, name='edit_task'),

    # path("calendar/", views.calendar, name="calendar"),
    # path("dashboard/", views.dashboard, name="dashboard"),
    # path('completed/', views.completed, name='completed'),
    # path('remaining', views.remaining, name='remaining'),
    # # path('add_task', views.add_task, name='add_task'),
    # path('detail/<str:task_id>', views.task_detail, name='task_detail'),
    # path('toggle_complete/<str:task_id>', views.toggle_complete, name='toggle_complete'),
    path('api/remove_task/<str:task_id>/<int:user_id>/', views.remove_task, name='remove_task'),
    path('api/remove_project/<int:project_id>/<int:user_id>/', views.remove_project, name='remove_project'),
    path('api/update_progress_status/<str:project_id>/', views.update_progress_status, name='update_progress_status'),
    path('api/update_task_progress_status/<str:task_id>/', views.update_task_progress_status, name='update_task_progress_status'),
    # path('save_mood_data/', views.save_mood_data, name='save_mood_data'),
    # path('update-task/<int:task_id>/', views.update_task, name='update_task'),
    # path('settings', views.settings, name='settings'),
    # path('change-password/', views.change_password, name='change_password'),
    # path('deactivate/', views.deactivate_account, name='deactivate_account'),
    # path("cha")
]