/**
 * 作为整个系统的网络请求库
 */
import { extend } from 'umi-request';
import { modalError, modalMobileAlert } from 'utils/feedbacks';

import {
  aes192CBCEncrypt,
  aes192CBCDecrypt,
  md5Encrypt,
} from 'utils/cipher-handlers';

import moment from 'moment';

// import { MERCHANT_NUMBER } from 'constants/business-identifiers';

/**
 * 路由跳转
 */
import router from 'umi/router';

/**
 * 网络连接超时时间(ms)
 */
const NET_CONNECTION_TIME_OUT = 120 * 1000;

const codeMessageMap = {
  '404': '您访问的资源不存在',
  '500': '服务器发生错误，请检查服务器',
};

/**
 * 全局异常处理(当状态码不为2XX时触发)
 */
const _netErrorHandler = async (error) => {
  const { response = {} } = error;
  const { dispatch } = window.g_app._store;

  // 1、确定错误信息
  let errorMsg = !response.status ? codeMessageMap['500'] : codeMessageMap[response.status] || response.statusText;

  // 2、提示错误信息
  await modalMobileAlert(errorMsg);

  // 3、抛出错误异常
  throw { errorMsg };
};

const _commonNetRequestConfigs = {
  /** 超时时间(ms) **/
  timeout: NET_CONNECTION_TIME_OUT,
  /** 请求后缀 **/
  // suffix: '.html',
  /** 是否返回源response, 返回结果将包含一层 { data, response } **/
  getResponse: false,
  /** 'useCache' 是否使用缓存，当值为 true 时，GET 请求在 ttl 毫秒内将被缓存，缓存策略唯一 key 为 url + params 组合 **/
  useCache: false, // default
  /** 'ttl' 缓存时长（毫秒）， 0 为不过期 **/
  // ttl: 60000,
  /** 'maxCache' 最大缓存数， 0 为无限制 **/
  // maxCache: 0,
  /** 编码 **/
  charset: 'utf8',
  /** 异常处理 **/
  errorHandler: _netErrorHandler,
};

/**
 * 密文处理中间件处理程序
 */
const _cipherHandlerMiddleware = async (ctx, next) => {
  ctx.req.options.data = aes192CBCEncrypt(ctx.req.options.data)
  await next()
  ctx.res = aes192CBCDecrypt(ctx.res)
};

/**
 * JSON处理中间件处理程序
 */
const _jsonHandlerMiddleware = async (ctx, next) => {
  ctx.req.options.data = JSON.stringify(ctx.req.options.data);
  await next();
  // ctx.res = JSON.parse(ctx.res)
};

/**
 * 身份认证中间件
 */
const _authHandlerMiddle = async (ctx, next) => {
  const { player } = window.g_app._store.getState();
  // const { auth: { playerUserId, username, token } } = player;

  // if (!playerUserId || !username || !token) {
  //   throw { response: { 'status': 401 } };
  // }

  await next();
};

/**
 * 普通的get请求
 */
export const GETRequest = (url, params) => {
  const request = extend({ ..._commonNetRequestConfigs });
  return request.get(url, { params });
};

// /**
//  * 普通的post请求
//  */
// export const POSTRequest = (url, params) => {
//   const request = extend({ ..._commonNetRequestConfigs, requestType: 'json' });
//   request.use(_jsonHandlerMiddleware);
//   request.use(_cipherHandlerMiddleware);
//   return request.post(url, { data: json });
// };

/**
 * 普通的post请求
 */
export const POSTRequest = (url, params) => {
  const request = extend({ ..._commonNetRequestConfigs, requestType: 'json' });
  // request.use(_jsonHandlerMiddleware);
  return request.post(url, { data: params });
};