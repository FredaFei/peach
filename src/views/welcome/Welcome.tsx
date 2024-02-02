import { defineComponent, ref, Transition, VNode, watchEffect, } from 'vue'
import { RouterView, RouteLocationNormalizedLoaded, useRouter, useRoute } from 'vue-router'
import { useSwipe } from '../../hooks/useSwipe'
import { throttle } from '../../shared/throttle'
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
    const { direction, swiping } = useSwipe(main, { beforeTouchStart: (e) => e.preventDefault() })
    const route = useRoute()
    const router = useRouter()
    const replace = throttle(() => {
      const name = (route.name ?? '/Welcome1').toString()
      router.replace(replaceMap[name])
    }, 500)
    watchEffect(() => {
      if (swiping.value && direction?.value === 'left') {
        replace()
      }
    })
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref='#tomato'></use>
          </svg>
          <h1>番茄记账</h1>
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
