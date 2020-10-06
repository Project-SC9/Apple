import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva';
import withRouter from 'umi/withRouter';
import styles from './index.css';
import router from 'umi/router';
import { swiperMainList, swiperMainTitle } from 'assets/locus';
import { Button, Modal } from 'antd-mobile';
import { Carousel } from 'antd';
import ReactSwipes from 'react-swipes'
import { GetTaskList, GameList, LogSave } from '@/services'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
const TASK_TOTAL = 80
/**
 * 首页
 */
class Index extends Component {
  state = {
    slideIndex: 1,
    popup: false,
    activeIndex: 1,
  }
  render() {
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
              afterChange={(current) => { this.setState({ slideIndex: current }); this.swiperRef && this.swiperRef.slideTo(current) }}>
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

            <Swiper
              spaceBetween={0}
              slidesPerView={2.8}
              initialSlide={this.state.slideIndex}
              className='swiper-container'
              ref={component => this.swiperRef = component}
              onSlideChange={(val) => this.slider && this.slider.innerSlider.slickGoTo(val.activeIndex)}
            >
              {swiperMainList.map((val, index) => (
                <SwiperSlide key={index} className={styles.carousel}>
                  {
                    val.image.map((item, index) => { return (<img src={item} key={index} style={{ width: '100%', verticalAlign: 'top', }} />) })
                  }
                </SwiperSlide>
              ))}
            </Swiper>
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

  gameStartClickedHandler = () => {
    const { dispatch, taskBar, taskImgData, taskArray, taskArrayAfter } = this.props;
    if (this.props.location.query.uid == undefined) {
      this.setState({
        popup: true
      })
      return
    }
    router.push(`/home/game?uid=${this.props.location.query.uid}&tid=${this.props.location.query.tid}`)
    // dispatch(routerRedux.replace({
    //   pathname: `/home/game`,
    //   query: { taskBar, taskImgData, taskArray, taskArrayAfter }
    // }))
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
    const { dispatch } = this.props;
    // 任务栏
    dispatch({
      type: "player/fetchTaskList",
      payload: {
        uid: this.props.location.query.uid,
        tid: this.props.location.query.tid
      }
    })
  }

  /**
   * 图片列表
   */
  _fetchTaskImg = () => {
    const { dispatch, taskBar } = this.props;
    //图片列表
    dispatch({
      type: "player/fetchTaskImgData",
      payload: {
        uid: this.props.location.query.uid,
        tid: taskBar.tid,
        total: TASK_TOTAL
      }
    })
  }

  async componentDidMount() {
    await this._fetchTaskBar()//获取加载
    this._fetchTaskImg()

    this.slider && this.slider.innerSlider.slickGoTo(this.state.slideIndex)
    if (this.props.location.query.uid == undefined) {
      this.setState({
        popup: true
      })
      return
    }
    // console.log('1')
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'home/fetchTaskList',
    //   payload: {
    //     uid: "abx111",
    //     tid: 123332,
    //     total: 10,
    //   },
    // })

    // GetTaskList('abx111', 123332)
    //   .then((data) => {
    //     console.log('任务栏目标获取')
    //     console.log(data)
    //   });

    // GameList('abx111', 123332, 10)
    //   .then((data) => {
    //     console.log('图片列表查询')
    //     console.log(data)
    //   });
    // "time": "20200909123111",
    // LogSave('abx111', 123332, "close", "20200909123111")
    //   .then((data) => {
    //     console.log('ggg')
    //     console.log(data)
    //   });
    // console.log("网页可见区域宽", document.body.clientHeight)
    // console.log("网页正文全文宽：", document.body.scrollWidth)
    // console.log("网页可见区域宽：", document.body.offsetWidth)
    // console.log("网页被卷去的左：", document.body.scrollLeft)
    console.log("屏幕分辨率的宽：", window.screen.width)
    // console.log("屏幕可用工作区宽度：", window.screen.availWidth)
  }
}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  const { taskBar, taskImgData, taskArray, taskArrayAfter } = state.player;
  return {
    taskBar: taskBar,
    taskImgData: taskImgData,
    taskArray: taskArray,
    taskArrayAfter: taskArrayAfter,
  };
}

export default withRouter(connect(mapStateToProps)(Index))
