
import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux'
import ClassifyBar from '../compontents/classify-bar';
import SearchBar from '../compontents/search';
import BehaviorBar from '../compontents/behavior-bar';
import ModalPopup from '../compontents/modal-popup';
import { PullToRefresh, ListView, Button } from 'antd-mobile';
import ReactDOM from 'react-dom';
import moment from 'moment'
import {
    StarFilled
} from '@ant-design/icons';
import { Spin, Skeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
const TASK_TOTAL = 180
export class Index extends Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        const dataSourceClass = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

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
            hasMore: true, // 是否开启下拉加载
            scroller: true,
            showScroll: false,

            taskNumber: 6,
            pagesize: 5,
            dataSource,
            dataSourceClass,
            refreshing: true,
            isLoading: false,

            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            imgDataList: props.taskArray,//前40张
        };
    }
    render() {
        const { searchImgDataList, taskPopup, awardPopup, awardAllPopup, notificationPopup, userRewardPopup, taskImgurl, isLoading } = this.state
        const { taskBar, awardList, starImgCheck, taskLabelData, newAwardList } = this.props;

        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className={'imgBox'} style={{ width: "100%" }} >
                    <div className={styles.task_list} ref={component => this.btnCart = component} onClick={() => this.taskImageClickedHandler(rowData, rowID)}>
                        <img src={`https://juuuce.com/media_static/${rowData.url}`} style={{ width: "100%", height: "100%" }} ref={component => this.behaviorUrl = component} />
                        <p className={styles.task_title}>{rowData.desc}</p>
                        <p className={rowData.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
                    </div>
                </div>
            );
        };
        return (
            <div className={styles.game}>

                <div className={styles.game_back} id={'gameback'}>
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

                <div className={styles.listview} onTouchMove={this.navonTouchMoveHandler}
                    onTouchStart={this.navonTouchStartHandler}
                    onTouchEnd={this.navonTouchEndHandler}>
                    {
                        !!this.state.scroller ?
                            (<ListView
                                id={'listview'}
                                key={this.state.useBodyScroll ? '0' : '1'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}
                                renderRow={row}
                                renderFooter={() => (<div style={{ textAlign: 'center' }}>
                                    {this.state.isLoading ? (<div className={styles.loading_down} ><img src={require('assets/image/frame_up.png')} /></div>) : (<Spin indicator={antIcon} />)}
                                </div>)}
                                useBodyScroll={this.state.useBodyScroll}
                                style={this.state.useBodyScroll ? {} : {
                                    height: this.state.height
                                }}
                                pullToRefresh={<PullToRefresh
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                    indicator={{ activate: " ", deactivate: " ", finish: " " }}
                                />}
                                onEndReached={this.onEndReached}
                                pageSize={this.state.pagesize}
                            />) : (
                                <ListView
                                    id={'listview'}
                                    key={this.state.useBodyScroll ? '0' : '1'}
                                    ref={el => this.lv = el}
                                    dataSource={this.state.dataSourceClass}
                                    renderRow={row}
                                    renderFooter={() => (<div style={{ textAlign: 'center' }}>
                                        {this.state.isLoading ? (<div className={styles.loading_down} ><img src={require('assets/image/frame_up.png')} /></div>) : (<Spin indicator={antIcon} />)}
                                    </div>)}
                                    useBodyScroll={this.state.useBodyScroll}
                                    style={this.state.useBodyScroll ? {} : {
                                        height: this.state.height,
                                    }}
                                    pullToRefresh={<PullToRefresh
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.searchLoadHandler}
                                        indicator={{ activate: " ", deactivate: " ", finish: " " }}
                                    />}
                                    onEndReached={this.onEndReachedClass}
                                    pageSize={5}
                                />
                            )
                    }
                    <div className={styles.backtop} onClick={() => this.handleScrollTop('hoc', true)}>
                        <img src={require('assets/image/fram.svg')} />
                    </div>
                </div>
                {/** 行动栏 */}
                <div className={styles.behavior_bar} ref={el => this.behaviorBar = el}>
                    <BehaviorBar
                        taskBar={taskBar}
                        starImgCheck={starImgCheck}
                    />
                </div>

                {/**底部搜索栏   */}
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
      * 任务图片点击事件 
      */
    taskImageClickedHandler = (item, index) => {

        const { taskBar, taskImgData, dispatch, starImgCheck, awardList, newAwardList, taskNumber } = this.props;
        let assignmentArr = this.state.assignmentList;
        let taskImageIndexArray = this.state.taskImageIndexArray;
        let taskBarGobal = taskBar.gobal + 1
        if (taskImageIndexArray.length > taskBarGobal) { return false }
        if (awardList.length >= taskNumber) {
            this.setState({ awardAllPopup: true, taskPopup: false, })
            return false
        }

        if (awardList.length < taskNumber) {
            if (item.key == taskBar.key) {
                this.state.behaviorImg = item.url;
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
                    // 当前任务完成
                    if (newstarImgCheck.length === taskBar.goal) {

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
                        let cxt = `点击最后一张（任务正确）图片${item.pid}`
                        this._catchLogSave(newdate, cxt)

                        this.setState({ awardPopup: true });
                        return false
                    }
                }

                //日志
                if (starImgCheck.length < taskBar.goal) {
                    let newdate = moment().format('YYYYMMDDHHmmss')
                    let cxt = `点击第${starImgCheck.length}张（任务正确）图片${item.pid}`
                    this._catchLogSave(newdate, cxt)
                }

                this.setState({
                    imgDataList: newTaskData,
                    dataSource: this.state.dataSource.cloneWithRows(newTaskData),
                })
            }
        }

        if (item.key !== taskBar.key) {

            this.state.notificationData.push(item)
            if (this.state.notificationData.length < 3) {
                let newdate = moment().format('YYYYMMDDHHmmss')
                let cxt = `点击第${this.state.notificationData.length}张（任务不正确）图片${item.pid}`
                this._catchLogSave(newdate, cxt)
            }
            if (this.state.notificationData.length >= 3) {
                let newdate = moment().format('YYYYMMDDHHmmss')
                let cxt = `点击最后一张（任务不正确）图片${item.pid}`
                this._catchLogSave(newdate, cxt)
                this.setState({ notificationPopup: true })
                return
            }
        }
    }
    // 下拉刷新
    onRefresh = () => {
        const { taskArray } = this.props;

        const newTaskArray = this.state.imgDataList
        let i = newTaskArray.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [newTaskArray[j], newTaskArray[i]] = [newTaskArray[i], newTaskArray[j]];
        }
        this.rData = newTaskArray;
        this.setState({
            refreshing: true, isLoading: true,
            dataSource: this.state.dataSource.cloneWithRows(newTaskArray),
        });
        setTimeout(() => {
            this.setState({
                refreshing: false,
                isLoading: false,
            });
        }, 1000);
        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = "下拉刷新页面"
        this._catchLogSave(newdate, cxt)
    };
    // 搜索刷新
    searchLoadHandler = () => {
        const { searchImgDataList } = this.state
        let i = searchImgDataList.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [searchImgDataList[j], searchImgDataList[i]] = [searchImgDataList[i], searchImgDataList[j]];
        }

        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false, dataSource: this.state.dataSource.cloneWithRows(searchImgDataList) });
        }, 600)
        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = "下拉刷新页面"
        this._catchLogSave(newdate, cxt)
    }
    //上拉
    onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }

        this.setState({ isLoading: true });

        const { imgDataList } = this.state
        const { taskArrayAfter, starImgCheck, taskArray } = this.props;
        const taskImgDataLength = taskArray.length + taskArrayAfter.length + 1
        if (imgDataList.length < taskImgDataLength) {
            this.state.imgDataList = [...imgDataList, ...taskArrayAfter, ...starImgCheck]

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.state.imgDataList),
                isLoading: false,
                imgDataList: this.state.imgDataList
            })

        }
        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = "上拉加载页面"
        this._catchLogSave(newdate, cxt)
    };
    // 搜索上拉
    onEndReachedClass = () => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = "上拉加载页面"
        this._catchLogSave(newdate, cxt)
    }
    // Top
    handleScrollTop = (anchorName) => {
        this.lv.scrollTo(0, -120)

        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = "点击返回顶部"
        this._catchLogSave(newdate, cxt)
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
            this.setState({ awardAllPopup: true, taskPopup: false, awardPopup: false })
            dispatch({
                type: "player/starImgCheckUpdate",
                payload: { starImgCheck: [] }
            })
            return
        }
        if (awardList.length < taskNumber) {

            this._fetchTaskBar()//获取加载
            this._fetchTaskImg()

            dispatch({
                type: "player/starImgCheckUpdate",
                payload: { starImgCheck: [] }
            })

            this.setState({ awardPopup: false, taskPopup: true })
            return
        }

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
    * 搜索框字段提交事件
    */
    searchSubmitHandler = (val) => {

        const { taskBar, starImgCheck, taskArrayAfter, taskArray } = this.props;
        if (val !== '') {

            let taskBarData = []
            let searchImgDataList = [...starImgCheck, ...taskArrayAfter, ...taskArray]

            taskBarData.push(taskBar)
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
                    scroller: false,
                    searchImgDataList: newArray,
                    dataSourceClass: this.state.dataSource.cloneWithRows(newArray),
                })
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
                    scroller: false,
                    searchImgDataList: newArray,
                    dataSourceClass: this.state.dataSource.cloneWithRows(newArray),
                })
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
                scroller: false,
                searchImgDataList: newSearchImgDataList,
                dataSourceClass: this.state.dataSource.cloneWithRows(newSearchImgDataList),
            })
        }
        let newdate = moment().format('YYYYMMDDHHmmss')
        let cxt = `点击分类栏中${val}类框`
        this._catchLogSave(newdate, cxt)
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
                tid: taskBar.tid,
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
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }
    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.rData = this.props.taskArray
        this.setState({
            refreshing: false,
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            height: hei,
        });
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
