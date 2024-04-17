import { Ref, onMounted, onUnmounted, ref } from "vue"

type Option = {
  onLongPress?: (id: number) => void;
};
export const useLongPress = (element: Ref<HTMLElement | undefined>, option?: Option) => {
  const timer = ref<number>()
  const currentTag = ref<HTMLDivElement>()
  const onLongPress = (tagId: Tag['id']) => {
    option?.onLongPress?.(tagId)
  }
  const onTouchStart = (e: TouchEvent, tag: Tag | Item) => {
    currentTag.value = e.currentTarget as HTMLDivElement
    timer.value = setTimeout(() => {
      onLongPress(tag.id)
    }, 500)
  }
  const onTouchEnd = (e: TouchEvent) => {
    clearTimeout(timer.value)
  }
  const onTouchMove = (e: TouchEvent) => {
    const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
    if (currentTag.value !== pointedElement &&
      currentTag.value?.contains(pointedElement) === false) {
      clearTimeout(timer.value)
    }
  }
  onMounted(() => {
    if (!element.value) { return }
    element.value.addEventListener('touchmove', onTouchMove)
  })
  onUnmounted(() => {
    if (!element.value) { return }
    element.value.removeEventListener('touchmove', onTouchMove)
  })
  return { onTouchStart, onTouchEnd }
}
