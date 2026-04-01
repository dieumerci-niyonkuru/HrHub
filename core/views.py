from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def home(request):
    return HttpResponse("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>HR-Hub | Recruitment Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .card {
                max-width: 700px;
                background: rgba(30, 41, 59, 0.95);
                padding: 40px;
                border-radius: 24px;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(249, 115, 22, 0.3);
            }
            h1 { 
                background: linear-gradient(135deg, #f97316, #fb923c);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 2.5em;
                margin-bottom: 20px;
            }
            .status { 
                background: rgba(16, 185, 129, 0.2);
                color: #10b981;
                padding: 12px;
                border-radius: 12px;
                margin: 20px 0;
                font-weight: 500;
            }
            .endpoints {
                text-align: left;
                background: #0f172a;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
            }
            .endpoints h3 { color: #f97316; margin-bottom: 15px; }
            .endpoints code {
                display: block;
                padding: 8px 12px;
                background: #1e293b;
                margin: 8px 0;
                border-radius: 8px;
                font-family: monospace;
                font-size: 13px;
                color: #94a3b8;
            }
            .footer { 
                margin-top: 30px; 
                color: #64748b; 
                font-size: 0.85em;
                text-align: center;
                border-top: 1px solid #334155;
                padding-top: 20px;
            }
            .highlight { color: #f97316; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🚀 HR-Hub is Live!</h1>
            <div class="status">✅ Successfully deployed on Vercel</div>
            <p>Your Recruitment Management System is now running in production.</p>
            
            <div class="endpoints">
                <h3>📡 Available API Endpoints:</h3>
                <code>POST /api/token/ - Login with email/password</code>
                <code>GET /api/me/ - Get current user profile</code>
                <code>GET /api/recruitment/candidates/ - List all candidates</code>
                <code>POST /api/recruitment/candidates/ - Add new candidate</code>
                <code>GET /api/recruitment/interviews/ - List interviews</code>
                <code>GET /admin/ - Django Admin Panel</code>
                <code>GET /health/ - Health check endpoint</code>
            </div>
            
            <div class="footer">
                <p>Built with <span class="highlight">Django 5.1</span> + <span class="highlight">React 18</span></p>
                <p>Created by <strong>Dieu Merci Niyonkuru</strong></p>
                <p>© 2024 TalentForge | Recruitment Management System</p>
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
        "deployment": "vercel",
        "host": request.get_host(),
        "timestamp": "2024-04-01"
    })
