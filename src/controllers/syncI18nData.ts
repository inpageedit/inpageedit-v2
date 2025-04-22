import { resolvePath } from '@/constants/_dir.js'
import { mwConfig } from '@/utils/mw.js'

const CACHE_TTL = 7 * 60 * 60 * 1000
const SYNC_ENDPOINT = resolvePath(
  import.meta.env.MODE === 'development'
    ? '/i18n/languages.json'
    : '/dist/i18n/languages.json'
)
const STORAGE_NS = 'InPageEdit'
const STORAGE_KEY_DATA = `${STORAGE_NS}:i18n/data`
const STORAGE_KEY_TIME = `${STORAGE_NS}:i18n/time`

export interface I18nData {
  [key: string]: {
    [key: string]: string
  }
}

const _getCachedTime = () => {
  return parseInt(localStorage.getItem(STORAGE_KEY_TIME) || '0', 10)
}
const _getCachedData = () => {
  const raw = localStorage.getItem(STORAGE_KEY_DATA)
  if (raw) {
    try {
      const obj = JSON.parse(raw)
      if (typeof obj === 'object' && typeof obj.en === 'object') {
        return obj as I18nData
      } else {
        throw new Error('Invalid data', { cause: obj })
      }
    } catch (e) {
      console.warn('[InPageEdit] i18n 数据不合法', e)
      dropAllCaches()
      return null
    }
  } else {
    return null
  }
}
const checkIfCacheExpired = () => {
  const now = Date.now()
  const cachedTime = _getCachedTime()
  return !cachedTime || now - cachedTime >= CACHE_TTL
}
const getCacheWithTTLCheck = () => {
  const isCacheExpired = checkIfCacheExpired()
  if (isCacheExpired) {
    dropAllCaches()
    return null
  } else {
    return _getCachedData()
  }
}
const dropAllCaches = () => {
  localStorage.removeItem(STORAGE_KEY_DATA)
  localStorage.removeItem(STORAGE_KEY_TIME)
}
const setCache = (data: I18nData) => {
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data))
  localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString())
}

async function fetchFromCDN() {
  const data = await fetch(SYNC_ENDPOINT).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    return res.json()
  })
  if (typeof data !== 'object' || typeof data.en !== 'object') {
    throw new Error('Invalid data')
  }
  setCache(data)
  return data as I18nData
}

/**
 * Get i18n data
 */
export async function syncI18nData(noCache = false) {
  // 如果语言为 qqx，不返回任何东西
  if (mwConfig.wgUserLanguage === 'qqx') {
    console.warn('[InPageEdit] User language is qqx')
    return
  }
  const localCache = getCacheWithTTLCheck()
  if (localCache && !noCache) {
    return localCache
  } else {
    return fetchFromCDN()
  }
}
