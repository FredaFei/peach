import { defineComponent, PropType } from 'vue'
export const Forth = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div>Forth</div>
  },
})
