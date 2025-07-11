from rest_framework import serializers
from .models import Student, StudentAddress, Instructor, Course, Enrollment

class StudentAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAddress
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    address = StudentAddressSerializer(read_only=True)

    class Meta:
        model = Student
        fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

    class Meta:
        model = Enrollment
        fields = '__all__'
