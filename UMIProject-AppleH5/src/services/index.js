import { GETRequest, POSTRequest } from 'utils/net-requests';

import {
    GET_TASK_LIST,
    GAME_LIST,
    LOG_SAVE,
    TASK_LIMIT
} from 'constants/server-apis';

/**
 * 获取图片列表
 */
export const GetTaskList = (uid, tid, type) => {
    return GETRequest(GET_TASK_LIST, { uid, tid, type });
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

/**
 * 每天任务上限值获取
 */
export const TaskLimit = (uid) => {
    return GETRequest(TASK_LIMIT, { uid });
}