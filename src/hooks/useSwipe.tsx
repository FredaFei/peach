import { computed, onMounted, onUnmounted, ref, Ref } from "vue";

type Point = {
  x: number;
  y: number;
};

type Option = {
  beforeTouchStart?: (e: TouchEvent) => void;
  afterTouchStart?: (e: TouchEvent) => void;
  beforeTouchMove?: (e: TouchEvent) => void;
  afterTouchMove?: (e: TouchEvent) => void;
  beforeTouchEnd?: (e: TouchEvent) => void;
  afterTouchEnd?: (e: TouchEvent) => void;
};

export const useSwipe = (element: Ref<HTMLElement | undefined>, option?: Option) => {
  const swiping = ref<boolean>(false)
  const start = ref<Point>({ x: 0, y: 0 })
  const end = ref<Point>({ x: 0, y: 0 })
  const distance = computed(() => {
    if (!start.value || !end.value) { return null }
    return { x: end.value.x - start.value.x, y: end.value.y - start.value.y }
  })
  const direction = computed(() => {
    if (!distance.value) { return null }
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    option?.beforeTouchStart?.(e)
    const touch = e.touches[0];
    start.value = end.value = { x: touch.screenX, y: touch.screenY };
    swiping.value = false;
    option?.afterTouchStart?.(e)
  }
  const onTouchMove = (e: TouchEvent) => {
    if (!swiping.value) { return }
    if (e.touches.length !== 1) return;
    option?.beforeTouchMove?.(e)
    const touch = e.touches[0];
    end.value = { x: touch.screenX, y: touch.screenY };
    option?.afterTouchMove?.(e)
  }
  const onTouchEnd = (e: TouchEvent) => {
    option?.beforeTouchEnd?.(e)
    swiping.value = false
    option?.afterTouchEnd?.(e)
  }

  onMounted(() => {
    if (!element.value) { return }
    element.value.addEventListener('touchstart', onTouchStart)
    element.value.addEventListener('touchmove', onTouchMove)
    element.value.addEventListener('touchend', onTouchEnd)
  })
  onUnmounted(() => {
    if (!element.value) { return }
    element.value.removeEventListener('touchstart', onTouchStart)
    element.value.removeEventListener('touchmove', onTouchMove)
    element.value.removeEventListener('touchend', onTouchEnd)
  })

  return { direction, swiping }
}
