from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

N8N_WEBHOOK = "http://localhost:5678/webhook/02a025b8-acfd-40d3-baa5-e9ba526bcd83"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')

    print(f"Received message: {message}")

    # Call n8n webhook
    response = requests.get(N8N_WEBHOOK, params={'message': message})

    print(f"n8n response status: {response.status_code}")
    print(f"n8n response: {response.text}")

    # Try to parse as JSON, fallback to plain text
    try:
        json_response = response.json()
        # Try common field names (including 'text' from your n8n workflow)
        reply = json_response.get('text') or json_response.get('reply') or json_response.get('output') or json_response.get('response') or json_response.get('message') or str(json_response)
    except:
        reply = response.text

    return jsonify({'reply': reply})

if __name__ == '__main__':
    print("=" * 50)
    print("Matrix Chatbot Proxy Server")
    print("=" * 50)
    print(f"n8n webhook: {N8N_WEBHOOK}")
    print("Starting on http://localhost:8000")
    print("=" * 50)
    app.run(port=8000, debug=True)
