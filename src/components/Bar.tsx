import { defineComponent, PropType } from 'vue'
export const Bar = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div>Bar</div>
  },
})
