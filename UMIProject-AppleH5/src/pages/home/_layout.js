import React, { Component } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import styles from './_layout.css';

import { Modal, Button } from 'antd';
let u = navigator.userAgent;
let ua = navigator.userAgent,
  isWindowsPhone = /(?:Windows Phone)/.test(ua),
  isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
  isAndroid = /(?:Android)/.test(ua),
  isFireFox = /(?:Firefox)/.test(ua),
  isChrome = /(?:Chrome|CriOS)/.test(ua),
  isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
  isPhone = /(?:iPhone)/.test(ua) && !isTablet,
  isPc = !isPhone && !isAndroid && !isSymbian;
/**
 * 布局
 */
class Index extends Component {
  state = {
    browser: {//移动终端浏览器版本信bai息
      trident: u.indexOf('Trident') > -1, //IE内核du
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
      google: u.indexOf('Chrome') > -1,
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc
    },
  }

  render() {
    const { children } = this.props;
    const { browser } = this.state;
    if (window.orientation == 90 || window.orientation == -90) {
      return (
        <div className={styles.orientation_text}><h2>竖屏效果更好哦</h2> </div>
      )
    }
    // if (window.screen.width > 450) {
    //   return (<div> { this.renderModal()} </div>);
    // }

    if (browser.android == false && browser.iPhone == false) {
      return (<div> { this.renderModal()} </div>);
    }


    return (
      <div className={styles.wrapper} ref={component => this.wrapperRef = component}>
        {children}
      </div>
    );
  }

  renderModal = () => {
    return (
      <Modal
        title=""
        centered
        visible={true}
        closable={false}
        footer={null}
        wrapClassName={styles.modal_hint}
      >
        <div className={styles.hint_box}>
          <div className={styles.hint_header}>
            <img src={require('assets/image/logo.png')} />
          </div>
          <div className={styles.hint_content}>
            <img src={require('assets/image/smartphone.svg')} />
            <h2>现仅支持手机版</h2>
            <p>请使用手机扫码进入赢取奖励</p>

            <p className={styles.button} onClick={this.windowCloseClickedHandler}>我知道了</p>
          </div>
        </div>
      </Modal>
    )
  }
  /**
 * 屏幕方向
 */
  screenDirectionHandler = () => {
    // 利用 CSS3 旋转 对根容器逆时针旋转 90 度
    const width = document.documentElement.clientWidth; //获取当前手机屏宽
    const height = document.documentElement.clientHeight; //手机褡高
    window.location.reload()
  }

  windowCloseClickedHandler = () => {
    // window.location.href = "about:blank";
    window.location.href = "https://www.baidu.com/";
    window.close();
  }

  componentDidMount() {
    // this.screenDirectionHandler()
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.screenDirectionHandler, false)
    const { dispatch, taskNumber } = this.props
    setInterval(() => {
      dispatch({ type: "player/taskLimitUpdate", payload: { taskNumber: taskNumber } })
    }, 86400000)
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true
    } else {
      return false
    }

  }

}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  const { taskNumber } = state.player;
  return {
    state,
    taskNumber: taskNumber
  }
}

export default withRouter(connect(mapStateToProps)(Index));
