import { InPageEdit } from '@/InPageEdit'
import { MwApi } from 'wiki-saikou'

declare module '@/InPageEdit' {
  interface InPageEdit {
    api: MwApi
  }
}

export class ApiService {
  constructor(public ctx: InPageEdit) {
    ctx.set('api', new MwApi())
  }
}
