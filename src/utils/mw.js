import version from '../module/version'

export const mwConfig = mw.config.get()
export const mwApi = new mw.Api({
  parameters: {
    formatversion: 2,
    format: 'json',
  },
  ajax: {
    headers: {
      'Api-User-Agent': `InPageEdit-v2/${version}`,
    },
  },
})
