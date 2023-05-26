import requests
import json

# Configura tu clave de API
api_key = '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'

# Función para enviar una solicitud a la API de ChatGPT
def enviar_solicitud_chat(prompt):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    data = {
        'prompt': prompt,
        'max_tokens': 100,
        'temperature': 0.7,
        'n': 1,
        'stop': None,
        'timeout': 15
    }

    response = requests.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        headers=headers,
        json=data
    )

    respuesta = response.json()['choices'][0]['text'].strip()
    return respuesta

# Ejemplo de uso
prompt = 'Hola, ¿cómo estás?'
respuesta = enviar_solicitud_chat(prompt)
print(respuesta)