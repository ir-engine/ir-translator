import { Application, ServiceInterface } from '@feathersjs/feathers'

export interface GeminiTranslatorParams {}

// type GeminiTranslatorType = {
//   detected_language: string,
//   is_target_language: boolean,
//   translated_text: string,
//   original_text: string,
//   target_language: string
// }

export class GeminiTranslatorService implements ServiceInterface<string[], any, GeminiTranslatorParams> {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create(data: any, params: GeminiTranslatorParams) {
    const req = await fetch('http://localhost:3035/translate-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: data.text,
        target_language: data.target_language
      })
    })
    const translation = JSON.parse((await req.text()).replace('```json\n', '').replace('```', ''))

    // input blob
    // output text
    return translation
  }
}
