from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def home(request):
    return HttpResponse("""
    <html>
    <head>
        <title>HR-Hub | Recruitment Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                color: white;
                text-align: center;
                padding: 50px 20px;
                margin: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .card {
                max-width: 600px;
                background: rgba(30, 41, 59, 0.9);
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            h1 { color: #f97316; font-size: 2.5em; margin-bottom: 20px; }
            .status { color: #10b981; font-size: 1.2em; margin: 20px 0; }
            .endpoints { text-align: left; background: #0f172a; padding: 20px; border-radius: 10px; margin-top: 20px; }
            .endpoints code { display: block; padding: 8px; background: #1e293b; margin: 5px 0; border-radius: 5px; }
            .footer { margin-top: 30px; color: #94a3b8; font-size: 0.9em; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🚀 HR-Hub is Live!</h1>
            <div class="status">✅ Application successfully deployed</div>
            <p>Your Recruitment Management System is now running on Vercel/Andasy.</p>
            <div class="endpoints">
                <h3>📡 Available Endpoints:</h3>
                <code>POST /api/token/ - Login</code>
                <code>GET /api/me/ - User profile</code>
                <code>GET /api/recruitment/candidates/ - List candidates</code>
                <code>GET /admin/ - Admin panel</code>
            </div>
            <div class="footer">
                <p>Built with Django & React | Created by Dieu Merci Niyonkuru</p>
            </div>
        </div>
    </body>
    </html>
    """)

def health(request):
    return JsonResponse({
        "status": "healthy",
        "message": "HR-Hub API is running",
        "version": "2.0.0",
        "deployment": "vercel/andasy"
    })
