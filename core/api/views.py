from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import QueryGeneratorSerializer, CodeGeneratorSerializer
from rest_framework import status
from test.gemini import generate_gemini
from test.openapi import generate_openai
from test.openai_code import generate_code_openai
from test.gemini_code import generate_code_gemini

# from gemini import generate_code



# Create your views here.
class CodeGeneratorView(APIView):
    def get(self, request):
        return Response({"hello": "all"}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CodeGeneratorSerializer(data=request.data)
        if serializer.is_valid():
            language = serializer.validated_data["language"]
            prompt = serializer.validated_data["prompt"]
            res_openai = generate_code_openai(language, prompt)
            res_gem = generate_code_gemini(language, prompt)
            
            print(res_openai)
            print("--"*50)
            return Response({"gemini": res_gem,"openai":res_openai}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QueryGeneratorView(APIView):
    def get(self, request):
        return Response({"hello": "all"}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = QueryGeneratorSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer)
            schema = serializer.validated_data["schema"]
            language = serializer.validated_data["language"]
            prompt = serializer.validated_data["prompt"]
            output = generate_gemini(schema, language, "nosql", prompt)
            out_openai = generate_openai(schema, language, "nosql", prompt)
            print(out_openai)
            return Response({"response": out_openai}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
