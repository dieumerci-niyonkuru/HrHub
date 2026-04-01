from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def home(request):
    return JsonResponse({
        "status": "running",
        "message": "HR-Hub API is alive!",
        "version": "2.0.0",
        "endpoints": {
            "api": "/api/",
            "admin": "/admin/",
            "login": "/api/token/",
            "register": "/api/register/"
        }
    })

def health(request):
    return JsonResponse({"status": "healthy", "timestamp": "2024-01-01"})
