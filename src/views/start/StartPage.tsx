import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Button } from '../../components/button/Button';
import { Center } from '../../components/center/Center';
import { FloatButton } from '../../components/float-button/FloatButton';
import { Icon } from '../../components/icon/Icon';
import { Overlay } from '../../components/overlay/Overlay';
import { MainLayout } from '../../layouts/MainLayout';
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
      <MainLayout>
        {{
          title: () => '桃子记账',
          icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickNavIcon} />,
          default: () => <>
            <Center class={s.pig_wrapper}>
              <Icon name={"pig"} class={s.pig} />
            </Center>
            <div class={s.button_wrapper}>
              <RouterLink to="/items/create">
                <Button onClick={onClick}>开始记账</Button>
              </RouterLink>
            </div>
            <RouterLink to="/items/create">
              <FloatButton iconName="add" onClick={onClickFloatButton} />
            </RouterLink>
            {
              refVisibleOverlay.value && <Overlay onClose={() => refVisibleOverlay.value = false} />
            }
          </>
        }}
      </MainLayout>
    )
  }
})
