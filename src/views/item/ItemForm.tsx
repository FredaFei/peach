import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import s from './Item.module.scss';
import { hasError, validate } from '../../shared/validate';
import { useRoute, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { onFormError } from '../../shared/onFormError';
import { Dialog } from 'vant';
import { Tab, Tabs } from '../../components/tabs/Tabs';
import { InputPad } from './InputPad';
import { Tags } from '../../components/tags/Tags';
import { AxiosError } from 'axios';

export const ItemForm = defineComponent({
  props: {
    id: Number
  },
  setup: (props, context) => {
    const route = useRoute();
    const formData = reactive<Partial<Item>>({
      id: undefined,
      kind: (route.query?.kind ? route.query.kind!.toString() : 'expenses') as ('expenses' | 'income'),
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString()
    })
    const errors = reactive<FormErrors<typeof formData>>({})
    const router = useRouter()
    const alertMessage = (errors:FormErrors<typeof formData>)=>Dialog.alert({
      title: '出错',
      message: Object.values(errors).filter(i=>i.length>0).join('\n')
    })
    const onSubmit = async () => {
      Object.assign(errors, { kind: [], tag_ids: [], amount: [], happen_at: [] })
      Object.assign(errors, validate(formData, [
        { key: 'kind', type: 'required', message: '类型必填' },
        { key: 'tag_ids', type: 'required', message: '标签必填' },
        { key: 'amount', type: 'required', message: '金额必填' },
        { key: 'amount', type: 'required', message: '金额必填' },
        { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为零' },
        { key: 'happen_at', type: 'required', message: '时间必填' },
      ]))
      
      if(hasError(errors)){
        alertMessage(errors)
        return
      }
      const promise = await formData.id ?
          http.patch(`/items/${formData.id}`, formData, { _mock: 'itemEdit', _autoLoading: true }) :
          http.post('/items', formData, { _mock: 'itemCreate', _autoLoading: true })
      await promise.catch((error: AxiosError<ResourceError>)=>
        onFormError(error, (data)=> {
          alertMessage(data.errors)
        })
      )
      router.back()
    }
    onMounted(async ()=>{
      if(!props.id){ return }
      const response = await http.get<Resource<Item>>(
        `/items/${props.id}`, { }, { _mock: 'itemShow' }
      )
      const {id, kind, tag_ids, amount, happen_at } = response.data.resource
      Object.assign(formData, {id, kind, tag_ids, amount, happen_at })
    })
    
    const refVisibleUnputPad = ref(false);
    watch(() => formData.kind, (newVal) => {
      refVisibleUnputPad.value = false
    });
    watch(() => formData.tag_ids![0], (newVal) => {
      if(newVal){
        refVisibleUnputPad.value = true
      }
    });
    const onSelectTag = () => {
      refVisibleUnputPad.value = true
    }
    return () => (
      <>
        <div class={s.wrapper}>
          <Tabs v-model:selected={formData.kind} class={s.tabs}>
            <Tab value="expenses" name="支出">
              <Tags kind="expenses" 
                v-model:selected={formData.tag_ids![0]} 
                onUpdate:selected={onSelectTag}
              />
            </Tab>
            <Tab value="income" name="收入">
              <Tags kind="income" 
                v-model:selected={formData.tag_ids![0]}
                onUpdate:selected={onSelectTag}
              />
            </Tab>
          </Tabs>
          {
            refVisibleUnputPad.value && <div class={s.inputPad_wrapper}>
              <InputPad
                v-model:happenAt={formData.happen_at}
                v-model:amount={formData.amount}
                onSubmit={onSubmit}
              />
            </div>
          }
        </div>
      </>
    )
  }
})
