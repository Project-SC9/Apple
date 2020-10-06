import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux'
import ClassifyBar from '../compontents/classify-bar';
import SearchBar from '../compontents/search';
import BehaviorBar from '../compontents/behavior-bar';
import ModalPopup from '../compontents/modal-popup';
import ReactSwipes from 'react-swipes'

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Button, Modal, Carousel } from 'antd-mobile';
import {
  StarFilled
} from '@ant-design/icons';

import Masonry from 'masonry-layout'  //实现瀑布流
import imagesloaded from 'imagesloaded' //监听图片加载
import InfiniteScroll from 'react-infinite-scroller' //下拉加载

const TASK_TOTAL = 80
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

      assignmentSuccsess: ["面包炒蛋", "面包炒蛋", "面包炒蛋"],
      assignmentSuccsessIndex: 3,
      assignmentSuccsessValue: 0,
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
    }
  }

  render() {
    // if (this.state.imgDataList == "") { return <p>s</p> }
    const { taskPopup, awardPopup, awardAllPopup, notificationPopup, userRewardPopup, taskImgurl } = this.state
    const { taskBar, taskImgData, starImgCheck } = this.props;
    return (
      <div className={styles.game}>
        <div className={styles.game_back}>
          <div className={styles.game_status}>
            <div className={styles.main_top}>
              <p>今天状态如何？</p>
              <div onClick={() => this.setState({ userRewardPopup: true })} > <img src={require('assets/image/info.png')} /></div>
            </div>
            <div className={styles.game_content}>
              <ClassifyBar taskImgData={taskImgData} />
            </div>
          </div>
        </div>

        {/**内容展示区 */}
        <div
          className={styles.content}
          onTouchMove={this.navonTouchMoveHandler}
          onTouchStart={this.navonTouchStartHandler}
          onTouchEnd={this.navonTouchEndHandler}>
          {
            this.state.searchImgDataList == '' ?
              this.renderGameContent() : this.renderSearchContent()
          }
        </div>
        { /**<div className={styles.loading_down}><img src={require('assets/image/frame_up.png')} /></div>*/}
        {/** 行动栏 */}
        <div className={styles.behavior_bar}>
          <BehaviorBar
            taskBar={taskBar}
            starImgCheck={this.state.starImgCheck}
            assignmentSuccsessIndex={this.state.assignmentSuccsessIndex}
            assignmentSuccsessValue={this.state.assignmentSuccsessValue}
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
          onClickAwardPopup={this.awardPopupClickedHandler}

          awardAllPopup={awardAllPopup}
          onClicktAwardAllPopup={this.awardAllPopupClickedHandler}

          notificationPopup={notificationPopup}
          onClickNotificationPopup={this.notificationPopupClickedHandler}

          userRewardPopup={userRewardPopup}
          onClickUserRewardPopup={this.userRewardPopupClickedHandler}

          taskImgurl={taskImgurl} />
      </div>
    )
  }

  taskPopUpClickedHandler = () => { this.setState({ taskPopup: false }) }
  awardPopupClickedHandler = () => { this.setState({ awardPopup: false, awardAllPopup: true }) }
  awardAllPopupClickedHandler = () => { this.setState({ awardAllPopup: false }) }
  notificationPopupClickedHandler = () => { this.setState({ notificationPopup: false }) }
  userRewardPopupClickedHandler = () => { this.setState({ userRewardPopup: false }) }


  /**
   * 游戏内容展示
   */
  renderGameContent = () => {
    const { imgDataList, hasMore } = this.state
    // if (imgDataList == '') { return }
    return (
      <div className="pages_pinterest" className={styles.pages_pinterest}>
        {/* 下拉加载 */}
        <InfiniteScroll
          initialLoad={false} // 不让它进入直接加载
          pageStart={1} // 设置初始化请求的页数
          loadMore={this.loadMoreDataHandler}  // 监听的ajax请求
          hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
          useWindow={true} // 不监听 window 滚动条
        >
          <div className={"pages_hoc"} style={{ margin: "auto" }}>
            {
              imgDataList.map((item, index) => {
                return (
                  <div key={index} className={'imgBox'} style={{ width: "50%" }}>
                    <div className={styles.task_list} onClick={() => this.taskImageClickedHandler(item, index)}>
                      <img src={`http://babistep.com/media_static/${item.url}`} style={{ width: "98%", height: "98%" }} />
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
   * 搜索内容展示
   */
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
          useWindow={true} // 不监听 window 滚动条
        >
          <div className={"pages_hoc"} style={{ margin: "auto" }}>
            {
              searchImgDataList.map((item, index) => {
                return (
                  <div key={index} className={'imgBox'} style={{ width: "50%" }}>
                    <div className={styles.task_list} onClick={() => this.taskImageClickedHandler(item, index)}>
                      <img src={`http://babistep.com/media_static/${item.url}`} style={{ width: "100%", height: "100%" }} />
                      <p className={styles.task_title}>{item.title}</p>
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
    if (val !== '') {
      let newSearchImgDataList = this.state.imgDataList.filter(item => item.title == val)
      this.setState({
        searchImgDataList: newSearchImgDataList,
      })
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
    const { taskArrayAfter, starImgCheck } = this.props;
    const taskImgDataLength = TASK_TOTAL + 1
    if (imgDataList.length < taskImgDataLength) {
      const newImgData = [...imgDataList, ...taskArrayAfter, ...this.state.starImgCheck]
      this.setState({
        imgDataList: newImgData //拼接每次加载的数据 arr是我自定义的数据
      }, () => {
        this.imagesOnload() // 每次获取完数据 触发
      })
    }
  }

  /**
   * 图片懒加载
   */
  imagesOnload = () => {
    const elLoad = imagesloaded('.pages_hoc')  //获取下拉加载里面的第一个盒子
    //always 图片已全部加载，或被确认加载失败
    elLoad.on('always', () => {
      // 调用瀑布流
      this.advanceWidth()
    })
  }

  /** 
   * 任务图片点击事件 
   */
  taskImageClickedHandler = (item, index) => {
    const { assignmentSuccsessIndex } = this.state;
    const { taskBar, taskImgData, dispatch } = this.props;
    let assignmentArr = this.state.assignmentList;
    let taskImageIndexArray = this.state.taskImageIndexArray;
    let taskBarGobal = taskBar.gobal + 1
    if (taskImageIndexArray.length > taskBarGobal) { return }
    if (item.key == taskBar.key) {
      item.checked = true;
      assignmentArr.push(item.key);
      taskImageIndexArray.push(item.pid)
      taskImageIndexArray = [...new Set(taskImageIndexArray)]
      assignmentArr = [...assignmentArr];
      taskImageIndexArray = [...taskImageIndexArray]
      let toogleStar = this.state.toogleStar;
      // this.state.behaviorImg = item.imgurl
      toogleStar.push(item.pid)
      toogleStar = [...toogleStar]
      this.setState({
        assignmentSuccsessValue: taskImageIndexArray.length
      })
      this.state.starImgCheck.push(item);

      if (taskImageIndexArray.length == taskBar.goal) {
        this.setState({ awardPopup: true });
        return
      }
      // console.log("taskImageIndexArray", taskImageIndexArray)
      // console.log("assignmentSuccsessValue", this.state.assignmentSuccsessValue)
      // console.log("assignmentArr", assignmentArr)
      // console.log("toogleStar", toogleStar)

      // let starImgCheckList = []
      // starImgCheckList.push(item)

      // const { dispatch, starImgCheck } = this.props;

      // dispatch({ type: 'player/starImgCheckUpdate', payload: { ...starImgCheck, ...starImgCheckList } })

      const id2 = Number(item.pid)
      const ToDoList = JSON.parse(JSON.stringify([...this.state.imgDataList]))
      let newTaskData = ToDoList.filter(item => item.pid !== id2);

      this.setState({
        //filter方法筛选数组，这里的意思是id与传过来的id2不一样的就留下，一样的就删除。
        imgDataList: newTaskData,
      }, () => { this.imagesOnload() })
    }
    if (item.key !== taskBar.key) {
      this.state.notificationData.push(item)
      if (this.state.notificationData.length > 3) {
        this.setState({ notificationPopup: true })
      }
    }

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
    // await this._fetchTaskBar()//获取加载
    // this._fetchTaskImg()
    // console.log(this.props)
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
  const { taskBar, taskImgData, taskArray, taskArrayAfter, starImgCheck } = state.player;

  return {
    taskBar: taskBar,
    taskImgData: taskImgData,
    taskArray: taskArray,
    taskArrayAfter: taskArrayAfter,
    starImgCheck: starImgCheck
  };
}

export default connect(mapStateToProps)(Index)