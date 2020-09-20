import path from 'path'
import webpackConfig from './webpack.config';
import routerConfig from './router.config';

export default {
    treeShaking: true,

    /** 浏览器路由配置 **/
    history: 'hash',

    /** 路由配置 **/
    routes: routerConfig,

    alias: {
        constants: '@/constants/',
        utils: '@/utils/',
        services: '@/services/',
        assets: '@/assets/',
    },
    plugins: [
        ['umi-plugin-react', {
            locale: {
                default: 'zh-CN',
                baseNavigator: false, // 为true时，用浏览器自带的navigator.language
                antd: true, // 启用antd的<LocalProvider />
            },
            antd: true,
            dva: {
                hmr: true,
            },
            dynamicImport: false,
            title: 'Apple',
            dll: true,

            routes: {
                exclude: [
                    /models\//,
                    /services\//,
                    /model\.(t|j)sx?$/,
                    /service\.(t|j)sx?$/,
                    /components\//,
                ],
            },
        }],
        'umi-plugin-gh-pages',
    ],
    base: '/Project-SC9/Apple/',
    publicPath: '/Project-SC9/Apple/',

    /** webpack配置 **/
    chainWebpack: webpackConfig,
}