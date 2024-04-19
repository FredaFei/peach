import { defineComponent, onMounted, PropType, reactive, warn } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import s from './Item.module.scss';
import { useRoute, useRouter } from 'vue-router';
import { Dialog } from 'vant';
import { http } from '../../shared/Http';
import { BackIcon } from '../../components/BackIcon';
import { Button } from '../../components/button/Button';
import { Datetime } from '../../shared/Datetime';
import { Money } from '../../shared/Money';
import { Col, Row } from 'vant';

export const ItemShow = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const itemId = route.params.id
    const router = useRouter()

    const formData = reactive<Item>({
      id: 0,
      user_id: 0,
      amount: 0,
      tag_ids: [],
      tags: [],
      happen_at: new Date().toISOString(),
      kind: 'expenses',
      note: ''
    })
    onMounted(async () => {
      if (!itemId) {
        console.warn('账目id不存在', itemId, route.params.id)
        return
      }
      const response = await http.get<Resource<Item>>(
        `/items/${itemId}`, {}, { _mock: 'itemShow' }
      )
      // const { id, kind, tag_ids, amount, happen_at } = response.data.resource
      Object.assign(formData, response.data.resource)
    })

    const onClickEdit = () => {
      router.push(`/items/${itemId}/edit`)
    }
    const onError = (error: ResourceError) => {
      Dialog.alert({ title: '提示', message: '删除失败' })
      throw error;
    }
    const onDelete = async (options?: { withTags?: boolean }) => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要删除吗？',
      })
      if (!itemId) {
        console.warn('账目id不存在', itemId, route.params.id)
        return
      }
      await http
        .delete(`/items/${itemId}`, {
          // with_tags: options?.withTags ? 'true' : 'false',
        }, { _autoLoading: true })
        .catch(onError)
      router.back()
    }
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => <div class={s.title}>
            <div class={s.sign}>
              <span>{formData.tags && formData.tags.length > 0 ? formData.tags[0].sign : '💰'}</span>
            </div>
            <div class={s.text}>
              {formData.tags && formData.tags.length > 0 ? formData.tags[0].name : '未分类'}
            </div>
          </div>,
          icon: () => <BackIcon />,
          default: () =>
            <>
              <div class={s.item_content}>
                <Row class={s.item}>
                  <Col span="3" class={s.label}>类型</Col>
                  <Col span="21" class={s.value}>{formData.kind === "expenses" ? '支出' : '收入'}</Col>
                </Row>
                <Row class={s.item}>
                  <Col span="3" class={s.label}>金额</Col>
                  <Col span="21" class={s.amount}><Money value={formData.amount} /></Col>
                </Row>
                <Row class={s.item}>
                  <Col span="3" class={s.label}>日期</Col>
                  <Col span="21" class={s.value}><Datetime value={formData.happen_at} format='YYYY-MM-DD week'/></Col>
                </Row>
                {
                  formData.note && <Row class={s.item}>
                    <Col span="3" class={s.label}>备注</Col>
                    <Col span="21" class={s.value}>{formData.note}</Col>
                  </Row>
                }
              </div>
              <div class={s.actions}>
                <Button level="normal" class={s.removeItems} onClick={onClickEdit}>编辑</Button>
                <Button level="danger" class={s.removeItems} onClick={() => onDelete()}>
                  删除记账
                </Button>
                {/* <Button
                  level="danger"
                  class={s.removeItemsAndTags}
                  onClick={() => onDelete({ withItems: true })}
                >
                  删除标签和记账
                </Button> */}
              </div>
            </>
        }}
      </MainLayout>
    )
  }
})

export default ItemShow
