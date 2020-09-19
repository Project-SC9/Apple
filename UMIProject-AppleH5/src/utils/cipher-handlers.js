/**
 * 密文处理库(AES,MD5等)
 */
import CryptoJS from 'crypto-js'

const AES_192_CBC_ENCRYPT_KEY = CryptoJS.enc.Latin1.parse('123456781234567812345678');
const AES_192_CBC_ENCRYPT_IV = CryptoJS.enc.Latin1.parse('1234567812345678');

/**
 * 加密：AES-192-CBC
 */
export const aes192CBCEncrypt = (plainText) => {
  return CryptoJS.AES.encrypt(plainText, AES_192_CBC_ENCRYPT_KEY, {
      iv: AES_192_CBC_ENCRYPT_IV,
      mode: CryptoJS.mode.CBC,
      adding: CryptoJS.pad.ZeroPadding
    }).toString()
}

/**
 * 解密：AES-192-CBC
 */
export const aes192CBCDecrypt = (cipherText) => {
  return CryptoJS.AES.decrypt(cipherText, AES_192_CBC_ENCRYPT_KEY, {
      iv: AES_192_CBC_ENCRYPT_IV,
      mode: CryptoJS.mode.CBC,
      adding: CryptoJS.pad.ZeroPadding
    }).toString(CryptoJS.enc.Utf8)
}

/**
 * 加密：MD5
 */
export const md5Encrypt = (plainText) => {
  return CryptoJS.MD5(plainText).toString()
}
