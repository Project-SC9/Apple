
// import React, { Component } from 'react';
// import styles from './index.css';
// import { connect } from 'react-redux'
// import ClassifyBar from '../compontents/classify-bar';
// import SearchBar from '../compontents/search';
// import BehaviorBar from '../compontents/behavior-bar';
// import ModalPopup from '../compontents/modal-popup';
// import { PullToRefresh, ListView, Button } from 'antd-mobile';
// import { BackTop } from 'antd';
// import ReactDOM from 'react-dom';
// import moment from 'moment'
// import {
//     StarFilled
// } from '@ant-design/icons';

// import Masonry from 'masonry-layout'  //实现瀑布流
// import imagesloaded from 'imagesloaded' //监听图片加载
// import InfiniteScroll from 'react-infinite-scroller' //下拉加载

// const TASK_TOTAL = 180

// const data = [
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//         title: 'Meet hotel',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//         title: 'McDonald\'s invites you',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//         title: 'Eat the week',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
// ];

// export class Index extends Component {

//     constructor(props) {
//         super(props);
//         const dataSource = new ListView.DataSource({
//             rowHasChanged: (row1, row2) => row1 !== row2,
//         });

//         this.state = {
//             dataSource,
//             refreshing: true,
//             isLoading: true,
//             height: document.documentElement.clientHeight,
//             useBodyScroll: false,
//             imgDataList: props.taskArray,//前40张
//         };
//     }
//     render() {

//         const row = (rowData, sectionID, rowID) => {
//             return (
//                 <div key={rowID} className={'imgBox'} style={{ width: "50%" }} >
//                     <div className={styles.task_list} onClick={() => this.taskImageClickedHandler(rowData, rowID)} ref={component => this.btnCart = component}>
//                         <img src={`https://juuuce.com/media_static/${rowData.url}`} style={{ width: "100%", height: "100%" }} ref={component => this.behaviorUrl = component} />
//                         <p className={styles.task_title}>{rowData.desc}</p>
//                         <p className={rowData.checked === true ? styles.star_fill : styles.star_fill_toogle}><StarFilled /></p>
//                     </div>
//                 </div>
//             );
//         };
//         console.log(row)
//         // const cpm = () => (<div className={"pages_hoc"} style={{ margin: "auto" }}>
//         //     row
//         // </div>)
//         return (
//             <div>
//                 <ListView
//                     key={this.state.useBodyScroll ? '0' : '1'}
//                     ref={el => this.lv = el}
//                     dataSource={this.state.dataSource}
//                     renderRow={row}
//                     renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
//                         {this.state.isLoading ? 'Loading...' : 'Loaded'}
//                     </div>)}
//                     useBodyScroll={this.state.useBodyScroll}
//                     style={this.state.useBodyScroll ? {} : {
//                         height: this.state.height,
//                         border: '1px solid #ddd',
//                         margin: '5px 0',
//                     }}
//                     pullToRefresh={<PullToRefresh
//                         refreshing={this.state.refreshing}
//                         onRefresh={this.onRefresh}
//                     />}
//                     onEndReached={this.onEndReached}
//                     pageSize={40}
//                 >
//                 </ListView>
//             </div >
//         )
//     }
//     /**
//   * 瀑布流
//   */
//     advanceWidth = () => {
//         let elem = document.querySelector('.pages_hoc');
//         new Masonry(elem, {
//             itemSelector: '.imgBox', //要布局的网格元素
//             columnWidth: '.imgBox', //自适应
//             fitWidth: true, // 设置网格容器宽度等于网格宽度
//             gutter: 0,
//             cols: 2
//         });
//     }
//     /**
//   * 图片懒加载
//   */
//     imagesOnload = () => {
//         const elLoad = imagesloaded('.pages_hoc')  //获取下拉加载里面的第一个盒子
//         //always 图片已全部加载，或被确认加载失败
//         elLoad.on('progress', () => {
//             // 调用瀑布流
//             this.advanceWidth()
//         })
//     }

//     componentDidUpdate() {
//         if (this.state.useBodyScroll) {
//             document.body.style.overflow = 'auto';
//         } else {
//             document.body.style.overflow = 'hidden';
//         }
//     }
//     componentDidMount() {
//         const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
//         this.rData = this.props.taskArray
//         this.setState({
//             dataSource: this.state.dataSource.cloneWithRows(this.rData),
//             height: hei,
//             refreshing: false,
//             isLoading: false,
//         }, () => this.imagesOnload());
//     }
//     onRefresh = () => {
//         this.setState({ refreshing: true, isLoading: true });
//         setTimeout(() => {
//             this.rData = this.props.taskArrayAfter;
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(this.rData),
//                 refreshing: false,
//                 isLoading: false,
//             });
//         }, 600);
//     };
//     onEndReached = (event) => {
//         if (this.state.isLoading && !this.state.hasMore) {
//             return;
//         }
//         console.log('reach end', event);
//         this.setState({ isLoading: true });
//         const { taskArrayAfter, taskArray } = this.props;
//         console.log(this.rData)
//         if (this.rData.length + taskArray.length < taskArrayAfter.length + taskArray.length + 1) {
//             this.rData = [...this.rData, ...this.props.taskArrayAfter];
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(this.rData),
//                 isLoading: false,
//             });
//         }

//     };
// }
// const mapStateToProps = (state) => {
//     const { taskBar, taskImgData, taskArray, taskArrayAfter, starImgCheck, awardList, taskLabelData, newAwardList } = state.player;
//     return {
//         taskBar: taskBar,
//         taskImgData: taskImgData,
//         taskLabelData: taskLabelData,
//         taskArray: taskArray,
//         taskArrayAfter: taskArrayAfter,
//         starImgCheck: starImgCheck,
//         awardList: awardList,
//         newAwardList: newAwardList
//     };
// }

// export default connect(mapStateToProps)(Index)
