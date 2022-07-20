import { defineComponent, PropType } from 'vue'
export const Second = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div>Second</div>
  },
})
