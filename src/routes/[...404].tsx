import { Title } from '@solidjs/meta'
import { KunCard } from '~/components/kun/KunCard'
import { KunLink } from '~/components/kun/KunLink'
import { useI18n } from '~/i18n'

// A same-origin static asset, not a remote sticker. This was
// `sticker.kungal.com/stickers/KUNgal{1-5}/{1-80}.webp` picked at random --
// an address for a position in a collection on a site this app does not own,
// which 404s today because that site stopped serving static files. A 404 page
// illustrated with a broken image is the worst place for it. The pick was
// also random rather than derived, so SSR and the client disagreed.
const KUN_NOT_FOUND_IMAGE = '/kun-null.webp'

export default function NotFound() {
  const { t, localePath } = useI18n()

  return (
    <main class="flex min-h-[calc(100lvh-4rem)] items-center justify-center p-4">
      <Title>404</Title>
      <KunCard
        color="ren"
        isTransparent={false}
        class="w-full max-w-md items-center text-center"
        contentClass="items-center gap-4"
      >
        <h1 class="text-ren text-5xl font-bold">404</h1>
        <img
          src={KUN_NOT_FOUND_IMAGE}
          alt="404"
          class="size-40 object-contain"
        />
        <p class="text-default-700 text-lg font-medium">{t('kun.404')}</p>
        <KunLink to={localePath('/')} color="kun" underline="hover">
          {t('kun.remake')}
        </KunLink>
      </KunCard>
    </main>
  )
}
