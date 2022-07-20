import { defineComponent, PropType } from 'vue'
export const Third = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div>Third</div>
  },
})
