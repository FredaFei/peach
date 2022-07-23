import { FunctionalComponent } from 'vue';
import clock from '../../assets/icons/clock.svg';
import { WelcomeLayout } from './WelcomeLayout';
export const Second: FunctionalComponent = (props, context) => {
  return (
    <WelcomeLayout>
      {{
        img: () => <img src={clock} alt="" />,
        title: () => <h2>每日提醒<br /> 不会遗漏每一笔</h2>,
      }}
    </WelcomeLayout>
  );
}
Second.displayName = 'Second';
