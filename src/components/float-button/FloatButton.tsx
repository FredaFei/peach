import { defineComponent, PropType } from 'vue';
import { Icon, IconName } from '../icon/Icon';
import s from './FloatButton.module.scss';

export const FloatButton = defineComponent({
  props: {
    iconName: {
      type: String as PropType<IconName>,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton} onClick={props.onClick}><Icon name={props.iconName} class={s.icon} /></div>
    )
  }
})
FloatButton.displayName = 'FloatButton';
