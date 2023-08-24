import {
  h,
  createApp,
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  //@ts-ignore
} from 'https://unpkg.com/vue@3/dist/vue.runtime.esm-browser.prod.js?module'

// main
;(async () => {
  const entryURL = new URL(
    import.meta.env.DEV ? '/src/index.js' : '/InPageEdit.min.js',
    location.href
  )

  const CopyButton = defineComponent(
    (props: { value: string }) => {
      const cd = 1500
      const last = ref(0)
      const now = ref(Date.now())
      const isCopied = computed(() => now.value - last.value <= cd)
      let timer = setInterval(() => {
        now.value = Date.now()
      })
      const canCopy = computed(() => typeof props.value !== 'string')

      onBeforeUnmount(() => {
        timer && clearInterval(timer)
      })

      return () =>
        h(
          'button',
          {
            disabled: canCopy.value,
            onClick(e: MouseEvent) {
              e.preventDefault()
              copy(props.value)
              last.value = Date.now()
            },
          },
          isCopied.value ? 'done' : 'copy'
        )
    },
    { props: ['value'] }
  )

  const CodeBlock = defineComponent(
    (props: { value: string }) => {
      return () =>
        h(
          'pre',
          {},
          {
            default() {
              return typeof props.value !== 'string'
                ? 'Loading...'
                : props.value
            },
          }
        )
    },
    { props: ['value'] }
  )

  const App = defineComponent(() => {
    const code = ref()

    fetch(entryURL, { headers: { accept: 'text/plaintext' } })
      .then((i) => i.text())
      .then((i) => (code.value = i))

    return () =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        [
          h('h1', 'InPageEdit V2'),
          h('h2', 'Entrypoint'),
          h('div', { style: { display: 'flex', gap: '1rem' } }, [
            h('a', { href: entryURL.toString() }, entryURL.toString()),
            h(CopyButton, { value: entryURL.toString() }),
          ]),
          h('h2', 'Loader'),
          h('div', { style: { position: 'relative' } }, [
            h('pre', `import('${entryURL}')`),
            h(CopyButton, {
              value: `import('${entryURL}')`,
              style: { position: 'absolute', right: '1rem', top: '1rem' },
            }),
          ]),
          h('h2', 'index.js'),
          h('details', {}, [h(CodeBlock, { value: code.value })]),
        ]
      )
  })
  const app = createApp(App)
  app.mount(document.querySelector('#app'))
})()

function copy(str = '') {
  const t = document.createElement('textarea')
  t.value = str.toString()
  document.body.appendChild(t)
  t.select()
  document.execCommand('copy')
  t.remove()
}
