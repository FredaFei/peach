import { FunctionalComponent, defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from './SkipFeatures';
const onClick = () => {
  localStorage.setItem('skipFeatures', 'yes')
}
export const ForthActions: FunctionalComponent = (props, context) => {
  return <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <SkipFeatures class={s.fake} />
    <span onClick={onClick}>
      <RouterLink to="/items">完成</RouterLink>
    </span>
  </div>
}
ForthActions.displayName = 'ForthActions';
