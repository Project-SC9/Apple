import React, { PureComponent } from 'react'
import styles from './index.css';
import { Button, Modal, Carousel } from 'antd-mobile';
import {
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ReactSwipes from 'react-swipes'
/**
 * 弹出框组件库
 */
export class Index extends PureComponent {
  state = {
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
  }
  render() {
    const { taskPopup, awardPopup, awardAllPopup, notificationPopup, userRewardPopup } = this.props;
    return (
      <div>
        {/** 任务发布 */}
        {
          taskPopup ? this.renderTaskPopUp() : null
        }
        {/** 任务完成 */}
        {
          awardPopup ? this.renderAwardPopup() : null
        }
        {/** 任务奖励 */}
        {
          awardAllPopup ? this.renderAwardAllPopup() : null
        }
        {/** 任务错误提示 */}
        {
          notificationPopup ? this.renderNotificationPopup() : null
        }
        {/** 我的奖励 */}
        {
          userRewardPopup ? this.renderUserReward() : null
        }
      </div>
    )
  }
  /**
 * 任务弹出框 
 */
  renderTaskPopUp = () => {

    const { taskPopup, taskImgurl, taskBar } = this.props;
    return (
      <div className={styles.popup}>
        <Modal
          visible={taskPopup}
          transparent
          maskClosable={false}
          wrapClassName={styles.popup_modal_task}>
          <div className={styles.modal_header}>
            <div className={styles.modal_header_img}>
              <img src={require("assets/image/mianb.png")} />
            </div>
          </div>
          <div className={styles.modal_content}>
            <h2>{taskBar.name}</h2>
            <p>找到并点击{taskBar.goal}张对应的图片</p>
            <Button onClick={this.taskPopUpClickedHandler}>OK</Button>
          </div>
        </Modal>
      </div>
    )
  }

  taskPopUpClickedHandler = () => {
    const { onClickTaskPopUp } = this.props;
    onClickTaskPopUp()
  }

  /**
   * 任务奖励弹出框
   */
  renderAwardPopup = () => {
    const { awardPopup, newAwardList } = this.props
    return (
      <div className={styles.popup}>
        <Modal
          visible={awardPopup}
          transparent
          onClose={this.awardPopupClickedHandler}
          wrapClassName={styles.popup_modal_award}>
          <div className={styles.modal_header}>
            <img src={require('assets/image/logo.png')} className={styles.modal_logo} />
          </div>
          <div className={styles.modal_content_award}>
            <img src={require('assets/image/trophy.png')} className={styles.award_logo} />
            <h2 className={styles.award_title}>{newAwardList.title}</h2>
            <ul>
              <li> <p>酒店名称</p><p>{newAwardList.number}</p> </li>
              <li> <p>{newAwardList.date}</p> </li>
            </ul>
            <Button onClick={this.awardPopupClickedHandler}>我知道了</Button>
            <p className={styles.mark_hint}><ExclamationCircleFilled />请截图，并到酒店前台领取奖励</p>
          </div>
        </Modal>
      </div>
    )
  }

  awardPopupClickedHandler = () => {
    const { onClickAwardPopup } = this.props;
    onClickAwardPopup()
  }

  /**
   * 任务不对提示框
   */
  renderNotificationPopup = () => {
    const { notificationPopup } = this.props
    return (
      <div className={styles.popup} >
        <Modal
          visible={notificationPopup}
          transparent
          // maskClosable={false}
          onClose={this.notificationPopupClickedHandler}
          wrapClassName={styles.popup_modal}>
          <div className={styles.modal_header}>
            <img src={require('assets/image/logo.png')} className={styles.modal_logo} />
          </div>
          <div className={styles.modal_content_award}>
            <img src={require("assets/image/notification.png")} className={styles.award_logo} style={{ marginTop: "4%" }} />
            <h2 className={styles.awardall_title}>挑战提示</h2>
            <p className={styles.modal_content_text}>点击与挑战相关食品，才能完成挑战！</p>
            <Button onClick={this.notificationPopupClickedHandler} style={{ fontSize: "0.4rem" }}>我知道了</Button>
          </div>
        </Modal>
      </div>
    )
  }

  notificationPopupClickedHandler = () => {
    const { onClickNotificationPopup } = this.props;
    onClickNotificationPopup()
  }

  /**
   * 全部奖励弹出框
   */
  renderAwardAllPopup = () => {
    const { awardAllPopup } = this.props
    return (
      <div className={styles.popup} >
        <Modal
          visible={awardAllPopup}
          transparent
          // maskClosable={false}
          onClose={this.awardAllPopupClickedHandler}
          wrapClassName={styles.popup_modal}>
          <div className={styles.modal_header}>
            <img src={require('assets/image/logo.png')} className={styles.modal_logo} />
          </div>
          <div className={styles.modal_content_award}>
            <img src={require("assets/image/feedback.png")} className={styles.award_logo} style={{ marginTop: "4%" }} />
            <h2 className={styles.awardall_title}>今日奖励已全部取得</h2>
            <p className={styles.modal_content_text}>明日再战吧！</p>
            <Button onClick={this.awardAllPopupClickedHandler} style={{ fontSize: "0.4rem" }}>我知道了</Button>
          </div>
        </Modal>
      </div>
    )
  }

  awardAllPopupClickedHandler = () => {
    const { onClicktAwardAllPopup } = this.props;
    onClicktAwardAllPopup()
  }

  /**
   * 我的奖励弹出框
   */
  renderUserReward = () => {
    let opt = {
      distance: 280, // 每次移动的距离，卡片的真实宽度
      currentPoint: 0,// 初始位置，默认从0即第一个元素开始
    }
    const { userRewardPopup, awardList } = this.props;
    return (
      <div className={styles.popup}>
        <CSSTransition in={userRewardPopup} timeout={200} classNames={styles.alert} timeout={300} unmountOnExit  >
          <Modal
            visible={userRewardPopup}
            transparent={true}
            animationType="slide-down"
            transitionName={styles.transitionName}
            onClose={this.userRewardPopupClickedHandler}
            wrapClassName={userRewardPopup ? styles.user_reward : styles.user_reward_an}>
            <div className={styles.modal_header}>
              <img src={require('assets/image/logo.png')} className={styles.modal_logo} />
              <h2 style={{ fontSize: "0.6rem", marginTop: "2%", marginBottom: "2%" }}>我的奖励</h2>
            </div>

            <div className={styles.viewport}>
              <div className={styles.flipsnap}>
                <ReactSwipes className={styles.card_slide} options={opt}>
                  {
                    awardList == "" ?
                      (
                        <div className={styles.popup_reward}>
                          <div className={styles.modal_content_award}>
                            <img src={require('assets/image/group.png')} style={{ width: '44%' }} />
                            <h3>奖励名称</h3>
                            <h4>还未获得</h4>
                          </div>
                        </div>
                      ) : (
                        <>
                          {
                            awardList.map((val, index) => {
                              return (
                                <div className={styles.popup_reward} key={index}>
                                  <div className={styles.modal_content_award}>
                                    <img src={require('assets/image/trophy.png')} style={{ width: '44%' }} />
                                    <h2>{val.title}</h2>
                                    <ul className={styles.carousel_ul}>
                                      <li> <p>酒店名称</p><p>{val.number}</p> </li>
                                      <li> <p>{val.date}</p> </li>
                                    </ul>
                                  </div>

                                </div>
                              )
                            })
                          }
                        </>
                      )
                  }

                </ReactSwipes>
              </div>
            </div>
          </Modal>
        </CSSTransition>

      </div>
    )
  }

  userRewardPopupClickedHandler = () => {
    const { onClickUserRewardPopup } = this.props;
    onClickUserRewardPopup()
  }

}

export default Index
