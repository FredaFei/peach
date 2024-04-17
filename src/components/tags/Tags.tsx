import { defineComponent, PropType, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import s from './Tags.module.scss';
import { useTags } from '../../hooks/useTags';
import { http } from '../../shared/Http';
import { Icon } from '../icon/Icon';
import { Button } from '../button/Button';
import { useLongPress } from '../../hooks/useLongPress';
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true,
    },
    selected: Number,
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const { tags, hasMore, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        page: page + 1,
      }, {
        _mock: 'tagIndex',
        _autoLoading: true,
      });
    });
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id);
    };

    const router = useRouter()
    const main = ref<HTMLElement | undefined>()
    const onLongPress = (tagId: Tag['id']) => {
      // return_to 仅在登录页面中使用
      // router.push(`/tags/${tagId}/edit?kind=${props.kind}&return_to=${router.currentRoute.value.fullPath}`)
      router.push(`/tags/${tagId}/edit?kind=${props.kind}`)
    }
    const { onTouchStart, onTouchEnd } = useLongPress(main, { onLongPress })
   
    return () => (
      <>
        <div class={s.tags_wrapper} ref={main}>
          <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
          </RouterLink>
          {tags.value.map((tag) => (
            <div
              class={[s.tag, props.selected === tag.id ? s.selected : '']}
              onClick={() => onSelect(tag)}
              onTouchstart={(e) => onTouchStart(e, tag)}
              onTouchend={onTouchEnd}
            >
              <div class={s.sign}>{tag.sign}</div>
              <div class={s.name}>{tag.name}</div>
            </div>
          ))}
        </div>
        <div class={s.more}>
          {hasMore.value ? (
            <Button class={s.loadMore} onClick={fetchTags}>
              加载更多
            </Button>
          ) : (
            <span class={s.noMore}>没有更多</span>
          )}
        </div>
      </>
    );
  },
});
