from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, StudentAddressViewSet, InstructorViewSet, CourseViewSet, EnrollmentViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'addresses', StudentAddressViewSet)
router.register(r'instructors', InstructorViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
