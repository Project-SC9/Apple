import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux'
import ClassifyBar from '../compontents/classify-bar';
import SearchBar from '../compontents/search';
import BehaviorBar from '../compontents/behavior-bar';
import ModalPopup from '../compontents/modal-popup';
import { PullToRefresh } from 'antd-mobile';
import { Spin } from 'antd';
import ReactDOM from 'react-dom';
import moment from 'moment'
import {
  StarFilled
} from '@ant-design/icons';

import Masonry from 'masonry-layout'  //实现瀑布流
import imagesloaded from 'imagesloaded' //监听图片加载
import InfiniteScroll from 'react-infinite-scroller' //下拉加载

const TASK_TOTAL = 180
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
      showScroll: false,

      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,

      taskNumber: 6
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
        <div className={styles.content}>


          {/**内容展示区 */}
          <div
            onTouchMove={this.navonTouchMoveHandler}
            onTouchStart={this.navonTouchStartHandler}
            onTouchEnd={this.navonTouchEndHandler}>
            <div className={styles.pullTodown}><img src={require('assets/image/frame_up.png')} /></div>

            {
              searchImgDataList == ""
                ? this.renderGameContent() : this.renderSearchContent()
            }
          </div>

        </div>
        {/** 行动栏 */}
        <div className={styles.behavior_bar} ref={el => this.behaviorBar = el}>
          <BehaviorBar
            taskBar={taskBar[taskBar.length - 1]}
            starImgCheck={starImgCheck}
          />
        </div>

        {this.state.showScroll ? (
          <div className={styles.backtop} onClick={this.handleScrollTop}>
            <img src={require('assets/image/top.svg')} />
          </div>
        ) : null}

        {/**底部搜索栏 */}
        {
          this.state.moveUp ?
            (
              <div className={styles.search} >
                <SearchBar onSearchChange={this.searchChangedHandler} onSearchSubmit={this.searchSubmitHandler} onClickSubmit={this.searchClickedHandler} />
              </div>
            ) : null
        }


        <ModalPopup
          taskPopup={taskPopup}
          taskBar={taskBar[taskBar.length - 1]}
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
    window.location.href = window.location.href + 10000 * Math.random();
  }

  /**
    * 任务完成点击事件
    */
  awardPopupClickedHandler = () => {
    const { awardList, dispatch, taskNumber } = this.props;
    if (awardList.length >= taskNumber) {
      this.setState({ awardAllPopup: true, taskPopup: false })
      return
    }
    if (awardList.length < taskNumber) {
      this.setState({ awardPopup: false, taskPopup: true })
      return
    }

    this._fetchTaskBar()//获取加载
    this._fetchTaskImg()

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
      <div className="pages_pinterest" className={styles.pages_pinterest}>
        <div ref={el => { this.flyItem = el }} className={styles.fly_item}><img src={`http://juuuce.com/media_static/${this.state.behaviorImg}`} /></div>

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
        > <PullToRefresh
          damping={window.devicePixelRatio * 25}
          ref={el => this.ptr = el}
          style={{ height: this.state.height }}
          indicator={this.state.down ? {} : { deactivate: '' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.refreshing}
          onRefresh={this.refreshHandler}
        >

            <div className={"pages_hoc"} style={{ margin: "auto" }}>
              {
                imgDataList.map((item, index) => {
                  return (
                    <div key={index} className={'imgBox'} style={{ width: "50%" }}>
                      <div className={styles.task_list} onClick={() => this.taskImageClickedHandler(item, index)} ref={component => this.btnCart = component}>
                        <img src={`http://juuuce.com/media_static/${item.url}`} style={{ width: "100%", height: "100%" }} ref={component => this.behaviorUrl = component} />
                        <p className={styles.task_title}>{item.desc}</p>
                        <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
                      </div>
                    </div>
                  )
                })
              }

            </div>

          </PullToRefresh>

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

        <PullToRefresh
          damping={window.devicePixelRatio * 25}
          ref={el => this.ptr = el}
          style={{
            height: "21rem",
            overflow: 'auto',
          }}
          indicator={this.state.down ? {} : { deactivate: '' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.refreshing}
          onRefresh={() => {

            let i = searchImgDataList.length;
            while (i) {
              let j = Math.floor(Math.random() * i--);
              [searchImgDataList[j], searchImgDataList[i]] = [searchImgDataList[i], searchImgDataList[j]];
            }

            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false, searchImgDataList: searchImgDataList }, () => this.imagesOnload());
            }, 3000)


          }}
        >   {/* 下拉加载 */}
          <InfiniteScroll
            initialLoad={false} // 不让它进入直接加载
            pageStart={1} // 设置初始化请求的页数
            loadMore={this.loadMoreDataHandler}  // 监听的ajax请求
            hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
            useWindow={false} // 不监听 window 滚动条
          >
            <div className={"pages_hoc"} style={{ margin: "auto", position: "absolute !important" }}>
              {
                searchImgDataList.map((item, index) => {
                  return (
                    <div key={index} className={'imgBox'} style={{ width: "50%" }}>
                      <div className={styles.task_list} onClick={() => this.taskImageClickedHandler(item, index)}>
                        <img src={`http://juuuce.com/media_static/${item.url}`} style={{ width: "100%", height: "100%" }} />
                        <p className={styles.task_title}>{item.desc}</p>
                        <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
                      </div>
                    </div>
                  )
                })
              }
              <div className={styles.loading_down} style={{ marginBottom: "-10%", position: "absolute", bottom: 0 }}>
                <p>加载完毕</p>
              </div>
            </div>

          </InfiniteScroll>
        </PullToRefresh>
      </div >
    )
  }

  /**
   * 搜索框字段提交事件
   */
  searchSubmitHandler = (val) => {
    const { taskBar, starImgCheck, taskArrayAfter, taskArray } = this.props;
    if (val !== '') {

      let taskBarData = []
      let searchImgDataList = [...starImgCheck, ...taskArrayAfter, ...taskArray]

      taskBarData.push(taskBar[taskBar.length - 1])
      let valKey = taskBarData.find(item => item.name == val)
      let valKeyDesc = searchImgDataList.find(item => item.desc == val)

      let result = taskBarData.some(item => {
        if (item.name == val) {
          return true
        }
      })
      if (result) {
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

      let resultDesc = searchImgDataList.some(item => {
        if (item.desc == val) {
          return true
        }
      })

      if (resultDesc) {
        let newSearchImgDataList = searchImgDataList.filter(item => item.key == valKeyDesc.key)
        const hash = {};
        const newArray = newSearchImgDataList.reduce((item, next) => {
          hash[next.pid] ? '' : hash[next.pid] = true && item.push(next);
          return item;
        }, [])
        this.setState({
          searchImgDataList: newArray,
        }, () => this.imagesOnload())
      }
    }

    let newdate = moment().format('YYYYMMDDHHmmss')
    let cxt = `搜索${val}`
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
   * 下拉刷新
   */
  refreshHandler = () => {
    const { taskArray } = this.props;
    const newTaskArray = taskArray
    let i = newTaskArray.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [newTaskArray[j], newTaskArray[i]] = [newTaskArray[i], newTaskArray[j]];
    }

    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false, imgDataList: newTaskArray }, () => this.imagesOnload());
    }, 3000);
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
    // console.log(document.body.clientHeight)
    // console.log(document.body.scrollWidth)
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
    const { taskBar, taskImgData, dispatch, starImgCheck, awardList, newAwardList, taskNumber } = this.props;
    let assignmentArr = this.state.assignmentList;
    let taskImageIndexArray = this.state.taskImageIndexArray;
    let taskBarGobal = taskBar[taskBar.length - 1].gobal + 1
    if (taskImageIndexArray.length > taskBarGobal) { return false }

    if (awardList.length >= taskNumber) {
      this.setState({ awardAllPopup: true, taskPopup: false, })
      return false
    }
    if (awardList.length < taskNumber) {
      if (item.key == taskBar[taskBar.length - 1].key) {
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
        if (starImgCheck.length <= taskBar[taskBar.length - 1].goal) {
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
          // 当前任务完成
          if (newstarImgCheck.length === taskBar[taskBar.length - 1].goal) {

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
            dispatch({
              type: "player/taskListUpdate",
              payload: { tastList: taskBar }
            })

            let newdate = moment().format('YYYYMMDDHHmmss')
            let cxt = `点击最后一张（任务正确）图片`
            this._catchLogSave(newdate, cxt)

            this.setState({ awardPopup: true });
            return false
          }
        }

        //日志
        if (starImgCheck.length < taskBar[taskBar.length - 1].goal) {
          let newdate = moment().format('YYYYMMDDHHmmss')
          let cxt = `点击第${starImgCheck.length}张（任务正确）图片`
          this._catchLogSave(newdate, cxt)
        }

        this.setState({
          imgDataList: newTaskData,
        }, () => { this.imagesOnload() })
      }

    }

    if (item.key !== taskBar[taskBar.length - 1].key) {

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
        this.setState({ moveUp: true, })
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
        tid: taskBar[taskBar.length - 1].tid,
        type: 0,
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
        tid: taskBar[taskBar.length - 1].tid,
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
        tid: taskBar[taskBar.length - 1].tid,
        time: time,
        log: cxt
      }
    })
  }
  /** TOP */
  toggleTopShow = () => {
    let showScroll = '';
    if (document.documentElement.scrollTop > 100) {
      showScroll = true;
    } else {
      showScroll = false;
    }

    this.setState({
      showScroll
    });
  }

  handleScrollTop = () => {
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    // await this._fetchTaskBar()//获取加载
    // this._fetchTaskImg()

    this.imagesOnload()//图片加载


    let elem = document.querySelector('.pages_hoc');
    let em = document.documentElement.getElementsByClassName('.pages_hoc');
    elem.style.position = "absolute !important";
    elem.style.position = "";

    // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    const hei = document.body.scrollHeight / 1.9;
    // console.log()

    setTimeout(() => this.setState({
      height: hei,
    }), 0);

    window.addEventListener('scroll', () => {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      if (top > 100) {
        this.setState({
          showScroll: true
        })
      } else {
        this.setState({
          showScroll: false
        })
      }
    })

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
  const { taskBar, taskImgData, taskArray, taskArrayAfter, starImgCheck, awardList, taskLabelData, newAwardList, taskNumber } = state.player;
  return {
    taskBar: taskBar,
    taskImgData: taskImgData,
    taskLabelData: taskLabelData,
    taskArray: taskArray,
    taskArrayAfter: taskArrayAfter,
    starImgCheck: starImgCheck,
    awardList: awardList,
    newAwardList: newAwardList,
    taskNumber: taskNumber
  };
}

export default connect(mapStateToProps)(Index)