import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'

export const App = defineComponent({
  setup() {
    const refCount = ref(0)
    const increment = () => {
      refCount.value++
    }
    return () => (
      <div>
        <header>
          <router-link to="/foo">foo</router-link>
          <router-link to="/bar">bar</router-link>
        </header>
        <body>
          <RouterView />
        </body>
        <footer>
          hi, .tsx {refCount.value} <button onClick={increment}>+1</button>
        </footer>
      </div>
    )
  },
})
