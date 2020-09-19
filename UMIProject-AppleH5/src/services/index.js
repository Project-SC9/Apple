import { postEncryptRequest, postEncryptSignedRequest } from 'utils/net-requests';

import {
 
} from 'constants/server-apis';

// /**
//  * 获取首页基础配置
//  */
// export const lobbyHomeBasicConfig = () => {
//   return postEncryptRequest(LOBBY_HOME_BASIC_CONFIG);
// }

// /**
//  * 玩家提现
//  */
// export const playerWithdraw = (money, userBankCardId, userBankPassword) => {
//   return postEncryptSignedRequest(PlAYER_WITHDRAWS, { money, userBankCardId, userBankPassword });
// }