import { defineComponent, ref } from 'vue'

export const App = defineComponent({
  setup() {
    const refCount = ref(0)
    const increment = () => {
      refCount.value++
    }
    return () => (
      <div>
        hi, .tsx {refCount.value} <button onClick={increment}>+1</button>
      </div>
    )
  },
})
