import { FunctionalComponent } from 'vue';
import { WelcomeLayout } from './WelcomeLayout';
export const Second: FunctionalComponent = (props, context) => {
  return (
    <WelcomeLayout>
      {{
        img: () => <svg><use xlinkHref='#clock'></use></svg>,
        title: () => <h2>每日提醒<br /> 不会遗漏每一笔</h2>,
      }}
    </WelcomeLayout>
  );
}
Second.displayName = 'Second';
