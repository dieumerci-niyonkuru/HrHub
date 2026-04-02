from django.core.mail import send_mail
from django.conf import settings

def send_password_reset_email(user_email, reset_link, user_name):
    """Send password reset email to user"""
    
    subject = f"Password Reset Request - HR-Hub"
    
    message = f"""
Dear {user_name},

You requested to reset your password for your HR-Hub account.

Click the link below to reset your password:
{reset_link}

This link will expire in 24 hours.

If you did not request this password reset, please ignore this email.

Best regards,
HR-Hub Team
"""
    
    html_message = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #f97316; color: white; padding: 20px; text-align: center; }}
        .content {{ padding: 20px; background: #f9f9f9; }}
        .button {{ display: inline-block; padding: 12px 24px; background: #f97316; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
        .footer {{ text-align: center; padding: 20px; font-size: 12px; color: #666; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>HR-Hub Password Reset</h1>
        </div>
        <div class="content">
            <p>Dear <strong>{user_name}</strong>,</p>
            <p>You requested to reset your password for your HR-Hub account.</p>
            <p style="text-align: center;">
                <a href="{reset_link}" class="button">Reset Password</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p><a href="{reset_link}">{reset_link}</a></p>
            <p><strong>This link will expire in 24 hours.</strong></p>
            <p>If you did not request this password reset, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>© 2024 HR-Hub. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
        </div>
    </div>
</body>
</html>
"""
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=False,
            html_message=html_message
        )
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False

def send_welcome_email(user_email, user_name):
    """Send welcome email to new user"""
    
    subject = f"Welcome to HR-Hub, {user_name}!"
    
    message = f"""
Dear {user_name},

Welcome to HR-Hub! Your account has been successfully created.

You can now log in to the HR-Hub Recruitment Management System.

Login URL: http://localhost:5173/login

Best regards,
HR-Hub Team
"""
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Welcome email failed: {e}")
        return False
