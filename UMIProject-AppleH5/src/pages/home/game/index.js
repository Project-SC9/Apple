import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux'
import ClassifyBar from '../compontents/classify-bar';
import SearchBar from '../compontents/search';
import BehaviorBar from '../compontents/behavior-bar';
import ReactSwipes from 'react-swipes'

import { Button, Modal, Carousel } from 'antd-mobile';
import {
  ExclamationCircleFilled,
  StarFilled
} from '@ant-design/icons';


/**
 * 游戏内容页
 */
export class Index extends Component {
  state = {
    moveUp: true,
    success: true,
    taskPopup: true,
    awardPopup: false,
    awardAllPopup: false,
    userRewardPopup: false,
    notificationPopup: false,
    taskImgurl: 'https://i.loli.net/2020/10/01/x4c3eSwDNRiK1Pk.png',
    awardImgurl: 'https://i.loli.net/2020/09/26/HYwPZ7FN8IckjO4.png',
    imageLeft: [],
    imageRight: [],
    assignmentList: [],
    notificationData: [],
    searchData: [],
    assignmentSuccsess: ["面包炒蛋", "面包炒蛋", "面包炒蛋"],
    assignmentSuccsessIndex: 3,
    assignmentSuccsessValue: 0,
    taskImageIndexArray: [],
    behaviorImg: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png",
    istoogle: -1,
    toogleStar: [],
    data: ['1', '2'],
    incentive: [
      {
        title: "奖励名称01",
        name: "酒店名称",
        number: "001",
        get: 1,
        date: '2020.09.07',
        time: '19.34',
      },
      {
        title: "奖励名称02",
        name: "还未获得",
        get: 0,
      },
    ],
    firstX: 0,
    firstY: 0,
    endX: 0,
    endY: 0,
    moveX: 0,
    moveY: 0,
    searchImageLeft: [],
    searchImageRight: []
  }

