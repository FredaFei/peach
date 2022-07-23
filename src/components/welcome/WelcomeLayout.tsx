import { FunctionalComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
export const WelcomeLayout: FunctionalComponent = (props, { slots }) => {
  return (
    <div class={s.wrapper}>
      <div class={s.card}>
        {slots.img?.()}
        {slots.title?.()}
      </div>
      <div class={s.actions}>
        {slots.actions?.()}
      </div>
    </div>
  );
}
