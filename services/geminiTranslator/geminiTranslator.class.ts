import { BadRequest } from '@feathersjs/errors'
import { Application, ServiceInterface } from '@feathersjs/feathers'

export interface GeminiTranslatorParams {
  audio: Blob
}

export class GeminiTranslatorService implements ServiceInterface<string[], any, GeminiTranslatorParams> {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create(data: any, params: GeminiTranslatorParams) {
    if (!params.audio || !Array.isArray(params.audio)) {
      throw new BadRequest('No files provided or invalid files format')
    }

    // input blob
    // output text
    return data
  }
}
