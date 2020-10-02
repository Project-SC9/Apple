import { GETRequest, POSTRequest } from 'utils/net-requests';

import {
    GAME_TASK_LIST
} from 'constants/server-apis';

/**
 * 获取游戏列表
 */
export const GameTaskList = () => {
    return GETRequest(GAME_TASK_LIST);
}
