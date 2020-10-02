import React, { Component } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import styles from './_layout.css';
let u = navigator.userAgent;
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
      google: u.indexOf('Chrome') > -1
    }
  }

  render() {
    const { children } = this.props;
    const { browser } = this.state;
    // if (browser.android == false && browser.iPhone == false) {
    // 	return (
    // 		<div>
    // 			请前往手机端哦
    // 		</div>
    // 	);
    // }
    // if (window.orientation == 90 || window.orientation == -90) {
    // 	return (
    // 		<div>竖屏效果更好哦 </div>
    // 	)
    // }
    return (
      <div className={styles.wrapper} ref={component => this.wrapperRef = component}>
        {children}
      </div>
    );
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


  componentDidMount() {

    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.screenDirectionHandler, false)

  }

}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  return {
    state
  }
}

export default withRouter(connect(mapStateToProps)(Index));
