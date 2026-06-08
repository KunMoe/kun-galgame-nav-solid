import { MetaProvider } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { I18nProvider } from '~/i18n'
import { RootLayout } from '~/components/RootLayout'
import './styles/tailwindcss.css'

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <I18nProvider>
            <RootLayout>{props.children}</RootLayout>
          </I18nProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
