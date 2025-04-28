### iR Engine Project

This is an iR Engine Hackathon project. Built for adding automatic gemini translation to iR Engine.

There is a gemini flask service in ir-translator/services/flask-backend/app.py that we hosted through docker to facilitate the Gemini translation backend. 

On the frontend we simplified the UX to simply be a target language. We sadly did not implement translations for recieved messages but that should be doable.


Links:
https://developer.chrome.com/docs/ai/translate-on-device (We would of loved to use this API but it is still behind a flag)
