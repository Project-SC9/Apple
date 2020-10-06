/**
 * 游戏列表state状态
 */
import { GetTaskList, GameList, LogSave } from '@/services'
export default {
    namespace: 'home',

    state: {
        //任务栏目标
        taskBar: {},
        //图片获取
        taskImgData: {},
        taskArray: [],
        taskArrayAfter: [],
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
            let taskArray = [];
            let taskDataLength = parseInt((taskImgData.pics.length) / 2);
            for (let i = 0; i < taskDataLength; i++) {
                taskArray[i] = taskImgData.pics.splice(0, taskDataLength);
            }
            yield put({ type: "fetchTaskImgDataUpdate", payload: { taskImgData, taskArray } })
        },
    },

    reducers: {
        fetchTaskListUpdate(state, { payload: { taskBar } }) {
            return {
                ...state,
                taskBar,
            }
        },

        fetchTaskImgDataUpdate(state, { payload: { taskImgData, taskArray } }) {
            return {
                ...state,
                taskImgData,
                taskArray: [...taskArray[0]],
                taskArrayAfter: [...taskArray[1]],
            }
        }
    },
}