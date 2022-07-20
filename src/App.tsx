import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'
import './App.scss'

export const App = defineComponent({
  setup() {
    const refCount = ref(0)
    const increment = () => {
      refCount.value++
    }
    return () => (
      <div class="page">
        <RouterView />
      </div>
    )
  },
})
