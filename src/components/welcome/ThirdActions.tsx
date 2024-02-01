import { FunctionalComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from './SkipFeatures';
export const ThirdActions: FunctionalComponent = (props, context) => {
  return <div class={s.actions}>
    <SkipFeatures class={s.fake}/> 
    <RouterLink to="/welcome/4" >下一页</RouterLink>
    <SkipFeatures/>
  </div>
}
ThirdActions.displayName = 'ThirdActions';
