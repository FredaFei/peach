import { FunctionalComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from './SkipFeatures';
export const FirstActions: FunctionalComponent = (props, context) => {
  return <div class={s.actions}>
    <SkipFeatures class={s.fake}/> 
    <RouterLink to="/welcome/2" >下一页</RouterLink>
    <SkipFeatures/>
  </div>
}
FirstActions.displayName = 'FirstActions';
