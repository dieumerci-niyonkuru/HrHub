import base64

# Create a simple SVG favicon
favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#f97316"/>
  <text x="50" y="68" font-size="38" text-anchor="middle" fill="white" font-weight="bold">HR</text>
  <text x="50" y="85" font-size="12" text-anchor="middle" fill="white">HUB</text>
</svg>'''

with open('core/static/favicon.ico', 'w') as f:
    f.write(favicon_svg)

print("Favicon created!")
