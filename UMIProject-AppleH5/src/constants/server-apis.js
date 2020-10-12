/**
 * 玩家端Api接口地址
 */

/**
 * 服务器地址(开发)
 */
const BASE_HOST_URL = process.env.apiServerUrl;
// const BASE_HOST_URL = "http://babistep.com";

/**
 * 服务器路径
 */
const API_PATH = '/juuuce';

/**
 * 任务栏目标获取
 */
// export const GET_TASK_LIST = "http://localhost:8000/juuuce/task/get.json";
export const GET_TASK_LIST = BASE_HOST_URL + API_PATH + '/task/get.json';
// export const GET_TASK_LIST = 'http://project-sc9.github.io/Apple/juuuce/task/get.json';

/**
 * 获取图片列表
 */
// export const GAME_LIST = "http://localhost:8000/juuuce/pic/list.json";
export const GAME_LIST = BASE_HOST_URL + API_PATH + '/pic/list.json';
// export const GAME_LIST = 'https://project-sc9.github.io/Apple/juuuce/pic/list.json';


/**
 * 用户日志采集【异步】
 */
// export const LOG_SAVE = "http://localhost:8000/juuuce/log/save.json";
export const LOG_SAVE = BASE_HOST_URL + API_PATH + '/log/save.json';
// export const LOG_SAVE = 'https://project-sc9.github.io/Apple/juuuce/log/save.json';
