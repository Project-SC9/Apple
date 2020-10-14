import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux'
import ClassifyBar from '../compontents/classify-bar';
import SearchBar from '../compontents/search';
import BehaviorBar from '../compontents/behavior-bar';
import ModalPopup from '../compontents/modal-popup';

import moment from 'moment'
import {
  StarFilled
} from '@ant-design/icons';

import Masonry from 'masonry-layout'  //实现瀑布流
import imagesloaded from 'imagesloaded' //监听图片加载
import InfiniteScroll from 'react-infinite-scroller' //下拉加载

import { spin } from 'antd-mobile';

const TASK_TOTAL = 160
/**
 * 游戏内容页
 */
export class Index extends Component {

  componentDidMount() {
    this._fetchTaskBarImg()//获取加载

    this.imagesOnload()//图片加载
    window.addEventListener("resize", function () {
      // 解决键盘弹起后遮挡输入框的问题
      if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      moveUp: true,
      success: true,
      taskPopup: false,
      awardPopup: false,
      awardAllPopup: false,
      userRewardPopup: false,
      notificationPopup: false,
      taskImgurl: 'https://i.loli.net/2020/10/01/x4c3eSwDNRiK1Pk.png',
      awardImgurl: 'https://i.loli.net/2020/09/26/HYwPZ7FN8IckjO4.png',
      behaviorImg: "",
      istoogle: -1,
      toogleStar: [],
      data: ['1', '2'],
      firstX: 0,
      firstY: 0,
      endX: 0,
      endY: 0,
      moveX: 0,
      moveY: 0,
      taskImageIndexArray: [],
      assignmentList: [],
      notificationData: [],
      searchImgDataList: [],
      starImgCheck: [],
      imgDataList: props.taskArray,//前40张
      hasMore: true, // 是否开启下拉加载
      scroller: false,

      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
    }
  }

  render() {
    // if (this.state.imgDataList == "") { return <p>s</p> }
    const { searchImgDataList, taskPopup, awardPopup, awardAllPopup, notificationPopup, userRewardPopup, taskImgurl } = this.state
    const { taskBar, awardList, starImgCheck, taskLabelData, newAwardList } = this.props;
    return (
      <div className={styles.game}>
        <div className={styles.game_back}>
          <div className={styles.game_status}>
            <div className={styles.main_top}>
              <p>今天状态如何？</p>
              <div onClick={() => this.setState({ userRewardPopup: true })} > <img src={require('assets/image/info.png')} /></div>
            </div>
            <div className={styles.game_content}>
              <ClassifyBar taskLabelData={taskLabelData} onClickClassifyBar={this.classifyBarClickedHandler} />
            </div>
          </div>
        </div>

        {/**内容展示区 */}
        <div
          className={styles.content}
          onTouchMove={this.navonTouchMoveHandler}
          onTouchStart={this.navonTouchStartHandler}
          onTouchEnd={this.navonTouchEndHandler}>
          <div className={styles.pullTodown}><img src={require('assets/image/frame_up.png')} /></div>
          {
            searchImgDataList == ""
              ? this.renderGameContent() : this.renderSearchContent()
          }
        </div>

        {/** 行动栏 */}
        <div className={styles.behavior_bar} ref={el => this.behaviorBar = el}>
          <BehaviorBar
            taskBar={taskBar}
            starImgCheck={starImgCheck}
          />
        </div>
        {/**底部搜索栏 */}
        {
          this.state.moveUp ?
            (
              <div className={styles.search} >
                <SearchBar onSearchChange={this.searchChangedHandler} onSearchSubmit={this.searchSubmitHandler} />
              </div>
            ) : null
        }

        <ModalPopup
          taskPopup={taskPopup}
          taskBar={taskBar}
          onClickTaskPopUp={this.taskPopUpClickedHandler}

          awardPopup={awardPopup}
          newAwardList={newAwardList}
          onClickAwardPopup={this.awardPopupClickedHandler}

          awardAllPopup={awardAllPopup}
          onClicktAwardAllPopup={this.awardAllPopupClickedHandler}

          notificationPopup={notificationPopup}
          onClickNotificationPopup={this.notificationPopupClickedHandler}

          userRewardPopup={userRewardPopup}
          awardList={awardList}
          onClickUserRewardPopup={this.userRewardPopupClickedHandler}

          taskImgurl={taskImgurl} />
      </div>
    )
  }
  /**
   * 发布任务
   */
  taskPopUpClickedHandler = () => {
    this.setState({ taskPopup: false, starImgCheck: [] });
    window.location.reload()
  }

  /**
    * 任务完成点击事件
    */
  awardPopupClickedHandler = () => {
    const { awardList, dispatch } = this.props;
    this.setState({ awardPopup: false, taskPopup: true })
    this._fetchTaskBar()//获取加载
    this._fetchTaskImg()
    if (awardList >= 6) {
      this.setState({ awardAllPopup: true })
    }
    dispatch({
      type: "player/starImgCheckUpdate",
      payload: { starImgCheck: [] }
    })
  }

  awardAllPopupClickedHandler = () => {
    this.setState({ awardAllPopup: false })
    let newdate = moment().format('YYYYMMDDHHmmss')
    let cxt = "完成当日所有任务"
    this._catchLogSave(newdate, cxt)
  }
  notificationPopupClickedHandler = () => { this.setState({ notificationPopup: false }) }
  userRewardPopupClickedHandler = () => { this.setState({ userRewardPopup: false }) }


  /**
   * 游戏内容展示
   */
  renderGameContent = () => {
    const { imgDataList, hasMore, scroller } = this.state
    // if (imgDataList == '') { return }
    return (
      <div className="pages_pinterest" className={styles.pages_pinterest} onTouchMove={this.pullToRefreshMoveHandler}>
        <div ref={el => { this.flyItem = el }} className={styles.fly_item}><img src={`http://babistep.com/media_static/${this.state.behaviorImg}`} /></div>

        {/* 下拉加载 */}
        <InfiniteScroll
          initialLoad={false} // 不让它进入直接加载
          pageStart={1} // 设置初始化请求的页数
          loadMore={this.loadMoreDataHandler}  // 监听的ajax请求
          loader={
            <div className={styles.loading_down} key={0}>
              {
                scroller ? (<p>加载完毕</p>) : (<img src={require('assets/image/frame_up.png')} />)
              }
            </div>
          }
          hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
          useWindow={true} // 不监听 window 滚动条
        >
          <div className={"pages_hoc"} style={{ margin: "auto" }}>
            {
              imgDataList.map((item, index) => {
                return (
                  <div key={index} className={'imgBox'} style={{ width: "50%" }}>
                    <div className={styles.task_list} onClick={() => this.taskImageClickedHandler(item, index)} ref={component => this.btnCart = component}>
                      <img src={`http://babistep.com/media_static/${item.url}`} style={{ width: "100%", height: "100%" }} ref={component => this.behaviorUrl = component} />
                      <p className={styles.task_title}>{item.desc}</p>
                      <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </InfiniteScroll>

      </div>
    )
  }

  // /**
  //  * 搜索内容展示
  //  */
  renderSearchContent = () => {
    const { searchImgDataList, hasMore } = this.state
    return (
      <div className="pages_pinterest" className={styles.pages_pinterest}>
        {/* 下拉加载 */}
        <InfiniteScroll
          initialLoad={false} // 不让它进入直接加载
          pageStart={1} // 设置初始化请求的页数
          loadMore={this.loadMoreDataHandler}  // 监听的ajax请求
          hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
          useWindow={false} // 不监听 window 滚动条
        >
          <div className={"pages_hoc"} style={{ margin: "auto" }}>
            {
              searchImgDataList.map((item, index) => {
                return (
                  <div key={index} className={'imgBox'} style={{ width: "50%" }}>
                    <div className={styles.task_list} onClick={() => this.taskImageClickedHandler(item, index)}>
                      <img src={`http://babistep.com/media_static/${item.url}`} style={{ width: "100%", height: "100%" }} />
                      <p className={styles.task_title}>{item.desc}</p>
                      <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </InfiniteScroll>
      </div>
    )
  }

  /**
   * 搜索框字段提交事件
   */
  searchSubmitHandler = (val) => {
    const { taskBar, starImgCheck, taskArrayAfter, taskArray } = this.props;
    if (val !== '') {
      let taskBarData = []
      taskBarData.push(taskBar)
      let searchImgDataList = [...starImgCheck, ...taskArrayAfter, ...taskArray]
      let valKey = taskBarData.find(item => item.name == val)

      let newSearchImgDataList = searchImgDataList.filter(item => item.key == valKey.key)

      const hash = {};
      const newArray = newSearchImgDataList.reduce((item, next) => {
        hash[next.pid] ? '' : hash[next.pid] = true && item.push(next);
        return item;
      }, [])
      this.setState({
        searchImgDataList: newArray,
      }, () => this.imagesOnload())
    }

    let newdate = moment().format('YYYYMMDDHHmmss')
    let cxt = "使用搜索栏"
    this._catchLogSave(newdate, cxt)
  }

  /**
   * 分类栏点击事件
   */
  classifyBarClickedHandler = (val) => {
    const { taskBar, starImgCheck, taskArrayAfter, taskArray } = this.props;
    if (val !== '') {
      let searchImgDataList = [...starImgCheck, ...taskArrayAfter, ...taskArray]
      let newSearchImgDataList = searchImgDataList.filter(item => item.label == val)
      this.setState({
        searchImgDataList: newSearchImgDataList,
      }, () => this.imagesOnload())
    }
    let newdate = moment().format('YYYYMMDDHHmmss')
    let cxt = `点击分类栏中${val}类框`
    this._catchLogSave(newdate, cxt)
  }
  /**
   * 下滑
   */
  pullToRefreshMoveHandler = (e) => {
    this.setState({
      endX: e.changedTouches[0].clientX,
      endY: e.changedTouches[0].clientY,
    });
    let moveX = this.state.endX - this.state.firstX;
    let moveY = this.state.endY - this.state.firstY;

    if (Math.abs(moveX) > 50 || Math.abs(moveY) > 50) {
      if (moveY > 0) {
        document.getElementsByClassName(styles.pullTodown)[0].style.display = ""
        document.getElementsByClassName(styles.pages_pinterest)[0].style.marginTop = "50%"
      } else {
        document.getElementsByClassName(styles.pullTodown)[0].style.display = "none"
        document.getElementsByClassName(styles.pages_pinterest)[0].style.marginTop = ""
      }
    }
  }

  /**
   * 瀑布流
   */
  advanceWidth = () => {
    let elem = document.querySelector('.pages_hoc');
    new Masonry(elem, {
      itemSelector: '.imgBox', //要布局的网格元素
      columnWidth: '.imgBox', //自适应
      fitWidth: true, // 设置网格容器宽度等于网格宽度
      gutter: 0,
      cols: 2
    });
  }

  /**
   * 下拉加载
   */
  loadMoreDataHandler = () => {
    const { imgDataList } = this.state
    const { taskArrayAfter, starImgCheck, taskArray } = this.props;
    const taskImgDataLength = taskArray.length + taskArrayAfter.length + 1
    // 超过80条数据 不继续监听下拉事件
    if (imgDataList.length >= taskImgDataLength) {
      this.setState({
        scroller: true
      })
      return
    }
    if (imgDataList.length < taskImgDataLength) {
      const newImgData = [...imgDataList, ...taskArrayAfter, ...starImgCheck]
      this.setState({
        imgDataList: newImgData
      }, () => {
        this.imagesOnload() // 每次获取完数据 触发
      })
    }
    let newdate = moment().format('YYYYMMDDHHmmss')
    let cxt = "下拉刷新页面"
    this._catchLogSave(newdate, cxt)

  }

  scrollBottomClickedHandler = () => {
    const { imgDataList } = this.state
    const { taskArrayAfter, starImgCheck, taskArray } = this.props;
    const taskImgDataLength = taskArray.length + taskArrayAfter.length + 1
    if (imgDataList.length < taskImgDataLength) {
      const newImgData = [...imgDataList, ...taskArrayAfter, ...starImgCheck]
      this.setState({
        scroller: false,
        imgDataList: newImgData //拼接每次加载的数据 arr是我自定义的数据
      }, () => {
        this.imagesOnload() // 每次获取完数据 触发
      })
    }
    let newdate = moment().format('YYYYMMDDHHmmss')
    let cxt = "下拉刷新页面"
    this._catchLogSave(newdate, cxt)
  }

  /**
   * 图片懒加载
   */
  imagesOnload = () => {
    const elLoad = imagesloaded('.pages_hoc')  //获取下拉加载里面的第一个盒子
    //always 图片已全部加载，或被确认加载失败
    elLoad.on('progress', () => {
      // 调用瀑布流
      this.advanceWidth()
    })
  }

  /** 
   * 任务图片点击事件 
   */
  taskImageClickedHandler = (item, index) => {
    // const { assignmentSuccsessIndex } = this.state;
    const { taskBar, taskImgData, dispatch, starImgCheck, awardList, newAwardList } = this.props;
    let assignmentArr = this.state.assignmentList;
    let taskImageIndexArray = this.state.taskImageIndexArray;
    let taskBarGobal = taskBar.gobal + 1
    if (taskImageIndexArray.length > taskBarGobal) { return }
    if (awardList == 6) {
      this.setState({ awardAllPopup: true })
      return
    }
    if (item.key == taskBar.key) {
      this.state.behaviorImg = item.url;
      // this.animatedClickedHandler()
      item.checked = true; //选中star
      assignmentArr.push(item.key);
      taskImageIndexArray.push(item.pid)
      taskImageIndexArray = [...new Set(taskImageIndexArray)]
      assignmentArr = [...assignmentArr];
      taskImageIndexArray = [...taskImageIndexArray]
      let toogleStar = this.state.toogleStar;
      toogleStar.push(item.pid)
      toogleStar = [...toogleStar]


      const id2 = Number(item.pid)
      const ToDoList = JSON.parse(JSON.stringify([...this.state.imgDataList]))
      // filter方法筛选数组，这里的意思是id与传过来的id2不一样的就留下，一样的就删除。
      let newTaskData = ToDoList.filter(item => item.pid !== id2);

      if (starImgCheck.length <= taskBar.goal) {
        starImgCheck.push(item)
        const hash = {};
        const newstarImgCheck = starImgCheck.reduce((item, next) => {
          hash[next.pid] ? '' : hash[next.pid] = true && item.push(next);
          return item;
        }, [])
        dispatch({
          type: "player/starImgCheckUpdate",
          payload: { starImgCheck: newstarImgCheck }
        })
      }
      //日志
      if (starImgCheck.length < taskBar.goal) {
        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = `点击第${starImgCheck.length}张（任务正确）图片`
        this._catchLogSave(newdate, cxt)
      }
      // 当前任务完成
      if ((starImgCheck.length) == taskBar.goal) {

        const date = moment().format('YYYY.MM.DD HH:mm') //当前时间
        const number = this.props.location.query.uid //酒店房间号 
        const title = "奖励名称X" //酒店

        const newAwardDateList = { date, number, title, get: 1 }

        awardList.push(newAwardDateList)
        dispatch({
          type: "player/awardListUpdate",
          payload: { awardList: awardList }
        })

        dispatch({
          type: "player/newAwardListUpdate",
          payload: { ...newAwardList, ...newAwardDateList }
        })
        this.setState({ awardPopup: true });

        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = `点击最后一张（任务正确）图片`
        this._catchLogSave(newdate, cxt)
        return
      }
      this.setState({
        imgDataList: newTaskData,
      }, () => { this.imagesOnload() })
    }

    if (item.key !== taskBar.key) {

      this.state.notificationData.push(item)
      if (this.state.notificationData.length < 3) {
        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = `点击第${this.state.notificationData.length}张（任务不正确）图片`
        this._catchLogSave(newdate, cxt)
      }
      if (this.state.notificationData.length >= 3) {
        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = `点击最后一张（任务不正确）图片`
        this._catchLogSave(newdate, cxt)
        this.setState({ notificationPopup: true })
        return
      }
    }
  }

  animatedClickedHandler = () => {
    let eleBtn = this.btnCart;
    let eleFlyItem = this.flyItem;
    let eleFlyImg = this.behaviorUrl;
    let eleCart = this.behaviorBar;

    let isRunning = false;
    // eleBtn.addEventListener('click', function () {
    // 现在按钮距离购物车的距离
    let boundBtn = eleBtn.getBoundingClientRect();
    let boundCart = eleCart.getBoundingClientRect();

    // 中心点的水平垂直距离
    let offsetX = boundCart.left / 8;
    let offsetY = boundCart.top / 2.3;
    // 页面滚动尺寸
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
    let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    if (isRunning == false) {
      // 购物车图形出现与初始定位
      eleFlyItem.style.display = 'block';
      // eleFlyItem.style.left = ((boundBtn.left + scrollLeft + document.body.clientWidth / 2) / 100) + 'px';
      // eleFlyItem.style.top = ((boundBtn.top + scrollTop + document.body.clientHeight / 2) / 100) + 'px';
      eleFlyItem.style.left = "50%";
      eleFlyItem.style.top = "50%";

      // 开始动画
      eleFlyItem.style.transform = `translate(${offsetX}px,${offsetY}px)`;

      // 动画标志量
      isRunning = true;
      setTimeout(function () {
        eleFlyItem.style.display = '';
        eleFlyItem.style.transform = 'translateX(0)';
        eleFlyImg.style.transform = 'translateY(0)';
        isRunning = false;
      }, 1000);
    }
    // });
  }

  /** 滑动开始事件 */
  navonTouchStartHandler = (e) => {
    this.setState({
      firstX: e.targetTouches[0].clientX,
      firstY: e.targetTouches[0].clientY,
    })
  }

  /** 滑动移动事件 */
  navonTouchMoveHandler = (e) => {
    this.setState({
      endX: e.changedTouches[0].clientX,
      endY: e.changedTouches[0].clientY,
    });
    let moveX = this.state.endX - this.state.firstX;
    let moveY = this.state.endY - this.state.firstY;

    if (Math.abs(moveX) > 10 || Math.abs(moveY) > 10) {
      if (moveY > 0) {
        this.setState({ moveUp: true })
        document.getElementsByClassName(styles.behavior_bar)[0].style.right = "0"
      } else {
        this.setState({ moveUp: false })
        document.getElementsByClassName(styles.behavior_bar)[0].style.right = "-40%"
      }
    }
  }
  /** 滑动结束事件 */
  navonTouchEndHandler = (e) => {
    // this.setState({ moveUp: true })
    // document.getElementsByClassName(styles.behavior_bar)[0].style.right = "0"
  }

  /**
   * 获取任务目标
   */
  _fetchTaskBar = () => {
    const { dispatch, taskBar } = this.props;
    // 任务栏
    dispatch({
      type: "player/fetchTaskList",
      payload: {
        uid: this.props.location.query.uid,
        tid: taskBar.tid
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

  //日志
  _catchLogSave = (time, cxt) => {
    const { dispatch, taskBar } = this.props;
    dispatch({
      type: "player/fetchLogSave",
      payload: {
        uid: this.props.location.query.uid,
        tid: taskBar.tid,
        time: time,
        log: cxt
      }
    })
  }

  async componentDidMount() {
    // await this._fetchTaskBar()//获取加载
    // this._fetchTaskImg()

    this.imagesOnload()//图片加载
    window.addEventListener("resize", function () {
      // 解决键盘弹起后遮挡输入框的问题
      if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    })
  }
}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  const { taskBar, taskImgData, taskArray, taskArrayAfter, starImgCheck, awardList, taskLabelData, newAwardList } = state.player;
  return {
    taskBar: taskBar,
    taskImgData: taskImgData,
    taskLabelData: taskLabelData,
    taskArray: taskArray,
    taskArrayAfter: taskArrayAfter,
    starImgCheck: starImgCheck,
    awardList: awardList,
    newAwardList: newAwardList
  };
}

export default connect(mapStateToProps)(Index)