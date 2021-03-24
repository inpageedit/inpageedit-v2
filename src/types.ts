export interface pageParseData {
  title: string
  pageid: number
  wikitext: string
  text: string
  langlinks: string[]
  categories: string[]
  templates: string[]
  images: string[]
}

export interface pageParseDataParams {
  revision?: number
  section?: number
  page?: string
}

export interface pageModifyParams {
  revision?: number
  section?: number
  text?: string
  summary?: string
}

export declare var window
