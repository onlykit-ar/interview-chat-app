# Django Chat Backend

A simple Django REST API backend for the AI chat application.

## Setup

1. Create a virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create environment file:

```bash
cp env.example .env
```

4. Add your Gemini API key to the `.env` file:

```
GEMINI_API_KEY=your_actual_api_key_here
DEBUG=True
```

5. Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

6. Run the development server:

```bash
python manage.py runserver
```

## API Endpoints

- `GET /api/messages/` - Get all chat messages
- `POST /api/send/` - Send a message (skeleton implementation)
- `DELETE /api/clear/` - Clear all messages

## For the Interviewee

The `send_message` endpoint in `chat/views.py` is a skeleton that needs to be implemented. The interviewee should:

1. Save the user message to the database using the `ChatMessage` model
2. Call the Gemini AI API to get a response
3. Save the AI response to the database
4. Return both messages using the serializers

The Gemini AI client is already configured in the views file and can be used like:

```python
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content(user_message_text)
ai_response_text = response.text
```
