import { defineComponent, PropType, ref } from 'vue';
import { Button } from '../../components/button/Button';
import { Center } from '../../components/center/Center';
import { FloatButton } from '../../components/float-button/FloatButton';
import { Icon } from '../../components/icon/Icon';
import { Navbar } from '../../components/navbar/Navbar';
import { Overlay } from '../../components/overlay/Overlay';
import s from './StartPage.module.scss';
export const StartPage = defineComponent({
  setup: (props, context) => {
    const refVisibleOverlay = ref(false);
    const onClick = (e: MouseEvent) => {
      console.log('button clicked');

    }
    const onClickFloatButton = (e: MouseEvent) => {
      console.log('onClickFloatButton clicked');

    }
    const onClickNavIcon = (e: MouseEvent) => {
      refVisibleOverlay.value = !refVisibleOverlay.value;
    }
    return () => (
      <div>
        <Navbar>
          {{
            default: () => '桃子记账',
            icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickNavIcon} />,
          }}
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon name={"pig"} class={s.pig} />
        </Center>
        <div class={s.button_wrapper}>
          <Button onClick={onClick}>开始记账</Button>
        </div>
        <FloatButton iconName="add" onClick={onClickFloatButton} />
        {
          refVisibleOverlay.value && <Overlay onClose={() => refVisibleOverlay.value = false} />
        }

      </div>
    )
  }
})
