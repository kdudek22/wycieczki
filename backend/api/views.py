from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import UserCreateSerializer, UserLoginSerializer
from django.contrib.auth import authenticate
import jwt
from datetime import datetime, timedelta
from django.contrib.auth.models import User

jwt_secret = "test"

def generate_jwt(payload, duration_minutes=5):

    payload["exp"] = datetime.utcnow() + timedelta(minutes=duration_minutes)

    token = jwt.encode(payload, jwt_secret, algorithm="HS256")

    return token

def decode_token(token):
    return jwt.decode(token, jwt_secret, algorithms=["HS256"])

class LoginView(GenericAPIView):

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if not serializer.is_valid():
            return Response({"errors": serializer.errors}, status=400)

        user = authenticate(username=serializer.data["email"], email=serializer.data["email"], password=serializer.data["password"])

        if not user:
            return Response({"status": "failed"}, status=401)

        token = generate_jwt({"email": serializer.data["email"]})

        response = Response({"status": "successful"})
        response.set_cookie("token", token, max_age=10000, httponly=True, samesite='Lax')

        return response


class RegisterView(GenericAPIView):

    def post(self, request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response({"errors": serializer.errors}, status=400)

        serializer.save()
        return Response({"status": "successful"})


class UserDetailsView(GenericAPIView):
    def get(self, request):
        try:
            decoded_token = decode_token(request.COOKIES["token"])
        except jwt.ExpiredSignatureError:
            return Response({"error": "token expired"}, status=401)

        user = User.objects.get(username=decoded_token["email"])
        group = "admin" if user.is_staff else "user"

        return Response({"email":user.email, "group": group})





