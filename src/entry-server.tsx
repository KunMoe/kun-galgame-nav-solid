// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'

const themeScriptContent = `(function(){try{var c=document.cookie,t='kun-system';var m=c.match(/(?:^|; )kun-theme=([^;]*)/);if(m){var v=decodeURIComponent(m[1]).replace(/^["']|["']$/g,'');if(v==='kun-dark'||v==='kun-light'||v==='kun-system')t=v;}var r=t;if(t==='kun-system'){r=window.matchMedia('(prefers-color-scheme: dark)').matches?'kun-dark':'kun-light';}document.documentElement.classList.remove('kun-light','kun-dark');document.documentElement.classList.add(r);}catch(e){}})()`

export default createHandler(({ request }) => {
  const url = new URL(request.url)
  const isEn = url.pathname === '/en' || url.pathname.startsWith('/en/')
  const htmlLang = isEn ? 'en' : 'zh-Hans'

  const cookieHeader = request.headers.get('cookie') ?? ''
  let themeFromCookie = 'kun-system'
  const match = cookieHeader.match(/(?:^|; )kun-theme=([^;]*)/)
  if (match) {
    try {
      const decoded = decodeURIComponent(match[1]).replace(/^["']|["']$/g, '')
      if (['kun-dark', 'kun-light', 'kun-system'].includes(decoded)) {
        themeFromCookie = decoded
      }
    } catch {}
  }

  const ssrThemeClass =
    themeFromCookie === 'kun-system' ? 'kun-light' : themeFromCookie

  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang={htmlLang} class={ssrThemeClass}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            <link rel="icon" type="image/webp" href="/favicon.webp" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <meta name="theme-color" content="#6cb6f1" />
            <meta name="msapplication-TileColor" content="#6cb6f1" />
            <meta
              name="description"
              content="KUN Visual Novel Navigation Page | 鲲 Galgame 导航页, 开源免费, Galgame 论坛, Galgame 资源, Galgame 社区"
            />
            <meta name="og:title" content="KUN Visual Novel | 鲲 Galgame" />
            <meta name="og:url" content="https://nav.kungal.org" />
            <meta name="og:type" content="website" />
            <meta name="og:image" content="https://www.kungal.com/kungalgame.webp" />
            <meta name="og:image:width" content="1920" />
            <meta name="og:image:height" content="1080" />
            <meta
              name="og:description"
              content="KUN Visual Novel, Visual Novel Forum | 鲲 Galgame, 论坛, Galgame 资源, Galgame 社区, Galgame 技术, Galgame 交流"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:image"
              content="https://www.kungal.com/kungalgame.webp"
            />
            <meta name="twitter:site" content="@kungalgame" />
            <script innerHTML={themeScriptContent} />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  )
})
