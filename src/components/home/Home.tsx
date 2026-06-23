import { For, Show, type Component } from 'solid-js'
import { KunCard } from '~/components/kun/KunCard'
import { KunHeader } from '~/components/kun/KunHeader'
import { KunLink } from '~/components/kun/KunLink'
import { useI18n } from '~/i18n'

type SiteKey =
  | 'forum'
  | 'backup'
  | 'sticker'
  | 'documents'
  | 'oauth'
  | 'wiki'
  | 'kunui'
  | 'down'
  | 'nav'

interface KunSite {
  key: SiteKey
  link: string
  githubLink?: string
  important?: boolean
}

const mainSites: KunSite[] = [
  {
    key: 'forum',
    link: 'https://www.kungal.com',
    githubLink: 'https://github.com/KUN1007/kun-galgame-nuxt3'
  },
  {
    key: 'backup',
    link: 'https://www.kungal.org',
    githubLink: 'https://github.com/KUN1007/kun-galgame-nuxt3'
  }
]

const subSites: KunSite[] = [
  {
    key: 'sticker',
    link: 'https://sticker.kungal.com',
    githubLink: 'https://github.com/KUN1007/kun-galgame-stickers-sveltekit'
  },
  {
    key: 'documents',
    link: 'https://docs-kungal.nextmoe.dev/',
    githubLink: 'https://github.com/KUN1007/soft.moe'
  },
  {
    key: 'oauth',
    link: 'https://oauth.kungal.com/'
  },
  {
    key: 'wiki',
    link: 'https://wiki.kungal.com/'
  },
  {
    key: 'kunui',
    link: 'https://ui.kungal.com',
    githubLink: 'https://github.com/kungal/kun-ui'
  },
  {
    key: 'down',
    link: 'https://counter.kungal.com/',
    githubLink: 'https://github.com/kungal/kun-galgame-counter'
  },
  {
    key: 'nav',
    link: 'https://nav.kungal.org',
    githubLink: 'https://github.com/KUN1007/kun-galgame-nav-solid'
  }
]

const SiteCard: Component<{ site: KunSite }> = (props) => {
  const { t } = useI18n()

  return (
    <KunCard
      color={props.site.important ? 'kun' : 'background'}
      isTransparent={!props.site.important}
      class="h-full"
      contentClass="gap-3"
    >
      <a
        href={props.site.link}
        target="_blank"
        rel="noreferrer"
        class="group flex flex-grow flex-col gap-2"
      >
        <h3
          class="group-hover:text-kun text-lg font-semibold transition-colors"
          classList={{ 'text-kun': props.site.important }}
        >
          {t(`kun.${props.site.key}.title`)}
        </h3>
        <p class="text-default-500 flex-grow text-sm leading-6">
          {t(`kun.${props.site.key}.details`)}
        </p>
      </a>

      <Show when={props.site.githubLink}>
        <KunLink
          to={props.site.githubLink!}
          target="_blank"
          rel="noreferrer"
          color="kun"
          size="sm"
          underline="hover"
          isShowAnchorIcon
        >
          {t('kun.github')}
        </KunLink>
      </Show>
    </KunCard>
  )
}

const AboutSection = () => {
  const { locale } = useI18n()

  const linkClass = 'text-kun underline-offset-3 hover:underline'

  return (
    <div class="text-default-700 space-y-2 text-sm leading-7 sm:text-base">
      <Show when={locale() === 'zh-cn'}>
        <p>
          本网站完全开源! 源码在{' '}
          <a
            class={linkClass}
            href="https://github.com/KUN1007/kun-galgame-nav-solid"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          。 我们使用最现代的{' '}
          <a
            class={linkClass}
            href="https://start.solidjs.com/"
            target="_blank"
            rel="noreferrer"
          >
            SolidStart
          </a>{' '}
          框架编写该网站
        </p>
        <p>我们建议您 `Ctrl + D` 收藏该网页以防止与我们失去联系</p>
        <p>
          您可以加入我们的{' '}
          <a
            class={linkClass}
            href="https://t.me/kungalgame"
            target="_blank"
            rel="noreferrer"
          >
            Telegram 群组
          </a>
        </p>
        <p>感谢为开源事业做出贡献的每个组织和朋友！</p>
      </Show>

      <Show when={locale() === 'en-us'}>
        <p>
          This website is completely open-source! The source code is available
          on{' '}
          <a
            class={linkClass}
            href="https://github.com/KUN1007/kun-galgame-nav-solid"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          . We built this site using the latest{' '}
          <a
            class={linkClass}
            href="https://start.solidjs.com/"
            target="_blank"
            rel="noreferrer"
          >
            SolidStart
          </a>{' '}
          framework
        </p>
        <p>
          We recommend you press `Ctrl + D` to bookmark this page to avoid losing
          contact with us.
        </p>
        <p>
          You can join our{' '}
          <a
            class={linkClass}
            href="https://t.me/kungalgame"
            target="_blank"
            rel="noreferrer"
          >
            Telegram group
          </a>
        </p>
        <p>
          Thank you to every organization and friend contributing to the
          open-source community!
        </p>
      </Show>
    </div>
  )
}

const SiteFooter = () => {
  const { locale } = useI18n()

  return (
    <footer class="text-default-500 mt-16 mb-8 text-center text-sm md:mt-24">
      <Show when={locale() === 'zh-cn'}>
        <p>
          由{' '}
          <a
            class="text-kun underline-offset-3 hover:underline"
            href="https://www.kungal.com"
            target="_blank"
            rel="noreferrer"
          >
            鲲 Galgame 论坛
          </a>{' '}
          提供支持
        </p>
      </Show>
      <Show when={locale() === 'en-us'}>
        <p>
          Powered by{' '}
          <a
            class="text-kun underline-offset-3 hover:underline"
            href="https://www.kungal.com"
            target="_blank"
            rel="noreferrer"
          >
            KUN Visual Novel Forum
          </a>
        </p>
      </Show>
    </footer>
  )
}

export const Home: Component = () => {
  const { t } = useI18n()

  return (
    <main class="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6">
      <h1 class="text-kun text-center text-3xl font-medium sm:text-4xl">
        {t('kun.title')}
      </h1>

      <section class="space-y-4">
        <KunHeader scale="h2" name={t('kun.main')} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <For each={mainSites}>{(site) => <SiteCard site={site} />}</For>
        </div>
      </section>

      <section class="space-y-4">
        <KunHeader scale="h2" name={t('kun.sub')} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <For each={subSites}>{(site) => <SiteCard site={site} />}</For>
        </div>
      </section>

      <section class="space-y-4">
        <KunHeader scale="h2" name={t('kun.about')} />
        <AboutSection />
      </section>

      <SiteFooter />
    </main>
  )
}

export default Home
