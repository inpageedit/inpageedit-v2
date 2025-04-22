import { useMwApi } from '@/utils/mw'
import type { PageInfo } from './types/PageInfo'
import { WatchlistAction } from './types/WatchlistAction'

export class WikiPage {
  api: mw.Api

  constructor(
    public pageInfo: PageInfo,
    api?: mw.Api
  ) {
    this.api = api || useMwApi()
  }

  // Utils
  async getPageInfo(payload: Record<string, any>) {
    const {
      query: {
        pages: [pageInfo],
      },
    } = (await this.api.get({
      action: 'query',
      prop: 'info|templates|transcludedin|images|pageimages|revisions',
      inprop: 'protection|url|varianttitles',
      intestactions: 'edit|move|delete',
      tllimit: 'max',
      tilimit: 'max',
      imlimit: 'max',
      piprop: 'thumbnail|name|original',
      pithumbsize: '200',
      pilimit: 'max',
      rvprop: 'ids|timestamp|flags|comment|user|content',
      ...payload,
    })) as {
      query: {
        pages: PageInfo[]
      }
    }
    pageInfo.revisions?.forEach((rev) => {
      // @ts-ignore
      if (typeof rev.slots === 'object') {
        const mainSlot = (rev as any).slots.main
        if (mainSlot) {
          rev.content = mainSlot.content
          rev.contentmodel = mainSlot['contentmodel']
          rev.contentformat = mainSlot['contentformat']
        }
      }
    })
    return pageInfo
  }

  // Page actions
  async parse(params?: Record<string, any>) {
    const { parse } = await this.api.post({
      action: 'parse',
      page: this.pageInfo.title,
      prop: 'text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle|iwlinks|properties|parsewarnings',
      ...params,
    })
    return parse
  }
  async preview(text: string, params?: Record<string, any>) {
    const parse = await this.parse({
      action: 'parse',
      page: undefined,
      title: this.pageInfo.title,
      text,
      pst: 1,
      preview: 1,
      disableeditsection: 1,
      disablelimitreport: 1,
      ...params,
    })
    return parse
  }
  async edit(
    payload: {
      text?: string
      prependtext?: string
      appendtext?: string
      summary?: string
      watchlist?: WatchlistAction
    },
    params?: Record<string, any>
  ) {
    const {
      text,
      prependtext,
      appendtext,
      summary = '',
      watchlist = 'preferences',
    } = payload
    return this.api.postWithEditToken({
      action: 'edit',
      title: this.pageInfo.title,
      starttimestamp: this.pageInfo.touched,
      basetimestamp: this.pageInfo?.revisions?.[0].timestamp,
      text,
      prependtext,
      appendtext,
      summary,
      watchlist,
      ...params,
    })
  }
  async createOnly(
    payload: { text: string; summary?: string; watchlist?: WatchlistAction },
    params?: Record<string, any>
  ) {
    return this.edit(payload, { createonly: 1, ...params })
  }
  async delete(reason?: string, params?: Record<string, any>) {
    return this.api.postWithEditToken({
      action: 'delete',
      pageid: this.pageInfo.pageid,
      reason,
      ...params,
    })
  }
  async moveTo(
    title: string,
    reason?: string,
    params?: Partial<
      Record<string, any> & {
        movetalk: boolean
        movesubpages: boolean
      }
    >
  ) {
    return this.api.postWithEditToken({
      action: 'move',
      from: this.pageInfo.title,
      to: title,
      reason,
      movetalk: 1,
      movesubpages: 1,
      ...params,
    })
  }

  userCan(action: keyof PageInfo['actions']) {
    const val = this.pageInfo?.actions?.[action]
    return val
  }
  userCanEdit() {
    return this.userCan('edit')
  }
  get fullurl() {
    return this.pageInfo.fullurl
  }
  get canonicalurl() {
    return this.pageInfo.canonicalurl
  }
  get editurl() {
    return this.pageInfo.editurl
  }

  async refetch() {
    const pageInfo = await this.getPageInfo({ pageids: this.pageInfo.pageid })
    const revisions = (this.pageInfo.revisions || [])
      .concat(pageInfo.revisions || [])
      .sort((a, b) => a.revid - b.revid)
      .reduce(
        (acc, cur) => {
          if (!acc.find((rev) => rev.revid === cur.revid)) acc.push(cur)
          return acc
        },
        [] as Required<PageInfo>['revisions']
      )
    this.pageInfo = pageInfo
    this.pageInfo.revisions = revisions
    return this
  }
}

export class WikiPageService {
  api: mw.Api
  constructor(api?: mw.Api) {
    this.api = api || useMwApi()
  }
  async createInstance(payload: Record<string, any>) {
    const {
      query: {
        pages: [pageInfo],
      },
    } = await this.api.get({
      action: 'query',
      prop: 'info|templates|transcludedin|images|pageimages|revisions',
      inprop: 'protection|url|varianttitles',
      intestactions: 'edit|move|delete',
      tllimit: 'max',
      tilimit: 'max',
      imlimit: 'max',
      piprop: 'thumbnail|name|original',
      pithumbsize: '200',
      pilimit: 'max',
      rvprop: 'ids|timestamp|user|userid|content',
      ...payload,
    })
    return new WikiPage(pageInfo, this.api)
  }
  async newFromTitle(
    title: string,
    converttitles = false,
    rvsection?: number | string
  ) {
    return this.createInstance({ titles: title, converttitles, rvsection })
  }
  async newFromPageId(pageid: number, rvsection?: number | string) {
    return this.createInstance({ pageids: pageid, rvsection })
  }
  async newFromRevision(revid: number, rvsection?: number | string) {
    return this.createInstance({ revids: revid, rvsection })
  }
}
