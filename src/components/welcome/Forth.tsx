import { FunctionalComponent } from 'vue';
import { WelcomeLayout } from './WelcomeLayout';
export const Forth: FunctionalComponent = (props, context) => {
  return (
    <WelcomeLayout>
      {{
        img: () => <svg><use xlinkHref='#cloud'></use></svg>,
        title: () => <h2>云备份<br /> 再也不怕数据丢失</h2>,
      }}
    </WelcomeLayout>
  );
}
Forth.displayName = 'Forth';
