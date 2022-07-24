import { defineComponent, ref, Transition, VNode, watchEffect, } from 'vue'
import { RouterView, RouteLocationNormalizedLoaded, useRouter, useRoute } from 'vue-router'
import { useSwipe } from '../../hooks/useSwipe'
import s from './Welcome.module.scss'

const replaceMap: Record<string, string> = {
  Welcome1: '/welcome/2',
  Welcome2: '/welcome/3',
  Welcome3: '/welcome/4',
  Welcome4: '/start',
}

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement | undefined>()
    const { direction, swiping } = useSwipe(main)
    const route = useRoute()
    const router = useRouter()
    watchEffect(() => {
      const name = (route.name ?? '/Welcome1').toString()
      if (swiping.value && direction?.value === 'left') {
        router.replace(replaceMap[name])
      }
    })
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref='#logo'></use>
          </svg>
          <h1>桃子记账</h1>
        </header>
        <main class={s.main} ref={main}>
          <RouterView name="main">
            {
              ({ Component: Content, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) => <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}
              >
                {Content}
              </Transition>
            }
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    )
  }
})
