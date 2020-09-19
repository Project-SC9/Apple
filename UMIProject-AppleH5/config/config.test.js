export default {
    hash: false,

    /**
     * 打包输出路径
     */
    outputPath: './dist_test',

    /**
     * 环境变量定义
     */
    define: {
        // 接口服务器地址
        'process.env.apiServerAddr': 'http://xxxxxxxx',
    },

}