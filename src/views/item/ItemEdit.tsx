import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import s from './Item.module.scss';
import { useRoute } from 'vue-router';
import { BackIcon } from '../../components/BackIcon';
import { ItemForm } from './ItemForm';

export const ItemEdit = defineComponent({
  setup: () => {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())

    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => '记一笔',
          icon: () => <BackIcon />,
          default: () => <ItemForm id={numberId}/>
        }}
      </MainLayout>
    )
  }
})

export default ItemEdit
