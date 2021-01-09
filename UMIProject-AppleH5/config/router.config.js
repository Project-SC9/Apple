/**
 * 路由配置 (相对于pages来配置component路径)
 */
export default [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      // {
      //   path: '/',
      //   redirect: '/juuuce/index',
      // },
      
      {
        path: '/',
        component: './website/index',
      },
      // Home
      {
        path: '/juuuce/home',
        component: './home/_layout',
        routes: [
          {
            path: '/juuuce/home/main',
            component: './home/main/index',
          },
          {
            path: '/juuuce/home/game',
            component: './home/game/test',
          },
          {
            path: '/juuuce/home/begin',
            component: './home/orgin-ad/index',
          },
        ],
      },
      {
        path: '/juuuce/main',
        component: './mobile/index',
      },
    ],
  },


]