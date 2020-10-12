import { GETRequest, POSTRequest } from 'utils/net-requests';

import {
    GET_TASK_LIST,
    GAME_LIST,
    LOG_SAVE
} from 'constants/server-apis';

/**
 * 获取图片列表
 */
export const GetTaskList = (uid, tid) => {
    return GETRequest(GET_TASK_LIST, { uid, tid });
}


/**
 * 任务栏目标获取
 */
export const GameList = (uid, tid, total) => {
    return GETRequest(GAME_LIST, { uid, tid, total });
}

/**
 * 用户日志采集【异步】
 */
export const LogSave = (uid, tid, time, log,) => {
    return GETRequest(LOG_SAVE, { uid, tid, time, log, });
}