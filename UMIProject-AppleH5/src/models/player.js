/**
 * 游戏列表state状态
 */
import { GetTaskList, GameList, LogSave } from '@/services'
export default {
    namespace: 'player',

    state: {
        //任务栏目标
        taskBar: {},
        taskLabelData: [],
        //图片获取
        taskImgData: [],
        //首页轮播
        mainSwiperList: [],
        // 任务数组
        taskArray: [],
        taskArrayAfter: [],
        //正确选中
        starImgCheck: [],
        //我的奖励
        // awardList: [
        //     {
        //         title: "奖励名称",
        //         name: "还未获得",
        //         get: 0,
        //     },
        // ],
        awardList: [],
        newAwardList: {
            title: "",
            name: "",
            date: ""
        },
        logSave: ""
    },

    effects: {
        //任务栏目标
        *fetchTaskList({ payload: { uid, tid } }, { call, put }) {
            const { data: taskBar } = yield call(GetTaskList, uid, tid);
            yield put({ type: "fetchTaskListUpdate", payload: { taskBar } })
        },
        //图片获取
        *fetchTaskImgData({ payload: { uid, tid, total } }, { call, put }) {
            const { data: taskImgData } = yield call(GameList, uid, tid, total);
            let newMainSwiperList = taskImgData.pics.filter(item => item.key == ":startpage")
            let taskImgDataLabels = taskImgData.labels.filter(item => item !== "qishiye")
            let newTaskImgData = taskImgData.pics.filter(item => item.key !== ":startpage")
            // 轮播分组
            let swiperArray = [];
            let swiperDataLength = parseInt((newMainSwiperList.length) / 8);
            for (let i = 0; i < swiperDataLength; i++) {
                swiperArray[i] = newMainSwiperList.splice(0, swiperDataLength);
            }
            //游戏分组
            let taskLabelData = taskImgDataLabels
            let taskArray = [];
            let taskDataLength = parseInt((newTaskImgData.length) / 2);
            for (let i = 0; i < taskDataLength; i++) {
                taskArray[i] = newTaskImgData.splice(0, taskDataLength);
            }
            yield put({ type: "fetchTaskImgDataUpdate", payload: { taskLabelData, newTaskImgData, taskArray, swiperArray } })
        },


        //任务栏目标
        *fetchLogSave({ payload: { uid, tid, time, log } }, { call, put }) {
            const { data: { lid: logSave } } = yield call(LogSave, uid, tid, time, log);
            yield put({ type: "fetchLogSaveUpdate", payload: { logSave } })
        },
    },

    reducers: {
        fetchTaskListUpdate(state, { payload: { taskBar } }) {
            return {
                ...state,
                taskBar,
            }
        },
        fetchTaskImgDataUpdate(state, { payload: { taskLabelData, newTaskImgData, taskArray, swiperArray } }) {
            return {
                ...state,
                taskLabelData,
                mainSwiperList: swiperArray,
                taskImgData: newTaskImgData,
                taskArray: [...taskArray[0]],
                taskArrayAfter: [...taskArray[1]],
            }
        },
        //日志
        fetchLogSaveUpdate(state, { payload: { logSave } }) {
            return {
                ...state,
                logSave,
            }
        },
        // //正确选中
        starImgCheckUpdate(state, { payload: { starImgCheck } }) {
            const starImgCheckList = [...starImgCheck]
            return {
                ...state,
                starImgCheck: starImgCheckList,
            }
        },
        //正确选中
        awardListUpdate(state, { payload: { awardList } }) {
            const awardDataList = [...awardList]
            return {
                ...state,
                awardList: awardDataList,
            }
        },
        //当前正确选中
        newAwardListUpdate(state, { payload: { date, number, title } }) {
            const newAwardList = { date, number, title }
            return {
                ...state,
                newAwardList: newAwardList,
            }
        }
    },
}