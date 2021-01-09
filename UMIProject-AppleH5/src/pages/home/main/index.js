import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva';
import withRouter from 'umi/withRouter';
import styles from './index.css';
import router from 'umi/router';
import { swiperMainList, swiperMainTitle } from 'assets/locus';
import { Button, Modal } from 'antd-mobile';
import { Carousel } from 'antd';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment'
const TASK_TOTAL = 160
/**
 * 首页
 */
class Index extends Component {
  state = {
    slideIndex: 1,
    popup: false,
    activeIndex: 1,
    swiperObj: null
  }
  settings = {
    // dots: true,
    infinite: false,
    // speed: 500,
    slidesToShow: 2.7,
    initialSlide: this.state.slideIndex
    // slidesToScroll: 1
  }
  render() {
    const { mainSwiperList } = this.props
    return (
      <>
        <div className={styles.main}>
          <div className={styles.main_top}>
            <img src={require('assets/image/logo.png')} />
            <button className={styles.main_come_button} onClick={this.gameStartClickedHandler}>开始游戏</button>
          </div>

          <div className={styles.main_content}>
            {/**图片区 */}
            <Carousel
              className={styles.swiper} effect="fade" ref={el => (this.slider = el)}
              afterChange={(current) => this.afterChangedhandler(current)}>
              {
                swiperMainTitle.map((val, index) => {
                  return (
                    <div className={styles.swiper_content} key={index} >
                      <p>{val.title}</p>
                      <h3 text={val.text}>{val.text}</h3>
                    </div>
                  )
                })
              }
            </Carousel>


            <div className={styles.mainSwiper}>

              <Slider {...this.settings} ref={el => this.swiperRef = el} afterChange={(index) => { this.slider && this.slider.innerSlider.slickGoTo(parseInt(index)); }}>
                {mainSwiperList.map((val, index) => {
                  return (
                    <div style={{ touchAction: "none" }} key={index}>
                      <div className={styles.carousel} onTouchStart={() => this.swiperTouchStartHandler(index)}>
                        {
                          val.map((item, index) => {
                            return (
                              <div key={index} className={styles.task_list}>
                                <img src={`https://juuuce.com/media_static/${item.url}`} style={{ width: '100%', verticalAlign: 'top', }} />
                                <p className={styles.task_title}>{item.desc}</p>
                              </div>

                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
          {
            !!this.state.popup ? this.renderPopUpBoxPrompt() : null
          }


        </div>
        {/** 遮罩层  */}
        <div className={styles.mask_white}></div>
      </>
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

  /**
   * 开始游戏
   */
  gameStartClickedHandler = () => {
    const { dispatch, taskBar, taskImgData, taskArray, taskArrayAfter, taskNumber } = this.props;
    if (this.props.location.query.uid == undefined) {
      this.setState({
        popup: true
      })
      return
    }
    router.push(`/juuuce/home/game?uid=${this.props.location.query.uid}&tid=${taskBar.tid}`)
    let newdate = moment().format('YYYYMMDDHHmmss')
    let cxt = "点击开始游戏"
    this._catchLogSave(newdate, cxt)

  }

  swiperTouchStartHandler = (idx) => {
    let newdate = moment().format('YYYYMMDDHHmmss')
    let cxt = `滑动第${idx}排`
    this._catchLogSave(newdate, cxt)
  }

  afterChangedhandler = (current) => {
    this.setState({ slideIndex: current });
    this.swiperRef.slickGoTo(current)
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
  /**
   * 获取任务目标
   */
  _fetchTaskBar = () => {
    const { dispatch, localUid } = this.props;
    // 任务栏
    dispatch({
      type: "player/fetchTaskList",
      payload: {
        uid: this.props.location.query.uid,
        tid: Number(localUid),
        type: this.props.taskType,
      }
    })
  }

  /**
   * 图片列表
   */
  _fetchTaskImg = () => {
    const { dispatch, localUid } = this.props;
    //图片列表
    dispatch({
      type: "player/fetchTaskImgData",
      payload: {
        uid: this.props.location.query.uid,
        tid: Number(localUid),
        total: TASK_TOTAL
      }
    })
  }
  //日志
  _catchLogSave = (time, cxt) => {
    const { dispatch, localUid } = this.props;
    dispatch({
      type: "player/fetchLogSave",
      payload: {
        uid: this.props.location.query.uid,
        tid: Number(localUid),
        time: time,
        log: cxt
      }
    })
  }

  _fetchTaskLimit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "player/fetchTaskLimit",
      payload: {
        uid: this.props.location.query.uid,
      }
    })
  }

  async componentDidMount() {
    this.slider && this.slider.innerSlider.slickGoTo(this.state.slideIndex)

    if (this.props.location.query.uid == undefined) {
      this.setState({
        popup: true
      })
      return
    } else {
      await this._fetchTaskBar()//获取加载
      this._fetchTaskImg()
      this._fetchTaskLimit()
    }

    let newdate = moment().format('YYYYMMDDHHmmss')
    let cxt = "打开网页"
    await this._catchLogSave(newdate, cxt)
  }

}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  const { taskBar, taskImgData, taskArray, taskArrayAfter, mainSwiperList, taskType, localUid, taskNumber } = state.player;
  return {
    taskBar: taskBar,
    taskImgData: taskImgData,
    taskArray: taskArray,
    taskArrayAfter: taskArrayAfter,
    mainSwiperList: mainSwiperList,
    taskType: taskType,
    localUid: localUid,
    taskNumber: taskNumber
  };
}

export default withRouter(connect(mapStateToProps)(Index))