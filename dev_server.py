from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__)

@app.route('/')
def home():
    return send_file('index.html')

@app.route('/<path:path>')
def serve_file(path):
    if os.path.exists(f"{path}.html"):
        return send_file(f"{path}.html")
    elif os.path.exists(path):
        return send_file(path)
    else:
        return send_file('index.html')  # For SPA-like behavior

if __name__ == '__main__':
    app.run(debug=True, port=8000) 