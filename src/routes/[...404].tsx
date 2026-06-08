import { createMemo } from 'solid-js'
import { Title } from '@solidjs/meta'
import { KunCard } from '~/components/kun/KunCard'
import { KunLink } from '~/components/kun/KunLink'
import { useI18n } from '~/i18n'

const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export default function NotFound() {
  const { t, localePath } = useI18n()

  const stickerLink = createMemo(() => {
    const pack = randomNum(1, 5)
    const sticker = randomNum(1, 80)
    return `https://sticker.kungal.com/stickers/KUNgal${pack}/${sticker}.webp`
  })

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
          src={stickerLink()}
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
