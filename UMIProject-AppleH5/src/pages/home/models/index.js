/**
 * 游戏列表state状态
 */
import { GameTaskList } from '@/services/index'
export default {
    namespace: 'pages_game',

    state: {
        taskData: []
    },

    effects: {
        // *fetchTaskList(_, { call, put }) {
        //     const res = yield call(GameTaskList)
        //     console.log(res)
        // },
    },

    reducers: {
        taskListUpdate(state) {
            return {
                ...state,
                taskData: [
                    {
                        id: 11,
                        title: '面包炒蛋',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 12,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
                    },
                    {
                        id: 13,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 14,
                        title: '面包炒蛋',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/5PHyWdc6m2TLCZM.png"
                    },
                    {
                        id: 15,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/LPavx56qcdof2Xu.png"
                    },
                    {
                        id: 16,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/lcU2qyIR89kDvNb.png"
                    },
                    {
                        id: 17,
                        title: '面包炒蛋',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 18,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 19,
                        title: '面包炒蛋',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 20,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
                    },
                    {
                        id: 21,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 22,
                        title: '面包炒蛋',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/5PHyWdc6m2TLCZM.png"
                    },
                    {
                        id: 23,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/LPavx56qcdof2Xu.png"
                    },
                    {
                        id: 24,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/lcU2qyIR89kDvNb.png"
                    },
                    {
                        id: 25,
                        title: '面包炒蛋',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 26,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 27,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 28,
                        title: '面包炒蛋',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 29,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
                    },
                    {
                        id: 30,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 31,
                        title: '面包炒蛋',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/5PHyWdc6m2TLCZM.png"
                    },
                    {
                        id: 32,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/LPavx56qcdof2Xu.png"
                    },
                    {
                        id: 33,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/lcU2qyIR89kDvNb.png"
                    },
                    {
                        id: 34,
                        title: '面包炒蛋',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 35,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 36,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 37,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 38,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 39,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
                    },
                    {
                        id: 40,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 41,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/LPavx56qcdof2Xu.png"
                    },
                    {
                        id: 42,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/lcU2qyIR89kDvNb.png"
                    },
                    {
                        id: 43,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 44,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 45,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 46,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 47,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                    {
                        id: 48,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
                    },
                    {
                        id: 49,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
                    },
                    {
                        id: 50,
                        title: '文本标签',
                        checked: false,
                        imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
                    },
                ]
            }
        },
    },
}