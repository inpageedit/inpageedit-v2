import { Context } from 'cordis'
import { ApiService } from '@/services/ApiService'
import { SiteMetadataService } from '@/services/SiteMetaService'

export interface InPageEditConfig {
  legacyPreferences: Record<string, any>
}

export class InPageEdit extends Context {
  public config: InPageEditConfig
  static DEFAULT_CONFIG: InPageEditConfig = {
    legacyPreferences: {},
  }

  constructor(config?: Partial<InPageEditConfig>) {
    super()
    this.config = {
      ...InPageEdit.DEFAULT_CONFIG,
      ...config,
    }

    this.plugin(ApiService)
    this.plugin(SiteMetadataService)
  }

  private _resolveLegacyGlobalConfigs() {
    const globalObj = (window as any).InPageEdit || {}

    // 偏好设置
    const myPreferences = globalObj?.myPreferences || {}
  }
}
