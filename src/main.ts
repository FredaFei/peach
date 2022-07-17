import { createApp } from 'vue'
import { createRouter ,createWebHashHistory} from 'vue-router'
import { App } from './App'
import { Bar } from './components/Bar'
import { Foo } from './components/Foo'

const routes = [
  { path: '/', component: Foo },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

const app = createApp(App)
app.use(router)

app.mount('#app')