import React, { Component } from 'react'
import Masonry from 'masonry-layout'  //实现瀑布流
import imagesloaded from 'imagesloaded' //监听图片加载
import InfiniteScroll from 'react-infinite-scroller' //下拉加载
import styles from './index.css'
import LazyLoad from 'react-lazyload';
// import './index.less'
import { Grid } from 'antd-mobile';

const taskList = [
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
]

const arr = [
    { imgurl: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3008142408,2229729459&fm=26&gp=0.jpg' },
    { imgurl: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3437217665,1564280326&fm=26&gp=0.jpg' },
    { imgurl: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2458227883,4095122505&fm=26&gp=0.jpg' },
    { imgurl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1761250919,1896060533&fm=26&gp=0.jpg' },
    { imgurl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2852083094,372235004&fm=26&gp=0.jpg' },
    { imgurl: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2944705163,3932100810&fm=26&gp=0.jpg' },
    { imgurl: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3104686528,572431609&fm=26&gp=0.jpg' },
]

export class Index extends Component {
    state = {
        data: taskList,
        hasMore: true, // 是否开启下拉加载
    }
    componentDidMount() {
        this.imagesOnload()
    }
    render() {
        const { data, hasMore } = this.state
        return (
            <div>
                <div className="pages_pinterest" className={styles.pages_pinterest}>
                    {/* 下拉加载 */}
                    <InfiniteScroll
                        initialLoad={false} // 不让它进入直接加载
                        pageStart={1} // 设置初始化请求的页数
                        loadMore={this.loadMoreData}  // 监听的ajax请求
                        hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
                        useWindow={true} // 不监听 window 滚动条
                    >
                        <div className={"pages_hoc"} style={{ margin: "auto" }}>
                            {
                                data.map((item, index) => {
                                    return (
                                        <div key={index} className={'imgBox'} style={{ width: "50%" }}>
                                            <img src={item.imgurl} style={{ width: "100%", height: "100%" }} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }

    //瀑布流
    advanceWidth = () => {
        var elem = document.querySelector('.pages_hoc');

        const s = new Masonry(elem, {
            itemSelector: '.imgBox', //要布局的网格元素
            columnWidth: '.imgBox', //自适应
            fitWidth: true, // 设置网格容器宽度等于网格宽度
            gutter: 0,
            cols: 2
        });
        console.log()
    }


    // 下拉加载
    loadMoreData = () => {
        const { data } = this.state
        if (data.length < 80) {
            this.setState({
                data: [...data, ...arr] //拼接每次加载的数据 arr是我自定义的数据
            }, () => {
                this.imagesOnload() // 每次获取完数据 触发
            })
        }
    }

    //图片懒加载
    imagesOnload = () => {
        const elLoad = imagesloaded('.pages_hoc')  //获取下拉加载里面的第一个盒子
        //always 图片已全部加载，或被确认加载失败
        elLoad.on('always', () => {
            // 调用瀑布流
            this.advanceWidth()
        })
    }
}
// <Grid
//     data={taskList}
//     columnNum={2}
//     square={false}
//     renderItem={(dataItem, index) => {
//         console.log(index)
//         return (
//             <div style={{ padding: '12.5px' }} key={index}>
//                 <img src={dataItem.imgurl} style={{ width: '100%', height: '100%' }} alt="" />
//             </div>
//         )
//     }}
// />
// import React, { Component } from 'react';
// import styles from './index.css';
// import { connect } from 'react-redux'
// import ClassifyBar from '../compontents/classify-bar';
// import SearchBar from '../compontents/search';
// import BehaviorBar from '../compontents/behavior-bar';
// import ModalPopup from '../compontents/modal-popup';
// import ReactSwipes from 'react-swipes'
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

// import { Button, Modal, Carousel } from 'antd-mobile';
// import {
//     StarFilled
// } from '@ant-design/icons';

// import Masonry from 'masonry-layout'  //实现瀑布流
// import imagesloaded from 'imagesloaded' //监听图片加载
// import InfiniteScroll from 'react-infinite-scroller' //下拉加载

// /**
//  * 游戏内容页
//  */
// // https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png
// export class Index extends Component {
//     state = {
//         moveUp: true,
//         success: true,
//         taskPopup: true,
//         awardPopup: false,
//         awardAllPopup: false,
//         userRewardPopup: false,
//         notificationPopup: false,
//         taskImgurl: 'https://i.loli.net/2020/10/01/x4c3eSwDNRiK1Pk.png',
//         awardImgurl: 'https://i.loli.net/2020/09/26/HYwPZ7FN8IckjO4.png',
//         imageLeft: [],
//         imageRight: [],
//         assignmentList: [],
//         notificationData: [],
//         searchData: [],
//         assignmentSuccsess: ["面包炒蛋", "面包炒蛋", "面包炒蛋"],
//         assignmentSuccsessIndex: 3,
//         assignmentSuccsessValue: 0,
//         taskImageIndexArray: [],
//         behaviorImg: "",
//         istoogle: -1,
//         toogleStar: [],
//         data: ['1', '2'],
//         firstX: 0,
//         firstY: 0,
//         endX: 0,
//         endY: 0,
//         moveX: 0,
//         moveY: 0,
//         searchImageLeft: [],
//         searchImageRight: [],
//         imgDataList: taskList,
//         hasMore: true, // 是否开启下拉加载
//     }

//     render() {
//         // if (this.state.imageLeft == "" && this.state.imageRight == "") { return }
//         const { taskPopup, awardPopup, awardAllPopup, notificationPopup, userRewardPopup, taskImgurl } = this.state
//         return (
//             <div className={styles.game}>
//                 <div className={styles.game_back}>
//                     <div className={styles.game_status}>
//                         <div className={styles.main_top}>
//                             <p>今天状态如何？</p>
//                             <div onClick={() => this.setState({ userRewardPopup: true })} > <img src={require('assets/image/info.png')} /></div>
//                         </div>
//                         <div className={styles.game_content}>
//                             <ClassifyBar />
//                         </div>
//                     </div>
//                 </div>

//                 {/**内容展示区 */}
//                 <div
//                     className={styles.content}
//                     onTouchMove={this.navonTouchMoveHandler}
//                     onTouchStart={this.navonTouchStartHandler}
//                     onTouchEnd={this.navonTouchEndHandler}>
//                     {
//                         this.state.searchData == '' ?
//                             this.renderGameContent() : this.renderSearchContent()
//                     }
//                 </div>
//                 <div className={styles.loading_down}><img src={require('assets/image/frame_up.png')} /></div>
//                 {/** 行动栏 */}
//                 <div className={styles.behavior_bar}>
//                     <BehaviorBar
//                         assignmentSuccsessIndex={this.state.assignmentSuccsessIndex}
//                         assignmentSuccsessValue={this.state.assignmentSuccsessValue}
//                         behaviorImg={this.state.behaviorImg} />
//                 </div>
//                 {/**底部搜索栏 */}
//                 {
//                     this.state.moveUp ?
//                         (
//                             <div className={styles.search} >
//                                 <SearchBar onSearchChange={this.searchChangedHandler} onSearchSubmit={this.searchSubmitHandler} />
//                             </div>
//                         ) : null
//                 }

//                 <ModalPopup
//                     taskPopup={taskPopup}
//                     onClickTaskPopUp={this.taskPopUpClickedHandler}

//                     awardPopup={awardPopup}
//                     onClickAwardPopup={this.awardPopupClickedHandler}

//                     awardAllPopup={awardAllPopup}
//                     onClicktAwardAllPopup={this.awardAllPopupClickedHandler}

//                     notificationPopup={notificationPopup}
//                     onClickNotificationPopup={this.notificationPopupClickedHandler}

//                     userRewardPopup={userRewardPopup}
//                     onClickUserRewardPopup={this.userRewardPopupClickedHandler}

//                     taskImgurl={taskImgurl} />
//             </div>
//         )
//     }

//     taskPopUpClickedHandler = () => { this.setState({ taskPopup: false }) }
//     awardPopupClickedHandler = () => { this.setState({ awardPopup: false, awardAllPopup: true }) }
//     awardAllPopupClickedHandler = () => { this.setState({ awardAllPopup: false }) }
//     notificationPopupClickedHandler = () => { this.setState({ notificationPopup: false }) }
//     userRewardPopupClickedHandler = () => { this.setState({ userRewardPopup: false }) }

//     /**
//     * 搜索框字段改变事件
//     */
//     searchChangedHandler = (val) => {

//         // let searchList = this.state.imageRight.filter(item => item.title == val)
//         // this.state.searchData.push(searchList)
//         // this.setState({
//         //   searchData: this.state.searchData
//         // })
//         // {/** 任务发布 */ }
//         // {
//         //   !this.state.taskPopup ? this.renderTaskPopUp() : null
//         // }
//         // {/** 任务完成 */ }
//         // {
//         //   this.state.awardPopup ? this.renderAwardPopup() : null
//         // }
//         // {/** 任务奖励 */ }
//         // {
//         //   this.state.awardAllPopup ? this.renderAwardAllPopup() : null
//         // }
//         // {/** 任务错误提示 */ }
//         // {
//         //   this.state.notificationPopup ? this.renderNotificationPopup() : null
//         // }
//         // {/** 我的奖励 */ }
//         // {
//         //   this.state.userRewardPopup ? this.renderUserReward() : null
//         // }
//     }

//     /**
//      * 搜索框字段提交事件
//      */
//     searchSubmitHandler = (val) => {
//         if (val !== '') {
//             let searchList = this.state.imageRight.filter(item => item.title == val)
//             const searchArray = [];
//             const searchDataLength = Math.round((searchList.length) / 2);
//             for (let i = 0; i < searchDataLength; i++) {
//                 searchArray[i] = searchList.splice(0, searchDataLength);
//             }
//             this.setState({
//                 searchData: searchArray,
//                 searchImageLeft: searchArray[0],
//                 searchImageRight: searchArray[1],
//             })
//         }

//     }

//     /**
//      * 游戏内容展示
//      */
//     renderGameContent = () => {
//         const { data, hasMore } = this.state
//         return (
//             <div className={styles.content_task}>
//                 <div className={styles.content_task_left}>
//                     {
//                         this.state.imageLeft.map((item, index) => {
//                             return (
//                                 <div className={styles.task_list} style={{ display: item.checked == true ? "none" : "" }} key={index} onClick={() => this.taskImageClickedHandler(item, index)}>
//                                     <img src={item.imgurl} />
//                                     <p className={styles.task_title}>{item.title}</p>
//                                     <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 <div className={styles.content_task_right}>
//                     {
//                         this.state.imageRight.map((item, index) => {
//                             return (<div className={styles.task_list} key={index} onClick={() => this.taskImageClickedHandler(item, index)}>
//                                 <img src={item.imgurl} />
//                                 <p className={styles.task_title}>{item.title}</p>
//                                 <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
//                             </div>)
//                         })
//                     }
//                 </div>
//             </div>
//         )
//     }

//     /**
//      * 搜索内容展示
//      */
//     renderSearchContent = () => {
//         return (
//             <div className={styles.content_task}>
//                 <div className={styles.content_task_left}>
//                     {
//                         this.state.searchImageLeft.map((item, index) => {
//                             return (
//                                 <div className={styles.task_list} key={index} onClick={() => this.taskImageClickedHandler(item, index)}>
//                                     <img src={item.imgurl} />
//                                     <p className={styles.task_title}>{item.title}</p>
//                                     <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 <div className={styles.content_task_right}>
//                     {
//                         this.state.searchImageRight.map((item, index) => {
//                             return (<div className={styles.task_list} key={index} onClick={() => this.taskImageClickedHandler(item, index)}>
//                                 <img src={item.imgurl} />
//                                 <p className={styles.task_title}>{item.title}</p>
//                                 <p className={item.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
//                             </div>)
//                         })
//                     }
//                 </div>
//             </div>
//         )
//     }

//     /** 
//      * 任务图片点击事件 
//      */
//     taskImageClickedHandler = (item, index) => {
//         const { assignmentSuccsessIndex } = this.state;
//         let assignmentArr = this.state.assignmentList;
//         let taskImageIndexArray = this.state.taskImageIndexArray;
//         if (taskImageIndexArray.length > 4) { return }
//         if (item.title == "面包炒蛋") {

//             item.checked = true;
//             assignmentArr.push(item.title);
//             taskImageIndexArray.push(item.id)
//             taskImageIndexArray = [...new Set(taskImageIndexArray)]
//             assignmentArr = [...assignmentArr];
//             taskImageIndexArray = [...taskImageIndexArray]
//             let toogleStar = this.state.toogleStar;
//             this.state.behaviorImg = item.imgurl
//             toogleStar.push(item.id)
//             toogleStar = [...toogleStar]
//             this.setState({
//                 assignmentSuccsessValue: taskImageIndexArray.length
//             })
//             if (taskImageIndexArray.length == assignmentSuccsessIndex) {
//                 this.setState({ awardPopup: true });
//                 return
//             }

//             const id2 = Number(item.id)
//             const ToDoList1 = JSON.parse(JSON.stringify([...this.state.imageLeft]))
//             const ToDoList2 = JSON.parse(JSON.stringify([...this.state.imageRight]))
//             let newTaskDataLeft = ToDoList1.filter(item => item.id !== id2);
//             let newTaskDataRight = ToDoList2.filter(item => item.id !== id2);

//             let a = ToDoList1.indexOf(item.id)
//             let b = ToDoList2.indexOf(item.id)

//             if (b == -1) { newTaskDataRight.push(item); }

//             this.setState({
//                 //filter方法筛选数组，这里的意思是id与传过来的id2不一样的就留下，一样的就删除。
//                 imageLeft: newTaskDataLeft,
//                 imageRight: newTaskDataRight
//             })
//         }
//         if (item.title == "文本标签") {
//             this.state.notificationData.push(item)
//             if (this.state.notificationData.length > 4) {
//                 this.setState({ notificationPopup: true })
//             }
//         }

//     }

//     /** 获取图片列表  */
//     fetchTaskList = () => {
//         let taskArray = [];
//         let taskDataLength = parseInt((this.taskList.length) / 2);
//         // let taskDataLength = Math.round((this.taskList.length) / 2);
//         for (let i = 0; i < taskDataLength; i++) {
//             taskArray[i] = this.taskList.splice(0, taskDataLength);
//         }

//         this.setState({
//             imageLeft: taskArray[0],
//             imageRight: taskArray[1],
//         })

//         // const { dispatch } = this.props;

//         // dispatch({
//         //   type: "home/fetchTaskList",
//         //   payload: {
//         //     uid: this.props.location.query.uid,
//         //     tid: this.props.location.query.tid
//         //   }
//         // })

//         // dispatch({
//         //   type: "home/fetchTaskImgData",
//         //   payload: {
//         //     uid: this.props.location.query.uid,
//         //     tid: this.props.location.query.tid,
//         //     total: 80
//         //   }
//         // })

//     }

//     /** 滑动开始事件 */
//     navonTouchStartHandler = (e) => {
//         this.setState({
//             firstX: e.targetTouches[0].clientX,
//             firstY: e.targetTouches[0].clientY,
//         })
//     }
//     /** 滑动移动事件 */
//     navonTouchMoveHandler = (e) => {
//         this.setState({
//             endX: e.changedTouches[0].clientX,
//             endY: e.changedTouches[0].clientY,
//         });
//         let moveX = this.state.endX - this.state.firstX;
//         let moveY = this.state.endY - this.state.firstY;

//         if (Math.abs(moveX) > 10 || Math.abs(moveY) > 10) {
//             if (moveY > 0) {
//                 this.setState({ moveUp: true })
//                 document.getElementsByClassName(styles.behavior_bar)[0].style.right = "0"
//             } else {
//                 this.setState({ moveUp: false })
//                 document.getElementsByClassName(styles.behavior_bar)[0].style.right = "-40%"
//             }
//         }
//     }
//     /** 滑动结束事件 */
//     navonTouchEndHandler = (e) => {
//         // this.setState({ moveUp: true })
//         // document.getElementsByClassName(styles.behavior_bar)[0].style.right = "0"
//     }


//     componentDidMount() {
//         this.fetchTaskList()
//         this.imagesOnload()//图片加载
//         window.addEventListener("resize", function () {
//             // 解决键盘弹起后遮挡输入框的问题
//             if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
//                 window.setTimeout(function () {
//                     document.activeElement.scrollIntoViewIfNeeded();
//                 }, 0);
//             }
//         })
//     }
// }

// /**
//  * state整棵状态树
// */
// const mapStateToProps = (state) => {
//     const { taskData } = state.home;
//     return {
//         taskData: taskData,
//     };
// }
//      <Swiper
//     spaceBetween={0}
//     slidesPerView={3.3}
//     onSlideChange={(val) => this.slider && this.slider.innerSlider.slickGoTo(val.activeIndex)}
// >
//     {taskLabelData.map((val, index) => (
//         <SwiperSlide key={index} className={styles.carousel} onClick={() => this.classifyBarClickedHandler(val)}>
//             <div className={styles.carousel_img}>
//                 <img src={require('assets/image/ellipse-tp.png')} />
//                 <p>{val}</p>
//             </div>
//         </SwiperSlide>
//     ))}
// </Swiper>

// export default connect(mapStateToProps)(Index)


export default Index
