/**
 * 玩家端Api接口地址
 */

/**
 * 服务器地址(开发)
 */
// const BASE_HOST_URL = process.env.apiServerUrl;
const BASE_HOST_URL = "https://juuuce.com";

/**
 * 服务器路径
 */
const API_PATH = '/juuuce';

/**
 * 任务栏目标获取
 */
export const GET_TASK_LIST = BASE_HOST_URL + API_PATH + '/task/get.json';

/**
 * 获取图片列表
 */
export const GAME_LIST = BASE_HOST_URL + API_PATH + '/pic/list.json';


/**
 * 用户日志采集【异步】
 */
export const LOG_SAVE = BASE_HOST_URL + API_PATH + '/log/save.json';



/**
 * 每天任务上限值获取
 */
export const TASK_LIMIT = BASE_HOST_URL + API_PATH + '/task/limit.json';
