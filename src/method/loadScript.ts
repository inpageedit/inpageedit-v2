export async function loadScript(src: string, noCache = false) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    const url = new URL(src, document.baseURI)
    if (noCache) {
      url.searchParams.set(`_${Date.now()}`, 'no-cache')
    }
    script.src = url.href
    script.async = true
    script.dataset.ipe = 'script'
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`))
    }
    document.head.appendChild(script)
  }).catch((error) => {
    console.error(`[InPageEdit] 加载脚本失败: ${src}`, error)
    throw error
  })
}
