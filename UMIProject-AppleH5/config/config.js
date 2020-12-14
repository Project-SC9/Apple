import path from 'path'
import webpackConfig from './webpack.config';
import routerConfig from './router.config';
import px2rem from 'postcss-plugin-px2rem';

export default {
    treeShaking: true,

    /** 浏览器路由配置 **/
    history: 'hash',
    // history: 'browser',
    /** 路由配置 **/
    routes: routerConfig,

    alias: {
        constants: '@/constants/',
        utils: '@/utils/',
        services: '@/services/',
        assets: '@/assets/',
    },
    targets: { chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10 },
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
            hd: true,
            fastClick: true,
            dynamicImport: false,
            title: 'Apple',
            dll: false,
            metas: [{ charset: 'utf-8' }],
            routes: {
                exclude: [
                    /models\//,
                    /services\//,
                    /model\.(t|j)sx?$/,
                    /service\.(t|j)sx?$/,
                    /components\//,
                ],
            },
            links: [
                { rel: 'icon', href: 'https://i.loli.net/2020/12/13/A97nvsmijK8IW4x.png' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap' },
            ],

        }],
        'umi-plugin-gh-pages',
    ],
    extraPostCSSPlugins: [
        //https://www.npmjs.com/package/postcss-plugin-px2rem
        px2rem({
            // remUnit: 41,
            rootValue: 60,
            propBlackList: ['border', 'border-top', 'border-left', 'border-right', 'border-bottom', 'border-radius', 'font-size'],//这些属性不需要转换
            selectorBlackList: ['t_npx']//以包含t_npx的class不需要转换
        })
    ],

    /** webpack配置 **/
    chainWebpack: webpackConfig,
}
