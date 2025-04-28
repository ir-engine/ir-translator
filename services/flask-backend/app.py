from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import mimetypes

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Gemini
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-2.0-flash')



@app.route('/translate-text', methods=['POST'])
def translate_text():
    try:
        data = request.get_json()

        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        text = data['text']
        target_language = data.get('target_language', 'English')

        prompt = f"""
        1. Detect the language of this text: "{text}"
        2. Translate it to {target_language} if it's not already in {target_language}

        Format your response as JSON:
        {{
            "detected_language": "language name",
            "is_target_language": true/false,
            "translated_text": "translation (if needed)",
            "original_text": "original text",
            "target_language": "{target_language}"
        }}
        """

        response = model.generate_content(prompt)

        return response.text, 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
