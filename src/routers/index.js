import Vue from 'vue'
import Router from 'vue-router'
import User from './modules/user'
const MainLayout = () => import('@/layout/main')
const Home = () => import('@/views/home')
const Login = () => import('@/views/login')

const UserReg = () => import('@/views/reg')
const NoAuthPage = () => import('@/views/error-page/401')
const NotFoundPage = () => import('@/views/error-page/404')

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

export const constantRoutes = [
  {
    path: '/',
    name: 'mainLayout',
    component: MainLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/reg',
    name: 'reg',
    component: UserReg,
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
  },
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: Redirect
  //     }
  //   ]
  // },

  {
    path: '/401',
    component: () => NoAuthPage,
    hidden: true
  },
  {
    path: '/404',
    component: NotFoundPage,
    hidden: true
  },
  /** when your routing map is too long, you can split it into small modules **/
  User
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history', // require service support
    routes: constantRoutes
  })

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
