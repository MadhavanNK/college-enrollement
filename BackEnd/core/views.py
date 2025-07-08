from rest_framework import viewsets
from .models import Student, StudentAddress, Instructor, Course, Enrollment
from .serializers import (
    StudentSerializer, StudentAddressSerializer, InstructorSerializer,
    CourseSerializer, EnrollmentSerializer
)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentAddressViewSet(viewsets.ModelViewSet):
    queryset = StudentAddress.objects.all()
    serializer_class = StudentAddressSerializer

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

