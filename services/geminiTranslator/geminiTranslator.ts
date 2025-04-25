// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { Application } from '@ir-engine/server-core/declarations'
import config from '@ir-engine/server-core/src/appconfig'

import { geminiTranslatorMethods, geminiTranslatorPath } from './geminiTranslator.schema'
import { GeminiTranslatorService } from './geminiTranslator.class'
import geminiTranslatorDocs from './geminiTranslator.docs'
import hooks from './geminiTranslator.hooks'

declare module '@ir-engine/common/declarations' {
  interface ServiceTypes {
    [geminiTranslatorPath]: GeminiTranslatorService
  }
}

export default (app: Application): void => {
  app.use(geminiTranslatorPath, new GeminiTranslatorService(app), {
    // A list of all methods this service exposes externally
    methods: geminiTranslatorMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: geminiTranslatorDocs
  })

  const service = app.service(geminiTranslatorPath)
  service.hooks(hooks)

  // Add this service to whitelist
  config.authentication.whiteList = [...config.authentication.whiteList, geminiTranslatorPath]
}