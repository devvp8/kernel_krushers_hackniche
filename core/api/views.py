from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import QueryGeneratorSerializer
from rest_framework import status
from test.gemini import generate_code

# from gemini import generate_code


# Create your views here.
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
            # code = serializer.validated_data["code"]

            output1,output2 = generate_code(schema, language, "nosql", prompt)
            # processed_data = {
            #     "schema": schema,
            #     "language": language,
            #     "prompt": prompt,
            #     "code": "code",
            #     "result": "Processed data goes here",
            # }
            return Response({"response":{"code":output1,"code":output2}}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
