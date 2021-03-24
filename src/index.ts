'use strict'

// Types
import {
  window,
  pageModifyParams,
  pageParseData,
  pageParseDataParams,
} from './types'
declare var $: JQueryStatic
declare var mw: any

// Styles
import './styles/index.styl'

import getModal from './utils/modal'

!(async () => {
  let conf = mw.config.get()

  // 防止多次运行
  // if (globalThis.InPageEditLoaded) {
  //   throw '[InPageEdit] InPageEdit 已经在运行了'
  // } else {
  //   globalThis.InPageEditLoaded = {}
  // }

  await mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user'])
  // await mw.loader.load('https://cdn.jsdelivr.net/npm/ssi-modal@1.0.28')

  class InPageEditCore {
    // Variables
    page: string = conf.wgPageName
    pageParseData: pageParseData

    constructor(page: string) {
      if (page) this.page = page
    }

    setPage(page: string) {
      if (page) this.page = page
    }

    async getParse(ctx?: pageParseDataParams): Promise<pageParseData> {
      if (!this.page) throw 'Uninitialized'
      const data = await $.get(mw.util.wikiScript('api'), {
        format: 'json',
        action: 'parse',
        page: this.page,
        prop:
          'title|pageid|wikitext|text|langlinks|categories|templates|images',
      })
      const { parse } = data

      const pageData: pageParseData = {
        title: parse.title,
        pageid: parse.pageid,
        wikitext: parse?.wikitext?.['*'] || '',
        text: parse?.text?.['*'] || '',
        langlinks: parse.langlinks,
        categories: parse.categories,
        templates: parse.templates,
        images: parse.images,
      }
      this.pageParseData = pageData

      return pageData
    }

    async makeEdit(ctx: pageModifyParams): Promise<any> {
      console.log(this)
      if (!this.pageParseData.pageid) throw 'Missing information'
      if (!ctx.text && ctx.text !== '') throw 'Missing text'
      const data = await $.post(mw.util.wikiScript('api'), {
        format: 'json',
        action: 'edit',
        token: mw.user.tokens.values.csrfToken || '',
        pageid: this.pageParseData.pageid,
        text: ctx.text,
        summary: ctx.summary,
      })
      return data
    }

    async quickEdit(ctx: pageParseDataParams) {
      const makeEdit = this.makeEdit
      const $modal = new getModal()
      $modal.show()
      $modal.setTitle(`正在加载`)
      $modal.setContent('加载中……')

      await this.getParse()
      console.log('pageData done', this.pageParseData)
      const pageData = this.pageParseData
      const $editarea = $('<textarea>').val(pageData.wikitext).css({
        'min-height': '200px',
      })

      $modal.setTitle(`正在编辑 ${pageData.title}`)
      $modal.setContent($editarea)
      $modal.setButtons([
        {
          label: '保存',
          method() {
            makeEdit({ text: String($editarea.val()) })
          },
        },
      ])
    }
  }

  globalThis.InPageEditCore = InPageEditCore

  console.info('InPageEdit v15')
})()
