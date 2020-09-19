export default {
    hash: true,

    /**
     * 打包输出路径
     */
    outputPath: './dist_prod',

    /**
     * 环境变量定义
     */
    define: {
        // 接口服务器地址
        'process.env.apiServerAddr': 'http://xxxxxxxx',
    },

}