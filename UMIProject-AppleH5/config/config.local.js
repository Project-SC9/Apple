export default {
    hash: false,

    /**
     * 环境变量定义
     */
    define: {
        // 接口服务器地址
        'process.env.apiServerAddr': 'http://localhost:8000/juuuce',
    },

    /** 代理配置 **/
    proxy: {
        '/juuuce': {
            target: 'http://babistep.com',
            changeOrigin: true,
            secure: false,
            // pathRewrite: {
            //     '^/pic': '',
            // },
        },
    },
}