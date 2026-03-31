from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def home(request):
    return JsonResponse({
        "message": "HR-Hub API is running",
        "version": "1.0.0",
        "endpoints": {
            "api": "/api/",
            "admin": "/admin/",
            "token": "/api/token/",
            "register": "/api/register/",
            "candidates": "/api/recruitment/candidates/",
            "interviews": "/api/recruitment/interviews/"
        }
    })
