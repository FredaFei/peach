import { defineComponent, PropType } from 'vue'
export const Welcome = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div>Welcome</div>
  },
})
