import { RouteRecordRaw } from 'vue-router'
import { First } from '../components/welcome/First'
import { Second } from '../components/welcome/Second'
import { Third } from '../components/welcome/Third'
import { Forth } from '../components/welcome/Forth'
import { FirstActions } from '../components/welcome/FirstActions'
import { SecondActions } from '../components/welcome/SecondActions'
import { ThirdActions } from '../components/welcome/ThirdActions'
import { ForthActions } from '../components/welcome/ForthActions'
import { Welcome } from '../views/welcome/Welcome'
import { StartPage } from '../views/start/StartPage'
import { ItemCreate } from '../views/item/ItemCreate'
import { ItemList } from '../views/item/ItemList'
import { ItemPage } from '../views/item/ItemPage'
import { TagPage } from '../views/tag/TagPage'
import { TagCreate } from '../views/tag/TagCreate'
import { TagEdit } from '../views/tag/TagEdit'
import { SignInPage } from '../views/sign/SignInPage'
import { StatisticsPage } from '../views/statistics/StatisticsPage'
import { ComingSoon } from '../shared/ComingSoon'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: "Welcome1", components: { main: First, footer: FirstActions } },
      { path: '2', name: "Welcome2", components: { main: Second, footer: SecondActions } },
      { path: '3', name: "Welcome3", components: { main: Third, footer: ThirdActions } },
      { path: '4', name: "Welcome4", components: { main: Forth, footer: ForthActions } },
    ],
  },
  { path: '/sign_in', component: SignInPage },
  // { path: '/start', component: StartPage, },
  {
    path: '/items', component: ItemPage,
    children: [
      { path: '', component: ItemList, },
      { path: 'create', component: ItemCreate, },
    ]
  },
  {
    path: '/tags', component: TagPage,
    children: [
      { path: 'create', component: TagCreate },
      { path: ':id/edit', component: TagEdit }
    ]
  },
  { path: '/statistics', component: StatisticsPage },
  { path: '/export', component: ComingSoon },
  { path: '/notify', component: ComingSoon }
]
