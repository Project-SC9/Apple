/**
 * 用户反馈工具库
 */
import { EventEmitter } from 'events';
import { Toast, Modal as ModalMobile } from 'antd-mobile';
import { Modal } from 'antd';

/**
 * feedback组件配置
 */
Toast.config({ duration: 2, mask: true });

/**
 * feedback事件配置
 */
const feedbackEventEmitter = new EventEmitter();

// /**
//  * Toast.success()提示
//  */
// feedbackEventEmitter.addListener('feedback.event.toast.success', (content, resolve) => {
//   Toast.success(content);
// });

// export const toastSuccess = (content) => {
//   return new Promise((resolve) => {
//     feedbackEventEmitter.emit('feedback.event.toast.success', content, resolve);
//   });
// }

// /**
//  * Toast.info()提示
//  */
// feedbackEventEmitter.addListener('feedback.event.toast.info', (content, resolve) => {
//   Toast.info(content);
// });

// export const toastInfo = (content) => {
//   return new Promise((resolve) => {
//     feedbackEventEmitter.emit('feedback.event.toast.info', content, resolve);
//   });
// }

// /**
//  * Toast.fail()提示
//  */
// feedbackEventEmitter.addListener('feedback.event.toast.fail', (content, resolve) => {
//   Toast.fail(content);
// });

// export const toastFail = (content) => {
//   return new Promise((resolve) => {
//     feedbackEventEmitter.emit('feedback.event.toast.fail', content, resolve);
//   });
// }

/**
 * modal.success()提示
 */
feedbackEventEmitter.addListener('feedback.event.modal.success', (content, resolve) => {
  Modal.success({
    // title: '提示',
    content: content,
    okText: '确定',
    okType: 'primary',
    onOk: () => resolve(),
  });
});

export const modalSuccess = (content) => {
  return new Promise((resolve) => {
    feedbackEventEmitter.emit('feedback.event.modal.success', content, resolve);
  });
}

/**
 * modal.error()提示
 */
feedbackEventEmitter.addListener('feedback.event.modal.error', (content, resolve) => {
  Modal.error({
    // title: '提示',
    content: content,
    okText: '确定',
    okType: 'primary',
    onOk: () => resolve(),
  });
});

export const modalError = (content) => {
  return new Promise((resolve) => {
    feedbackEventEmitter.emit('feedback.event.modal.error', content, resolve);
  });
}


export const CONFIRM_MODAL_OK = 'ok';
export const CONFIRM_MODAL_CANCEL = 'cancel';

/**
 * modal.confirm()提示
 */
feedbackEventEmitter.addListener('feedback.event.modal.confirm', (title, content, resolve) => {
  Modal.confirm({
    title: title,
    content: content,
    okText: "确认",
    cancelText: "取消",
    onCancel: () => resolve(CONFIRM_MODAL_CANCEL),
    onOk: () => resolve(CONFIRM_MODAL_OK),
  });
});

export const modalConfirm = (title, content) => {
  return new Promise((resolve) => {
    feedbackEventEmitter.emit('feedback.event.modal.confirm', title, content, resolve);
  });
}

/**
 * modalMobile.alert()提示：小型对话框
 */
feedbackEventEmitter.addListener('feedback.event.modalMobile.alert', (title, content, resolve) => {
  ModalMobile.alert({
    title: title,
    content: content,
    okText: "OK",
    cancelText: "Cancel",
    onCancel: () => resolve(CONFIRM_MODAL_CANCEL),
    onOk: () => resolve(CONFIRM_MODAL_OK),
  });
});

export const modalMobileAlert = (title, content) => {
  return new Promise((resolve) => {
    feedbackEventEmitter.emit('feedback.event.modalMobile.alert', title, content, resolve);
  });
}