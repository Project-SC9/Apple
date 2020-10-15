/**
 * 路由配置 (相对于pages来配置component路径)
 */
export default [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/',
        redirect: '/home/main',
      },
      // Home
      {
        path: '/home',
        component: './home/_layout',
        routes: [
          {
            path: '/home/main',
            component: './home/main/index',
          },
          {
            path: '/home/game',
            component: './home/game/index',
          },
          // {
          //   path: '/home/test',
          //   component: './home/test/test',
          // },
        ],
      },
    ],
  },


]