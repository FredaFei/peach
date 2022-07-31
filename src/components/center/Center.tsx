import { defineComponent, PropType } from 'vue';
import s from './Center.module.scss';
type Direction = '-' | '|' | 'vertical' | 'horizontal';
const directionMap = {
  '-': 'horizontal',
  '|': 'vertical',
  'vertical': 'vertical',
  'horizontal': 'horizontal',
}
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<Direction>,
      default: '-',
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={[s.center, directionMap[props.direction]]}>
        {context.slots.default?.()}
      </div>
    )
  }
})
