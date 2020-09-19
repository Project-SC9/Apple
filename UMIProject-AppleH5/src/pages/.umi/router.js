import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from 'E:/Apple/Apple/UMIProject-AppleH5/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    redirect: '/home/main',
    exact: true,
    _title: 'Apple',
    _title_default: 'Apple',
  },
  {
    path: '/',
    component: require('../../layouts/index').default,
    routes: [
      {
        path: '/home',
        component: require('../home/_layout').default,
        routes: [
          {
            path: '/home/main',
            component: require('../home/main/index').default,
            exact: true,
            _title: 'Apple',
            _title_default: 'Apple',
          },
          {
            component: () =>
              React.createElement(
                require('E:/Apple/Apple/UMIProject-AppleH5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
            _title: 'Apple',
            _title_default: 'Apple',
          },
        ],
        _title: 'Apple',
        _title_default: 'Apple',
      },
      {
        component: () =>
          React.createElement(
            require('E:/Apple/Apple/UMIProject-AppleH5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Apple',
        _title_default: 'Apple',
      },
    ],
    _title: 'Apple',
    _title_default: 'Apple',
  },
  {
    component: () =>
      React.createElement(
        require('E:/Apple/Apple/UMIProject-AppleH5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: 'Apple',
    _title_default: 'Apple',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
