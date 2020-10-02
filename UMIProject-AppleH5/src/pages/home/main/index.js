import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './index.css';
import { swiperMainList, swiperMainTitle } from 'assets/locus';

import { Button, Modal } from 'antd-mobile';
import { Carousel } from 'antd';
import ReactSwipes from 'react-swipes'
/**
 * 首页
 */
class Index extends Component {
  state = {
    slideIndex: 1,
    popup: false
  }
  opt = {
    distance: 425, // 每次移动的距离，卡片的真实宽度
    currentPoint: 0,// 初始位置，默认从0即第一个元素开始
    swTouchend: (ev) => {
      let data = {
        moved: ev.moved,
        originalPoint: ev.originalPoint,
        newPoint: ev.newPoint,
        cancelled: ev.cancelled
      }
      this.slider && this.slider.innerSlider.slickGoTo(ev.newPoint)
    }
  }
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.main_top}>
          <img src={require('assets/image/logo.png')} />
          <Link to='/home/game'><button className={styles.main_come_button}>开始游戏</button></Link>
        </div>

        <div className={styles.main_content}>
          {/**图片区 */}
          <Carousel className={styles.swiper} effect="fade" ref={el => (this.slider = el)} afterChange={(current) => this.setState({ slideIndex: current })}>
            {
              swiperMainTitle.map((val, index) => {
                return (
                  <div className={styles.swiper_content} key={index}>
                    <p>{val.title}</p>
                    <h3 text={val.text}>{val.text}</h3>
                  </div>
                )
              })
            }
          </Carousel>

          <div className={styles.viewport}>
            <div className={styles.flipsnap}>
              <ReactSwipes className={styles.card_slide} options={this.opt}>
                {swiperMainList.map((val, index) => (
                  <div key={index} className={styles.carousel}>
                    {
                      val.image.map((item, index) => { return (<img src={item} key={index} style={{ width: '100%', verticalAlign: 'top', }} />) })
                    }
                  </div>
                ))}
              </ReactSwipes>
            </div>
          </div>
        </div>
        {
          !!this.state.popup ? this.renderPopUpBoxPrompt() : null
        }
      </div>
    )
  }
  /**
   * 用户输入网址弹出框提示
   */
  renderPopUpBoxPrompt = () => {
    return (
      <div className={styles.popup}>
        <Modal
          visible={this.state.popup}
          transparent
          maskClosable={true}
          onClose={() => this.setState({ popup: false })}
          wrapClassName={styles.popup_modal}>
          <div className={styles.popup_box}>
            <div className={styles.modal_header}>
              <img src={require('assets/image/logo.png')} />
              { /**<p onClick={() => this.setState({ popup: false })}>x</p>*/}
            </div>
            <div className={styles.modal_content}>
              <img src={require('assets/image/smartphone.png')} />
              <h2>扫描酒店内Juuuce二维码，玩游戏得奖励。</h2>
              <Button onClick={() => this.setState({ popup: false })}>我知道了</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  WrapTouchStartHandler = (e) => {
    // wrapProps = {{ onTouchStart: this.WrapTouchStartHandler }}
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  componentDidMount() {
    this.slider && this.slider.innerSlider.slickGoTo(this.state.slideIndex)
    if (this.props.location.query.uid == undefined) {
      this.state.popup = true
    }
  }
}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  return {
    state
  };
}

export default connect(mapStateToProps)(Index);
