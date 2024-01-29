import { defineComponent, PropType } from 'vue';
import s from './Icon.module.scss';
export type IconName = 'add' | 'chart' | 'clock' | 'cloud' | 'logo' | 'pig' | 'menu' | 'charts' | 'export' | 'notify' | 'left'
  | 'notes' | 'date' | 'mangosteen'
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
  },
  setup: (props, context) => {
    return () => (
      <svg class={s.icon} onClick={props.onClick}><use xlinkHref={'#' + props.name}></use></svg>
    )
  }
})
