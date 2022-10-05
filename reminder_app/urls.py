from django.urls import path
from .views import reminder,get_reminder_data,\
create_reminder_data,update_reminder_data,\
delete_reminder_data

urlpatterns = [

    path("",reminder),
    path("API/GET_reminders/",get_reminder_data),
    path("API/create_reminder/",create_reminder_data),
    path("API/update_reminder/<str:pk>",update_reminder_data),
    path("API/delete_reminder/<str:pk>",delete_reminder_data),
]