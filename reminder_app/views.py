from asyncio import tasks
from traceback import print_tb
from urllib import response
from django.shortcuts import render

from .models import reminder_tb

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import reminder_serializer

# Create your views here.


def reminder(request):
    return render(request, "reminder.html")


@api_view(["GET"])
def get_reminder_data(request):
    reminder = reminder_tb.objects.all()
    serializer = reminder_serializer(reminder, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_reminder_data(request):
    serializer = reminder_serializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response("reminder created")
    else:
        print(serializer.errors)


@api_view(["PUT"])
def update_reminder_data(request, pk):
    try:
        reminder = reminder_tb.objects.get(id=pk)
        serializer = reminder_serializer(instance=reminder, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response("reminder updated")
        else:
            print(serializer.errors)
    except:
        return Response(f"No reminder to update with id:{pk}")


@api_view(["DELETE"])
def delete_reminder_data(request, pk):
    try:
        reminder = reminder_tb.objects.get(id=pk)
        reminder.delete()
        return Response("reminder deleted")
    except:
        return Response(f"No reminder to delete with id:{pk}")
