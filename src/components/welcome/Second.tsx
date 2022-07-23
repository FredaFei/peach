import { FunctionalComponent } from 'vue';
import s from './First.module.scss';
import clock from '../../assets/icons/clock.svg';
import { RouterLink } from 'vue-router';
export const Second: FunctionalComponent = (props, context) => {
  return (
    <div class={s.wrapper}>
      <div class={s.card}>
        <img src={clock} alt="" />
        <h2>每日提醒<br /> 不会遗漏每一笔</h2>
      </div>
      <div class={s.actions}>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        <RouterLink to="/welcome/3">下一页</RouterLink>
        <RouterLink to="/start">跳过</RouterLink>
      </div>
    </div>
  );
}
