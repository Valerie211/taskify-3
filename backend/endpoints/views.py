from django.shortcuts import render,get_object_or_404, redirect, HttpResponse
from django.contrib.auth.decorators import login_required
from .models import *
# from users.models import *
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
from django.contrib.auth import logout
from django.urls import reverse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import get_user_model
# from .forms import *
# Create your views here.

User = get_user_model()


@api_view(['POST'])
def index(request):
    return Response({'data': "its working"}, status=status.HTTP_200_OK)
  
# @login_required
# def create_project(request):
#     try:
#         if request.method == 'POST':
#             title = request.POST.get('title')
#             description = request.POST.get('description')
#             due_date = request.POST.get('due_date')
#             shared_with_usernames = request.POST.getlist('user')
#             shared_with_users = User.objects.filter(username__in=shared_with_usernames)
#             project = Project.objects.create(
#                 creator=request.user,
#                 title=title,
#                 description=description,
#                 due_date=due_date
#             )
#             project.shared_with.add(*shared_with_users)
#             # return redirect('chats:project_detail', pk=project.pk)
#     except (ValueError, TypeError) as e:
#         return JsonResponse({"error": str(e)})
#     # Count projects in different statuses
#     total_completed = Project.objects.filter(progress_status='complete').count()
#     total_in_progress = Project.objects.filter(progress_status='progress').count()
#     total_pending = Project.objects.filter(progress_status='pending').count()
#     total_testing = Project.objects.filter(progress_status='testing').count()
    
#     all_project = Project.objects.all()
#     users = User.objects.all()
    
#     context = {
#         "total_completed": total_completed,
#         "total_in_progress": total_in_progress,
#         "total_pending": total_pending,
#         "total_testing": total_testing,
#         "all_project": all_project,
#         "users": users
#     }
#     return render(request, "advance/project.html", context)

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def create_project(request):
    #     {
