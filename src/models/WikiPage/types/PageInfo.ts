/**
 * @url https://www.mediawiki.org/wiki/Content_handlers
 */
export type ContentModelMap = {
  // Core handlers
  css: 'text/css'
  javascript: 'text/javascript'
  json: 'application/json'
  text: 'text/plain'
  wikitext: 'text/x-wiki'
  // Part of common Extensions' handlers
  GeoJson: 'application/json'
  'sanitized-css': 'text/css' // Extension:TemplateStyles
  Scribunto: 'text/plain' // Extension:Scribunto (Lua)
  'smw/schema': 'application/json' // Extension:SemanticMediaWiki
}

export interface PageInfo {
  pageid: number
  ns: number
  title: string
  contentmodel: keyof ContentModelMap
  pagelanguage: string
  pagelanguagehtmlcode: string
  pagelanguagedir: 'ltr' | 'rtl'
  touched: string
  lastrevid: number
  length: number
  protection: []
  restrictiontypes: string[]
  fullurl: string
  canonicalurl: string
  editurl?: string
  varianttitles?: Record<string, string>
  actions: {
    edit: boolean
    move: boolean
    delete: boolean
  }
  revisions?: {
    revid: number
    parentid: number
    minor: boolean
    user: string
    timestamp: string
    comment: string
    contentformat: ContentModelMap[keyof ContentModelMap]
    contentmodel: keyof ContentModelMap
    content: string
  }[]
  templates: {
    ns: number
    title: string
  }[]
  images: {
    ns: number
    title: string
  }[]
}
