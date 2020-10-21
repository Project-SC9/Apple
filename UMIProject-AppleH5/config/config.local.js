export default {
    hash: false,

    /**
     * 环境变量定义
     */
    define: {
        // 接口服务器地址
        'process.env.apiServerUrl': 'http://localhost:8000',
        'process.env.host': 'http://localhost:8000',
    },

    /** 代理配置 **/
    proxy: {
        '/juuuce': {
            target: 'https://juuuce.com',
            changeOrigin: true,
            secure: false,
            // pathRewrite: {
            //     '^/pic': '',
            // },
        },
    },
}