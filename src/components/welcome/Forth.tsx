import { FunctionalComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
import cloud from '../../assets/icons/cloud.svg';
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
export const Forth: FunctionalComponent = (props, context) => {
  return (
    <WelcomeLayout>
      {{
        img: () => <img src={cloud} alt="" />,
        title: () => <h2>云备份<br /> 再也不怕数据丢失</h2>,
        actions: () => <>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/start">开启应用</RouterLink>
        </>,

      }}
    </WelcomeLayout>
  );
}
Forth.displayName = 'Forth';
