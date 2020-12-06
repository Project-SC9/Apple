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
        redirect: '/home/begin',
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
            component: './home/game/test',
          },
          {
            path: '/home/begin',
            component: './home/orgin-ad/index',
          },
        ],
      },
      {
        path: '/index',
        component: './website/index',
      },
      {
        path: '/main',
        component: './mobile/index',
      },
    ],
  },


]