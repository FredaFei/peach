import { FunctionalComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
export const WelcomeLayout: FunctionalComponent = (props, { slots }) => {
  return (
    <div class={s.card}>
      {slots.img?.()}
      {slots.title?.()}
    </div>
  );
}
