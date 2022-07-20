import { defineComponent, PropType } from 'vue'
import s from './First.module.scss'
import pig from '../../assets/pig.png'
export const First = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div class={s.wrapper}>first</div>
  },
})
