import { FunctionalComponent } from 'vue';
import pig from '../../assets/icons/pig.svg';
import { WelcomeLayout } from './WelcomeLayout';
export const First: FunctionalComponent = (props, context) => {
  return (
    <WelcomeLayout>
      {{
        img: () => <img src={pig} alt="" />,
        title: () => <h2>会挣钱<br /> 还要会省钱</h2>,
      }}
    </WelcomeLayout>
  );
}
First.displayName = 'First';
