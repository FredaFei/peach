import { defineComponent, ref, Transition, VNode, } from 'vue'
import { RouterView, RouteLocationNormalizedLoaded } from 'vue-router'
import { useSwipe } from '../../hooks/useSwipe'
import s from './Welcome.module.scss'
export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>(null)
    const { direction, swiping } = useSwipe(main)
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
