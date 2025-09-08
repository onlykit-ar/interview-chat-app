from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import google.generativeai as genai


# Configure Gemini AI
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)


# example endpoint 
""" @api_view(['GET'])
def get_messages(request):
    # Get all chat messages
    messages = ChatMessage.objects.all()
    serializer = ChatMessageSerializer(messages, many=True)
    return Response(serializer.data) """


