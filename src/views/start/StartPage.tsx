import { defineComponent, PropType } from 'vue';
import { Button } from '../../components/button/Button';
import s from './StartPage.module.scss';
export const StartPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const onClick = (e: MouseEvent) => {
      console.log('button clicked');
      
    }
    return () => (
      <div class={s.button_wrapper}>
        <Button onClick={onClick}>开始记账</Button>
      </div>
    )
  }
})
