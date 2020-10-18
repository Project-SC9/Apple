
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

// const NUM_ROWS = 20;
// let pageIndex = 0;


// export class test extends Component {

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
//         };
//     }
//     render() {

//         let index = data.length - 1;
//         const row = (rowData, sectionID, rowID) => {
//             if (index < 0) {
//                 index = data.length - 1;
//             }
//             const obj = data[index--];
//             return (
//                 <div key={rowID}
//                     style={{
//                         padding: '0 15px',
//                         backgroundColor: 'white',
//                     }}
//                 >
//                     <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
//                         {obj.title}
//                     </div>
//                 </div>
//             );
//         };
//         return (
//             <div>


//                 <ListView
//                     key={this.state.useBodyScroll ? '0' : '1'}
//                     ref={el => this.lv = el}
//                     dataSource={this.state.dataSource}
//                     renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
//                         {this.state.isLoading ? 'Loading...' : 'Loaded'}
//                     </div>)}
//                     renderRow={row}
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
//                     pageSize={5}
//                 />
//             </div>
//         )
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

//         setTimeout(() => {
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(genData()),
//                 height: hei,
//                 refreshing: false,
//                 isLoading: false,
//             });
//         }, 1500);
//     }
//     onRefresh = () => {
//         this.setState({ refreshing: true, isLoading: true });
//         // simulate initial Ajax
//         setTimeout(() => {
//             this.rData = genData();
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(this.rData),
//                 refreshing: false,
//                 isLoading: false,
//             });
//         }, 600);
//     };
//     onEndReached = (event) => {
//         // load new data
//         // hasMore: from backend data, indicates whether it is the last page, here is false
//         if (this.state.isLoading && !this.state.hasMore) {
//             return;
//         }
//         console.log('reach end', event);
//         this.setState({ isLoading: true });
//         setTimeout(() => {
//             this.rData = [...this.rData, ...genData(++pageIndex)];
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRows(this.rData),
//                 isLoading: false,
//             });
//         }, 1000);
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
