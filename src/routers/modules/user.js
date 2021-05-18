import UserLayout from '@/layout/user'
const EditUser = () => import('@/views/user/edit')
export default {
  path: '/user',
  name: 'user',
  component: UserLayout,
  hidden: true,
  meta: {
    title: '用户',
    noCache: true
  },
  children: [
    {
      path: 'edit',
      name: 'edit',
      component: EditUser,
      meta: {
        title: '编辑个人资料',
        noCache: true
      }
    }
  ]
}
