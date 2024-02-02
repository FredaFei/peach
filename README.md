# 番茄记账应用

技术栈

+ Vue 3 + TypeScript + Vant + pinia
+ Vite

## 如何开发

```bash
  pnpm install
  pnpm run dev
```

## 如何打包
  
```bash
  pnpm run build
```
## 部署

```bash
  pnpm run build --base /
  bin/coscli-linux cp -r dist cos://mangosteen-test-3-1305090081
```

## 编码规范

### ref 默认值

推荐使用

```tsx
  const div = ref<HTMLDivElement>();
```

不推荐使用

```tsx
  const div = ref<HTMLDivElement | null>(null);
```

## TODO

- [ ] 仅删除标签（不删除关联的记账）后，处理没有标签的记账展示；
- [ ] 可查看记账详情页，并支持修改；
- [ ] 添加标签页面的回退按钮支持返回上次的记账类型（收入还是支出）；
- [ ] 支出删除记账（单个）；
- [ ] 支出删除记账（多个）；
- [ ] 统计页面中图表支出的最小单位为周展示；
