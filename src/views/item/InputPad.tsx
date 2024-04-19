import { computed, defineComponent, PropType, ref, watch } from 'vue';
import s from './InputPad.module.scss';
import { DatetimePicker, Popup } from 'vant';
import { Time } from '../../shared/time';
import { operatorFactory } from '../../shared/calculator';
export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    note: String,
    onSubmit: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const refInput = ref(props.amount ? (props.amount / 100).toString() : '0');
    const refOperator = ref('');
    const refSecondInput = ref('');

    const resetForNewOperator = () => {
      refOperator.value = '';
      refSecondInput.value = '';
    };

    const appendNumber = (n: number | string) => {
      const refAmount = refOperator.value ? refSecondInput : refInput;
      const nString = n.toString()
      const dotIndex = refAmount.value.indexOf('.')
      if (refAmount.value.length >= 8) {
        return
      }
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return
      }
      if (nString === '.') {
        if (dotIndex >= 0) { // 已经有小数点了
          return
        }
      } else if (nString === '0') {
        if (dotIndex === -1) { // 没有小数点
          if (refAmount.value === '0') { // 没小数点，但是有0
            return
          }
        }
      } else {
        if (refAmount.value === '0') {
          refAmount.value = ''
        }
      }
      refAmount.value += nString
    }
    const setOperator = (operator: string) => {
      calaculate();
      refOperator.value = operator;
    };
    const calaculate = ()=>{
      // console.log('calaculate 1', refOperator.value,Number(refInput.value),Number(refSecondInput.value))
      // 10+1+5=11+5
      if(refOperator.value){
        if(refSecondInput.value){
          const result = operatorFactory(refOperator.value as Operator)(Number(refInput.value), Number(refSecondInput.value));
          refInput.value= (Math.round(result*100) / 100).toString()
          resetForNewOperator();
        }
      }
      // console.log('calaculate 2',refOperator.value,refInput.value,refSecondInput.value)
    }
    const onClickCalaculateButton = () => {
      calaculate()
    }
    const onClickClearButton = () =>{
      if(refSecondInput.value){
        refSecondInput.value = refSecondInput.value.slice(0, -1);
      }else if(refOperator.value){
        refOperator.value = refOperator.value.slice(0, -1);
      }else{
        refInput.value = refInput.value.slice(0, -1);
      }
      const result = `${refInput.value}${refOperator.value}${refSecondInput.value}`
      // 如果清除完所有的输入后，展示栏的内容为空，我们需要将展示栏的内容设置为0
      if (result === '') {
        refInput.value = '0';
      }
    }
    const onClickSumbitButton = () => {
      calaculate();
      resetForNewOperator();
      // JavaScript 中精度问题以及解决方案参考链接 https://www.runoob.com/w3cnote/js-precision-problem-and-solution.html
      context.emit('update:amount', Math.round(parseFloat(refInput.value) * 100))
      props.onSubmit?.()
    }
    const buttons = [
      { text: '7', onClick: () => { appendNumber(7) } },
      { text: '8', onClick: () => { appendNumber(8) } },
      { text: '9', onClick: () => { appendNumber(9) } },
      { text: '时间', onClick: () => { showDatePicker() } },
      { text: '4', onClick: () => { appendNumber(4) } },
      { text: '5', onClick: () => { appendNumber(5) } },
      { text: '6', onClick: () => { appendNumber(6) } },
      { text: '+', onClick: () => { setOperator('+') } },
      { text: '1', onClick: () => { appendNumber(1) } },
      { text: '2', onClick: () => { appendNumber(2) } },
      { text: '3', onClick: () => { appendNumber(3) } },
      { text: '-', onClick: () => { setOperator('-') } },
      { text: '.', onClick: () => { appendNumber('.') } },
      { text: '0', onClick: () => { appendNumber(0) } },
      { text: '清空', onClick: onClickClearButton },
      { text: '提交', onClick: onClickSumbitButton },
    ]
    const refDatePickerVisible = ref(false)
    const showDatePicker = () => refDatePickerVisible.value = true
    const hideDatePicker = () => refDatePickerVisible.value = false
    const setDate = (date: Date) => {
      context.emit('update:happenAt', date.toISOString());
      hideDatePicker()
    }
    watch(() => props.amount, (newVal) => {
      refInput.value = newVal ? (newVal / 100).toString() : '0';
    });
    const refNote = ref(props.note ?? '')
    watch(() => props.note, (newVal) => {
      refNote.value = newVal ?? '';
    });
    const onInputNote = (e: any) => {
      refNote.value = e.target.value;
    }
    const dateText = computed(()=>{
      const now = new Time().format()
      const happenAt = new Time(props.happenAt).format()
      if(now===happenAt){
        return '今天'
      }
      return happenAt
    })
    return () => <>
      <div class={s.displayAndNote}>
        <div class={s.display}>{refInput.value}{refOperator.value}{refSecondInput.value}</div>
        <div class={s.note}>
          <span>备注</span>
          <input
            v-model={refNote.value}
            placeholder={'点击填写备注'}
            onInput={onInputNote}
            class={s.input} />
        </div>
      </div>
      <div class={s.buttons}>
        {
          buttons.map(button =>{
            return button.text ==='时间' ? <button onClick={button.onClick} class={s.smallTime}>{dateText.value}</button>
            : button.text ==='提交' && refSecondInput.value ? <button onClick={onClickCalaculateButton}>=</button> 
            : <button onClick={button.onClick}>{button.text}</button>
          })
        }
      </div>
      <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
        <DatetimePicker modelValue={props.happenAt ? new Date(props.happenAt) : new Date()}
          type="date" title="选择年月日"
          onConfirm={setDate} onCancel={hideDatePicker}
        />
      </Popup>
    </>
  }
})
