import { defineComponent, PropType } from 'vue';
import { Button } from '../../components/button/Button';
import { FloatButton } from '../../components/float-button/FloatButton';
import s from './StartPage.module.scss';
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = (e: MouseEvent) => {
      console.log('button clicked');

    }
    const onClickFloatButton = (e: MouseEvent) => {
      console.log('onClickFloatButton clicked');

    }
    return () => (
      <div>
        <div class={s.button_wrapper}>
          <Button onClick={onClick}>开始记账</Button>
        </div>
        <FloatButton iconName="add" onClick={onClickFloatButton}/>  
      </div>
    )
  }
})