#     "creator": 4,
#     "shared_with": [2, 3],
#     "title": "Sample Project",
#     "description": "This is a sample project description.",
#     "due_date": "2024-12-31",
#     "progress_status": "progress"
# }
    try:
        if request.method == 'POST':
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                project = serializer.save(creator=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            users=request.user.id
            print("user-------->",users)
            total_task = Task.objects.filter(creator=users).count()
            total_project = Project.objects.filter(creator=users).count()
            total_completed = Project.objects.filter(progress_status='complete',creator=users).count()
            total_in_progress = Project.objects.filter(progress_status='progress',creator=users).count()
            total_pending = Project.objects.filter(progress_status='pending',creator=users).count()
            total_testing = Project.objects.filter(progress_status='testing',creator=users).count()
            proj = Project.objects.all()
            all_project_serializer = ProjectSerializer(proj, many=True)
            usar = User.objects.all()
            users_serializer = UsersSerializer(usar, many=True) 
            return Response({
                "total_task": total_task,
                "total_project": total_project,
                "total_completed": total_completed,
                "total_in_progress": total_in_progress,
                "total_pending": total_pending,
                "total_testing": total_testing,
                "all_project": all_project_serializer.data,  
                "users": users_serializer.data 
            }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @login_required
# def create_task(request, pk):
#     project = Project.objects.get(id=pk)
#     task_list = project.tasks.all()
#     total_completed = project.tasks.filter(progress_status='complete').count()
#     total_in_progress = project.tasks.filter(progress_status='progress').count()
#     total_pending = project.tasks.filter(progress_status='pending').count()
#     total_testing = project.tasks.filter(progress_status='testing').count()
#     total_not_assigned = project.tasks.filter(progress_status='not_assigned').count()
#     total_awaiting = project.tasks.filter(progress_status='awaiting').count()
#     try:
#         if request.method == 'POST':
#             form = TaskForm(project, request.POST)
#             # print(request.POST)
#             if form.is_valid():
#                 task = form.save(commit=False)
#                 task.project = project
#                 task.creator = request.user
#                 task.save()
#                 return redirect('task_detail', task_id=task.id)
#             else:
#                 print(form.errors,"error")
#         else:
#             form = TaskForm(project)
#     except Exception as e:
#         print("er",e)

#     return render(request, 'advance/task.html', {'form': form, 'task_list': task_list,"total_completed": total_completed,
#         "total_in_progress": total_in_progress,
#         "total_pending": total_pending,
#         "total_not_assigned":total_not_assigned,
#         "total_awaiting":total_awaiting,
#         "total_testing": total_testing,})
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def user_list(request):
    try:
        if request.method == 'GET':
            user = User.objects.all()
            user_list = UsersSerializer(user, many=True)
            return Response({
                'user_list': user_list.data,
            }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST','GET'])
@permission_classes([IsAuthenticated]) 
def create_task(request, pk):

#     {
#     "title": "Task Title",
#     "due_date": "2024-12-31",
#     "creator": 1,
#     "project": 1,
        #"start_date":"2024-3-12",
# }
    try:
        if request.method == 'GET':
            project = Project.objects.get(id=pk)
            total_completed = project.tasks.filter(progress_status='complete').count()
            total_in_progress = project.tasks.filter(progress_status='progress').count()
            total_pending = project.tasks.filter(progress_status='pending').count()
            total_testing = project.tasks.filter(progress_status='testing').count()
            total_not_assigned = project.tasks.filter(progress_status='not_assigned').count()
            total_awaiting = project.tasks.filter(progress_status='awaiting').count()
            task_ = project.tasks.all()
            tasks=Task.objects.all()
            task_list = TaskSerializer(task_, many=True)
            tasks_list = TaskSerializer(tasks, many=True)
            return Response({
                "total_completed": total_completed,
                "total_in_progress": total_in_progress,
                "total_pending": total_pending,
                "total_not_assigned": total_not_assigned,
                "total_awaiting": total_awaiting,
                "total_testing": total_testing,
                'task_list': task_list.data,
                "all_tasks":tasks_list.data
                
            }, status=status.HTTP_200_OK)
        elif request.method == 'POST':
            project = Project.objects.get(id=pk)
            serializer = TaskSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(project=project, creator=request.user)
                return Response({'message': 'Task created successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

# @login_required
# def task(request):
#     user = request.user
#     tasks = Task.objects.filter(creator=user)
#     users = User.objects.all()
#     total_low = Task.objects.filter(creator=user,pri_status="low").count()
#     total_high = Task.objects.filter(creator=user,pri_status="high").count()
#     total_medium = Task.objects.filter(creator=user,pri_status="medium").count()
#     if request.method == "POST":
#         title = request.POST.get('title')
#         description = request.POST.get('description')
#         due_date = request.POST.get('due_date')
#         due_time = request.POST.get('due_time')
#         pri_status = request.POST.get('pri_status')
#         completed = False

#         if title != "" and due_date != "" and due_time !="":
#             task = Task(
#                 creator=user,
#                 title=title,
#                 description=description,
#                 due_date=due_date,
#                 due_time=due_time,
#                 pri_status=pri_status,
#                 completed=completed
#             )
#             task.save()
#             return redirect('/task/')
#     # else:
#     #     return render(request, 'add_task.html')
#     return render(request,"dashbaord/task.html", {
#         'tasks': tasks,
#         'user':users,
#         'total_high':total_high,
#         'total_low':total_low,
#         'total_medium':total_medium,
#     })

# @login_required
# def emoji_send(request):
#     if request.method == 'POST':
#         try:
#             task_id = request.POST['task_id']
#             emojis = request.POST['emojis']  # Fix the parameter name here
#             task = get_object_or_404(Task, pk=task_id)
#             # to_user = get_object_or_404(User, pk=to_user_id)

#             task.emoji = emojis
#             task.save()

#             success = "emoji saved successfully."
#             return JsonResponse({"success": success})
#         except Exception as e:
#             return JsonResponse({"error": str(e)})

#     return JsonResponse({"error": "Invalid request method"})

# @login_required
# def shead_task(request):
#     if request.method == 'POST':
#         try:
#             task_id = request.POST['task_id']
#             to_user_id = int(request.POST['to_users'])  # Fix the parameter name here
#             task = get_object_or_404(Task, pk=task_id)
#             to_user = get_object_or_404(User, pk=to_user_id)
#             task.shared_with.add(to_user)
#             task.save()

#             success = "Task shared successfully."
#             return JsonResponse({"success": success})
#         except Exception as e:
#             return JsonResponse({"error": str(e)})

#     return JsonResponse({"error": "Invalid request method"})
        
#         # if form.is_valid():

#     # return render(request, 'share_task.html', {'form': form})
# @login_required
# def shared_task(request):
#     user = request.user
#     users = User.objects.all()
#     tasks = Task.objects.filter(shared_with=user)
#     total_low = Task.objects.filter(creator=user,pri_status="low").count()
#     total_high = Task.objects.filter(creator=user,pri_status="high").count()
#     total_medium = Task.objects.filter(creator=user,pri_status="medium").count()
#     return render(request, 'dashbaord/shead_task.html', {'tasks': tasks,'user':users,
#         'total_high':total_high,
#         'total_low':total_low,
#         'total_medium':total_medium})

# @login_required
# def completed(request):
#     # Filter tasks based on the logged-in user and completed status
#     user = request.user
#     completed_tasks = Task.objects.filter(creator=request.user, completed=True)
#     users = User.objects.all()
#     total_low = Task.objects.filter(creator=user,pri_status="low").count()
#     total_high = Task.objects.filter(creator=user,pri_status="high").count()
#     total_medium = Task.objects.filter(creator=user,pri_status="medium").count()
#     return render(request, 'dashbaord/completed_task.html', {
#         'tasks': completed_tasks,
#         'user':users,
#         'total_high':total_high,
#         'total_low':total_low,
#         'total_medium':total_medium,
#     })

# def remaining(request):
#     remaining_tasks = Task.objects.filter(completed=False)
#     return render(request, 'remaining.html', {
#         'tasks': remaining_tasks,
#     })

# # def add_task(request):
# #     if request.method == "POST":
# #         title = request.POST.get('title')
# #         description = request.POST.get('description')
# #         due_date = request.POST.get('due_date')
# #         due_time = request.POST.get('due_time')
# #         completed = False

# #         if title != "" and due_date != "" and due_time !="":
# #             task = Task(
# #                 title=title,
# #                 description=description,
# #                 due_date=due_date,
# #                 due_time=due_time,
# #                 completed=completed
# #             )
# #             task.save()
# #             return redirect('home')
# #     else:
# #         return render(request, 'add_task.html') 
# #     return render(request, 'add_task.html')


# def task_detail(request, task_id):
#     task = Task.objects.get(id=task_id)
#     return render(request, 'task_detail.html', {
#         "task": task,
#     })


# def toggle_complete(request, task_id):
#     task = Task.objects.get(id=task_id)
#     if task:
#         task.completed = not task.completed
#         task.save()
#         return redirect('home')



# @login_required
# def settings(request):
#     return render(request, "dashbaord/settings.html")

# @login_required
# def change_password(request):
#     if request.method == 'POST':
#         new_password = request.POST.get('new_password')
#         # Update user's password (you'll need to implement this part based on your user model)
#         request.user.set_password(new_password)
#         request.user.save()
#         return redirect(reverse('login'))
#         return JsonResponse({'success': True})
#         return redirect(reverse('login'))
#     else:
#         return JsonResponse({'success': False, 'error': 'Invalid request method'})

# @login_required
# def deactivate_account(request):
#     if request.method == 'POST':
#         # Perform account deactivation logic here
#         # Example: Set the user's is_active field to False
#         request.user.is_active = False
#         request.user.save()
#         # Log the user out after deactivation
        
#         # Log the user out after deactivation
#         logout(request)

#         # Redirect to login page
#         return redirect('/login/')  # Replace 'login' with the name/url of your login view

#     return JsonResponse({'success': False, 'error': 'Invalid request method'})  # Replace 'login' with the name/url of your login view
#   # Replace with the template path

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_task(request, task_id,user_id):
    try:
        # user = request.user
        print("user----->", user_id)
        print("id---->", task_id)
        task = get_object_or_404(Task, creator=user_id, id=task_id)
        
        if task:
            task.delete()
            return Response({'success': 'Task deleted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    completed = json.loads(request.body).get('completed', False)
    task.completed = completed
    task.save()
    return HttpResponse(status=200)


@api_view(['PUT'])
@permission_classes([IsAuthenticated]) 
def edit_task(request, task_id):

    try:
        task = Task.objects.get(id=task_id)
        user = request.user
        print("user",user)
        if task.creator != request.user:
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)
        
        if request.method == 'PUT':
            task.title = request.data.get('title', task.title)
            task.start_time = request.data.get('start_time', task.start_time)
            task.start_date = request.data.get('start_date', task.start_date)
            task.progress_status = request.data.get('progress_status', task.progress_status)
            task.pri_status = request.data.get('pri_status', task.pri_status)
            task.due_time = request.data.get('due_time', task.due_time)
            task.due_date = request.data.get('due_date', task.due_date)
            task.description = request.data.get('description', task.description)
            task.save()
            return Response({'message': 'Task  updated successfully.'}, status=status.HTTP_200_OK)
    
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
    
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_project(request, project_id,user_id):
    try:
        # user = request.user
        # reflet = TaskReflection.objects.filter(user=creator)
        project = get_object_or_404(Project, creator=user_id, id=project_id)
        if project:
            project.delete()
            return Response({'message': 'Project deleted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_progress_status(request, project_id):
    try:
        # Retrieve the project object
        project = get_object_or_404(Project, id=project_id)
        # Get the new status from the request data
        data = json.loads(request.body)
        new_status = data.get('newStatus')
        
        # Update the progress_status
        project.progress_status = new_status
        project.save()
        
        return Response({'message': 'Project status updated successfully.'}, status=status.HTTP_200_OK)
    
    except Project.DoesNotExist:
        return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_task_progress_status(request, task_id):
    try:
        # Retrieve the task object
        task = get_object_or_404(Task, id=task_id)
        # Get the new status from the request data
        data = json.loads(request.body)
        new_status = data.get('newStatus')
        # Update the progress_status
        task.progress_status = new_status
        task.save()
        
        return Response({'message': 'Task status updated successfully.'}, status=status.HTTP_200_OK)
    
    except Task.DoesNotExist:
        return Response({'error': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
# @login_required        
# @require_POST
# def update_progress_status(request, project_id):
#     try:
#         # Retrieve the project object
#         project = Project.objects.get(id=project_id)
#         # Get the new status from the request data
#         data = json.loads(request.body)
#         new_status = data.get('newStatus')
        
#         # Update the progress_status
#         project.progress_status = new_status
#         project.save()
        
#         return JsonResponse({'message': 'Project status updated successfully.'})
    
#     except Project.DoesNotExist:
#         return JsonResponse({'error': 'Project not found.'}, status=404)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=400)

# @login_required        
# @require_POST
# def update_task_progress_status(request, task_id):
#     try:
#         # Retrieve the project object
#         task = Task.objects.get(id=task_id)
#         # Get the new status from the request data
#         data = json.loads(request.body)
#         new_status = data.get('newStatus')
#         # Update the progress_status
#         task.progress_status = new_status
#         task.save()
        
#         return JsonResponse({'message': 'Task status updated successfully.'})
    
#     except Project.DoesNotExist:
#         return JsonResponse({'error': 'Task not found.'}, status=404)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=400)

# @login_required 
# def save_mood_data(request):
#     if request.method == 'POST':
#         data = request.POST
#         # Extract project ID from the form data
#         task_id = data.get('projectId')
#         task = get_object_or_404(Task, pk=task_id)
#         # Save mood data
#         mood = Mood.objects.create(
#             creator=request.user,
#             mood=data.get('mood'),
#             what_contributed_most=data.get('whatContributedMost'),
#             what_challenges_encounterd=data.get('challengesEncountered'),
#             took_more_or_less_time=data.get('tookMoreOrLessTime'),
#             What_did_you_learn=data.get('whatDidYouLearn'),
#             if_approach_task_again=data.get('approachTaskAgain')
#         )
#         # Update project progress_status to "complete"
#         task.progress_status = 'complete'
#         task.save()
        
#         return JsonResponse({"success": "Mood data saved and project status updated successfully."})
#     else:
#         return JsonResponse({"error": "Invalid request method."})

# @login_required
# def dashboard(request):
#     user = request.user
#     users = User.objects.all()
#     total_project = Project.objects.all().count()
#     total_task = Task.objects.all().count()
#     total_task_finished = Task.objects.filter(progress_status="complete").count()
#     # 1. Use filter for counting tasks
#     total_tasks = Task.objects.filter(creator=user).count()
#     # total_received_task = Task.objects.filter(shared_with=user).count()
#     # total_shared_task = Task.objects.filter(creator=user, shared_with__isnull=False).count()
#     # total_shared_completed_task = Task.objects.filter(creator=user, shared_with__isnull=False,completed=True).count()
#     total_completed_task = Task.objects.filter(creator=user, progress_status="complete").count()

#     # Assuming total_medium should be something specific to your implementation
#     total_medium = 0  # Replace with your logic for total_medium

#     messages = Messages.get_message(user=request.user)
#     active_direct = None
#     directs = Messages.objects.none()  # Initialize as an empty queryset
#     latest_project = Project.objects.order_by("-id")[0:5]
#     if messages:
#         message = messages[0]
#         active_direct = message['user'].username
#         directs = Messages.objects.filter(user=request.user, reciepient=message['user'])
#         # directs.update(is_read=True)

#     return render(request,'advance/dashboard.html', {
#         'total_completed_task': total_completed_task,
#         # 'total_received_task': total_received_task,
#         'users':users,
#         'total_project':total_project,
#         'total_task_finished':total_task_finished,
#         'friends': directs.count(),
#         'total_task': total_task,
#         # 'total_shared_completed_task':total_shared_completed_task,
#         # 'total_shared_task':total_shared_task,
#         "latest_project":latest_project,
#         'total_medium': total_medium,
#     })



# @login_required
# def chat(request):
#     if request.user.is_authenticated:
#         user = request.user
#         messages = Messages.get_message(user=request.user)
#         active_direct = None
#         directs = None
#         profile = get_object_or_404(Profile, user=user)

#         all_users = User.objects.all()

#         if messages:
#             message = messages[0]
#             active_direct = message['user'].username
#             directs = Messages.objects.filter(user=request.user, reciepient=message['user'])
#             directs.update(is_read=True)

#             for message in messages:
#                 if message['user'].username == active_direct:
#                     message['unread'] = 0

#         context = {

#             "all_users": all_users,
#             'directs':directs,
#             'messages': messages,
#             'active_direct': active_direct,
#             'profile': profile,
            
#             }
#         return render(request, "dashbaord/chat.html", context)


# @login_required
# def Directs(request, username):
#     user  = request.user
#     messages = Messages.get_message(user=user)
#     active_direct = username
#     directs = Messages.objects.filter(user=user, reciepient__username=username)  
#     directs.update(is_read=True)


#     q = request.GET.get("q").strip() if request.GET.get("q") != None else ""

#     all_users = User.objects.all()


#     for message in messages:
#             if message['user'].username == username:
#                 message['unread'] = 0
#     context = {
#         'all_users': all_users,
#         'directs': directs,
#         'messages': messages,
#         'active_direct': active_direct,
#         "user" : user,
        
#     }
#     return render(request, "dashbaord/chat.html", context)

# def SendDirect(request):
    
#     if request.method == "POST":
#         from_user = request.user
#         to_user_username = request.POST['to_user']
#         body = request.POST['body']

#         to_user = User.objects.get(username=to_user_username)
#         Messages.sender_message(from_user, to_user, body)
#         # return redirect('message')
#         success = "Message Sent."
#         return HttpResponse(success)




# def deleteMessage(request, pk):
#     messages = Messages.objects.get(id=pk)
#     messages.delete()
#     return HttpResponseRedirect(request.META.get('HTTP_REFERER'))



# @login_required
# def calendar(request):
#     return render(request,"dashbaord/calendar.html")

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated]) 
def edit_or_delete_task_reflection(request, task_reflection_id):
#  {
#     
#     "mood": "mood",
#     "whatContributedMost": "what contributed most to this feeling?",
#     "challengesEncountered": "What challenges did you encounter while working on this task, and how did you overcome them?",
#     "tookMoreOrLessTime": "Did the task take more or less time than you expected, and why do you think that was the case?",
#     "whatDidYouLearn": "What did you learn from completing this task, and how can you apply this learning in the future?",
#     "approachTaskAgain": "If you could approach this task again, what would you do differently, and why?",
# }
    try:
        task_reflection = TaskReflection.objects.get(id=task_reflection_id)
        
        if task_reflection.user != request.user:
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)
        
        if request.method == 'PUT':
            task_reflection.mood = request.data.get('mood', task_reflection.mood)
            task_reflection.what_contributed_most = request.data.get('whatContributedMost', task_reflection.what_contributed_most)
            task_reflection.challenges_encountered = request.data.get('challengesEncountered', task_reflection.challenges_encountered)
            task_reflection.took_more_or_less_time = request.data.get('tookMoreOrLessTime', task_reflection.took_more_or_less_time)
            task_reflection.what_did_you_learn = request.data.get('whatDidYouLearn', task_reflection.what_did_you_learn)
            task_reflection.approach_task_again = request.data.get('approachTaskAgain', task_reflection.approach_task_again)
            task_reflection.save()
            return Response({'message': 'Task reflection updated successfully.'}, status=status.HTTP_200_OK)
        
        elif request.method == 'DELETE':
            task_reflection.delete()
            return Response({'message': 'Task reflection deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    
    except TaskReflection.DoesNotExist:
        return Response({'error': 'Task reflection not found'}, status=status.HTTP_404_NOT_FOUND)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def TaskReflections(request):
#   {
#     "task_id": 1,
#     "mood": "mood",
#     "whatContributedMost": "what contributed most to this feeling?",
#     "challengesEncountered": "What challenges did you encounter while working on this task, and how did you overcome them?",
#     "tookMoreOrLessTime": "Did the task take more or less time than you expected, and why do you think that was the case?",
#     "whatDidYouLearn": "What did you learn from completing this task, and how can you apply this learning in the future?",
#     "approachTaskAgain": "If you could approach this task again, what would you do differently, and why?",
# }
    try:
        if request.method == 'POST':
            creator = request.data.get("username")
            mood = request.data.get('mood')
            what_contributed_most = request.data.get('whatContributedMost')
            challenges_encountered = request.data.get('challengesEncountered')
            took_more_or_less_time = request.data.get('tookMoreOrLessTime')
            what_did_you_learn = request.data.get('whatDidYouLearn')
            approach_task_again = request.data.get('approachTaskAgain')
            task_id = request.data.get('task_id')

            task = Task.objects.get(id=task_id)
            user_obj = User.objects.get(username=creator)
            task_feedback = TaskReflection.objects.create(
                user=user_obj,
                mood=mood,
                what_contributed_most=what_contributed_most,
                challenges_encountered=challenges_encountered,
                took_more_or_less_time=took_more_or_less_time,
                what_did_you_learn=what_did_you_learn,
                approach_task_again=approach_task_again,
                task_id=task
            )
            return Response({'message': 'Task feedback submitted successfully.'}, status=status.HTTP_200_OK)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def GetTaskReflections(request,creator):
    try:
        if request.method == 'GET':
            print("creator",creator)
            # user_obj = User.objects.get(username=creator)
            # print(user_obj)
            reflet = TaskReflection.objects.filter(user=creator)
            reflects = TaskReflectionSerializer(reflet, many=True)
            return Response({
                'reflects': reflects.data,
            }, status=status.HTTP_200_OK)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)