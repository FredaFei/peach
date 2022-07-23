import { FunctionalComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
import { RouterLink } from 'vue-router';
export const ForthActions: FunctionalComponent = (props, context) => {
  return <div class={s.actions}>
    <RouterLink class={s.fake} to="/start">跳过</RouterLink>
    <RouterLink class={s.fake} to="/start">跳过</RouterLink>
    <RouterLink to="/start">开启应用</RouterLink>
  </div>
}
ForthActions.displayName = 'ForthActions';
