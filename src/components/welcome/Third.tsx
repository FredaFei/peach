import { FunctionalComponent } from 'vue';
import { WelcomeLayout } from './WelcomeLayout';
export const Third: FunctionalComponent = (props, context) => {
  return (
    <WelcomeLayout>
      {{
        img: () => <svg><use xlinkHref='#chart'></use></svg>,
        title: () => <h2>数据可视化<br /> 收支一目了然</h2>,
      }}
    </WelcomeLayout>
  );
}
Third.displayName = 'Third';