  render() {
    // if (this.state.imageLeft == "" && this.state.imageRight == "") { return }

    return (
      <div className={styles.game}>
        <div className={styles.game_back}>
          <div className={styles.game_status}>
            <div className={styles.main_top}>
              <p>今天状态如何？</p>
              <div onClick={() => this.setState({ userRewardPopup: true })} > <img src={require('assets/image/info.png')} /></div>
            </div>
            <div className={styles.game_content}>
              <ClassifyBar />
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
            this.state.searchData == '' ?
              this.renderGameContent() : this.renderSearchContent()
          }
          {}
        </div>
        {/** 行动栏 */}
        <div className={styles.behavior_bar}>
          <BehaviorBar
            assignmentSuccsessIndex={this.state.assignmentSuccsessIndex}
            assignmentSuccsessValue={this.state.assignmentSuccsessValue}
            behaviorImg={this.state.behaviorImg} />
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
        {/** 任务发布 */}
        {
          !this.state.taskPopup ? this.renderTaskPopUp() : null
        }
        {/** 任务完成 */}
        {
          this.state.awardPopup ? this.renderAwardPopup() : null
        }
        {/** 任务奖励 */}
        {
          this.state.awardAllPopup ? this.renderAwardAllPopup() : null
        }
        {/** 我的奖励 */}
        {
          this.state.userRewardPopup ? this.renderUserReward() : null
        }
        {/** 任务错误提示 */}
        {
          this.state.notificationPopup ? this.renderNotificationPopup() : null
        }
      </div>
    )
  }

  /**
  * 搜索框字段改变事件
  */
  searchChangedHandler = (val) => {
    // let searchList = this.state.imageRight.filter(item => item.title == val)
    // this.state.searchData.push(searchList)
    // this.setState({
    //   searchData: this.state.searchData
    // })
  }

  /**
   * 搜索框字段提交事件
   */
  searchSubmitHandler = (val) => {
    if (val !== '') {
      let searchList = this.state.imageRight.filter(item => item.title == val)
      const searchArray = [];
      const searchDataLength = Math.round((searchList.length) / 2);
      for (let i = 0; i < searchDataLength; i++) {
        searchArray[i] = searchList.splice(0, searchDataLength);
      }
      this.setState({
        searchData: searchArray,
        searchImageLeft: searchArray[0],
        searchImageRight: searchArray[1],
      })
    }

  }

  /**
   * 游戏内容展示
   */
  renderGameContent = () => {
    return (
      <div className={styles.content_task}>
        <div className={styles.content_task_left}>
          {
            this.state.imageLeft.map((item, index) => {
              return (
                <div className={styles.task_list} key={index} onClick={() => this.taskImageClickedHandler(item, index)}>
                  <img src={item.imgurl} />
                  <p className={styles.task_title}>{item.title}</p>
                  <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
                </div>
              )
            })
          }
        </div>
        <div className={styles.content_task_right}>
          {
            this.state.imageRight.map((item, index) => {
              return (<div className={styles.task_list} key={index} onClick={() => this.taskImageClickedHandler(item, index)}>
                <img src={item.imgurl} />
                <p className={styles.task_title}>{item.title}</p>
                <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
              </div>)
            })
          }
        </div>
      </div>
    )
  }
  /**
   * 搜索内容展示
   */
  renderSearchContent = () => {
    return (
      <div className={styles.content_task}>
        <div className={styles.content_task_left}>
          {
            this.state.searchImageLeft.map((item, index) => {
              return (
                <div className={styles.task_list} key={index} onClick={() => this.taskImageClickedHandler(item, index)}>
                  <img src={item.imgurl} />
                  <p className={styles.task_title}>{item.title}</p>
                  <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
                </div>
              )
            })
          }
        </div>
        <div className={styles.content_task_right}>
          {
            this.state.searchImageRight.map((item, index) => {
              return (<div className={styles.task_list} key={index} onClick={() => this.taskImageClickedHandler(item, index)}>
                <img src={item.imgurl} />
                <p className={styles.task_title}>{item.title}</p>
                <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
              </div>)
            })
          }
        </div>
      </div>
    )
  }
  /**
   * 任务弹出框 
   */
  renderTaskPopUp = () => {

    return (
      <div className={styles.popup}>
        <Modal
          visible={this.state.taskPopup}
          transparent
          maskClosable={false}
          onClose={() => this.setState({ taskPopup: false })}
          wrapClassName={styles.popup_modal}>
          <div className={styles.modal_header}>
            <div className={styles.modal_header_img}>
              <img src={this.state.taskImgurl} />
            </div>
          </div>
          <div className={styles.modal_content}>
            <h2>面包炒蛋</h2>
            <p>找到并点击3张对应的图片</p>
            <Button onClick={() => this.setState({ taskPopup: false })}>OK</Button>
          </div>
        </Modal>
      </div>
    )
  }

  /**
   * 任务奖励弹出框
   */
  renderAwardPopup = () => {
    return (
      <div className={styles.popup}>
        <Modal
          visible={this.state.awardPopup}
          transparent
          // maskClosable={false}
          // closable={true}
          onClose={() => this.setState({ awardPopup: false })}
          wrapClassName={styles.popup_modal}>
          <div className={styles.modal_header}>
            <img src={require('assets/image/logo.png')} className={styles.modal_logo} />
            {/**<p onClick={() => this.setState({ awardPopup: false })}>x</p>*/}
          </div>
          <div className={styles.modal_content_award}>
            <img src={require('assets/image/trophy.png')} className={styles.award_logo} />
            <h2 className={styles.award_title}>奖励名称</h2>
            <ul>
              <li> <p>酒店名称</p><p>001房</p> </li>
              <li> <p>2020.9.07</p><p>19：34</p> </li>
            </ul>
            <Button onClick={() => this.setState({ awardPopup: false, awardAllPopup: true })}>我知道了</Button>
            <p className={styles.mark_hint}><ExclamationCircleFilled />请截图，并到酒店前台领取奖励</p>
          </div>
        </Modal>
      </div>
    )
  }

  /**
   * 任务不对提示框
   */
  renderNotificationPopup = () => {
    return (
      <div className={styles.popup} >
        <Modal
          visible={this.state.notificationPopup}
          transparent
          // maskClosable={false}
          onClose={() => this.setState({ notificationPopup: false })}
          wrapClassName={styles.popup_modal}>
          <div className={styles.modal_header}>
            <img src={require('assets/image/logo.png')} className={styles.modal_logo} />
          </div>
          <div className={styles.modal_content_award}>
            <img src={require("assets/image/notification.png")} className={styles.award_logo} style={{ marginTop: "4%" }} />
            <h2 className={styles.awardall_title}>挑战提示</h2>
            <p className={styles.modal_content_text}>点击与挑战相关食品，才能完成挑战！</p>
            <Button onClick={() => this.setState({ notificationPopup: false })} style={{ fontSize: "0.4rem" }}>我知道了</Button>
          </div>
        </Modal>
      </div>
    )
  }

  /**
   * 全部奖励弹出框
   */
  renderAwardAllPopup = () => {
    return (
      <div className={styles.popup} >
        <Modal
          visible={this.state.awardAllPopup}
          transparent
          // maskClosable={false}
          onClose={() => this.setState({ awardAllPopup: false })}
          wrapClassName={styles.popup_modal}>
          <div className={styles.modal_header}>
            <img src={require('assets/image/logo.png')} className={styles.modal_logo} />
            {/**<p onClick={() => this.setState({ awardAllPopup: false })}>x</p>*/}
          </div>
          <div className={styles.modal_content_award}>
            <img src={require("assets/image/feedback.png")} className={styles.award_logo} style={{ marginTop: "4%" }} />
            <h2 className={styles.awardall_title}>今日奖励已全部取得</h2>
            <p className={styles.modal_content_text}>明日再战吧！</p>
            <Button onClick={() => this.setState({ awardAllPopup: false })} style={{ fontSize: "0.4rem" }}>我知道了</Button>
          </div>
        </Modal>
      </div>
    )
  }
  /** 
   * 任务图片点击事件 
   */
  taskImageClickedHandler = (item, index) => {
    const { assignmentSuccsessIndex } = this.state;
    let assignmentArr = this.state.assignmentList;
    let taskImageIndexArray = this.state.taskImageIndexArray;
    if (taskImageIndexArray.length > 4) { return }
    if (item.title == "面包炒蛋") {
      assignmentArr.push(item.title);
      taskImageIndexArray.push(item.id)
      taskImageIndexArray = [...new Set(taskImageIndexArray)]
      assignmentArr = [...assignmentArr];
      taskImageIndexArray = [...taskImageIndexArray]
      let toogleStar = this.state.toogleStar;
      this.state.behaviorImg = item.imgurl
      toogleStar.push(item.id)
      toogleStar = [...toogleStar]
      this.setState({
        assignmentSuccsessValue: taskImageIndexArray.length
      })
      if (taskImageIndexArray.length == assignmentSuccsessIndex) {
        this.setState({ awardPopup: true });
      }
      item.checked = true;

      const id2 = Number(item.id)
      const ToDoList1 = JSON.parse(JSON.stringify([...this.state.imageLeft]))
      const ToDoList2 = JSON.parse(JSON.stringify([...this.state.imageRight]))
      let newTaskDataLeft = ToDoList1.filter(item => item.id !== id2);
      let newTaskDataRight = ToDoList2.filter(item => item.id !== id2);

      let a = ToDoList1.indexOf(item.id)
      let b = ToDoList2.indexOf(item.id)

      if (b == -1) { newTaskDataRight.push(item); }

      this.setState({
        //filter方法筛选数组，这里的意思是id与传过来的id2不一样的就留下，一样的就删除。
        imageLeft: newTaskDataLeft,
        imageRight: newTaskDataRight
      })
    }

    this.state.notificationData.push(item)
    if (this.state.notificationData.length >= 3) {
      this.setState({ notificationPopup: true })
    }
  }

  /**
   * 我的奖励弹出框
   */
  renderUserReward = () => {
    let opt = {
      distance: 280, // 每次移动的距离，卡片的真实宽度
      currentPoint: 0,// 初始位置，默认从0即第一个元素开始
      swTouchend: (ev) => {
        let data = {
          moved: ev.moved,
          originalPoint: ev.originalPoint,
          newPoint: ev.newPoint,
          cancelled: ev.cancelled
        }
      }
    }
    return (
      <div className={styles.popup}>
        <Modal
          visible={this.state.userRewardPopup}
          transparent={true}
          // maskClosable={false}
          transitionName={styles.transitionName}
          onClose={() => this.setState({ userRewardPopup: false })}
          wrapClassName={this.state.userRewardPopup ? styles.user_reward : styles.user_reward_an}>
          <div className={styles.modal_header}>
            <img src={require('assets/image/logo.png')} className={styles.modal_logo} />
            <h2 style={{ fontSize: "0.6rem", marginTop: "2%", marginBottom: "2%" }}>我的奖励</h2>
          </div>

          <div className={styles.viewport}>
            <div className={styles.flipsnap}>
              <ReactSwipes className={styles.card_slide} options={opt}>
                {
                  this.state.incentive.map((val, index) => {
                    if (val.get == 0) {
                      return (<div className={styles.popup_reward} key={index}>
                        <div className={styles.modal_content_award}>
                          <img src={require('assets/image/group.png')} style={{ width: '53%' }} />
                          <h3>{val.title}</h3>
                          <h4>{val.name}</h4>
                        </div>
                      </div>)
                    }
                    return (
                      <div className={styles.popup_reward} key={index}>
                        <div className={styles.modal_content_award}>
                          <img src={require('assets/image/trophy.png')} style={{ width: '53%' }} />
                          <h2>{val.title}</h2>
                          <ul className={styles.carousel_ul}>
                            <li> <p>{val.name}</p><p>{val.number}</p> </li>
                            <li> <p>{val.date}</p><p>{val.time}</p> </li>
                          </ul>
                        </div>

                      </div>
                    )
                  })
                }
              </ReactSwipes>
            </div>
          </div>

        </Modal>
      </div>
    )
  }

  /** 获取图片列表  */
  fetchTaskList = () => {
    let taskArray = [];
    let taskDataLength = Math.round((this.taskList.length) / 2);
    for (let i = 0; i < taskDataLength; i++) {
      taskArray[i] = this.taskList.splice(0, taskDataLength);
    }

    this.setState({
      imageLeft: taskArray[0],
      imageRight: taskArray[1],
    })

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

    if (Math.abs(moveX) > 100 || Math.abs(moveY) > 100) {
      if (moveY < 0) {
        this.setState({ moveUp: false })
        console.log()
        document.getElementsByClassName(styles.behavior_bar)[0].style.right = "-47%"
      } else {
        this.setState({ moveUp: true })
        document.getElementsByClassName(styles.behavior_bar)[0].style.right = "0"
      }
    }
  }
  /** 滑动结束事件 */
  navonTouchEndHandler = (e) => {
    // this.setState({ moveUp: true })
    // document.getElementsByClassName(styles.behavior_bar)[0].style.right = "0"
  }


  componentDidMount() {
    this.fetchTaskList()
  }

  taskList = [
    {
      id: 11,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 12,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
    },
    {
      id: 13,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 14,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/5PHyWdc6m2TLCZM.png"
    },
    {
      id: 15,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/LPavx56qcdof2Xu.png"
    },
    {
      id: 16,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/lcU2qyIR89kDvNb.png"
    },
    {
      id: 17,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 18,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 19,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 20,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
    },
    {
      id: 21,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 22,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/5PHyWdc6m2TLCZM.png"
    },
    {
      id: 23,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/LPavx56qcdof2Xu.png"
    },
    {
      id: 24,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/lcU2qyIR89kDvNb.png"
    },
    {
      id: 25,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 26,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 27,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 28,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 29,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
    },
    {
      id: 30,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 31,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/5PHyWdc6m2TLCZM.png"
    },
    {
      id: 32,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/LPavx56qcdof2Xu.png"
    },
    {
      id: 33,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/lcU2qyIR89kDvNb.png"
    },
    {
      id: 34,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 35,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 36,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 37,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 38,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 39,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
    },
    {
      id: 40,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 41,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/LPavx56qcdof2Xu.png"
    },
    {
      id: 42,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/lcU2qyIR89kDvNb.png"
    },
    {
      id: 43,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 44,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 45,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 46,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 47,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
    {
      id: 48,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/TFHIy9fSQa4V1KW.png"
    },
    {
      id: 49,
      title: '文本标签',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png"
    },
    {
      id: 50,
      title: '面包炒蛋',
      checked: false,
      imgurl: "https://i.loli.net/2020/09/25/J8t9KgATu5ZrQMz.png"
    },
  ]
}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  const { taskData } = state.pages_game;
  return {
    taskData: taskData,
  };
}

export default connect(mapStateToProps)(Index)

