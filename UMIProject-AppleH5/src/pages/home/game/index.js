import React, { Component } from 'react';
import styles from './index.css';

import ClassifyBar from '../compontents/classify-bar';
import SearchBar from '../compontents/search';
import BehaviorBar from '../compontents/behavior-bar';

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
		taskPopup: true,
		awardPopup: false,
		awardAllPopup: false,
		userRewardPopup: false,
		taskImgurl: 'https://i.loli.net/2020/09/22/rnhTuLKPtU1J6Al.png',
		awardImgurl: 'https://i.loli.net/2020/09/26/HYwPZ7FN8IckjO4.png',
		imageLeft: [],
		imageRight: [],
		assignmentList: [],
		assignmentSuccsess: ["面包炒蛋", "面包炒蛋", "面包炒蛋"],
		assignmentSuccsessIndex: 3,
		assignmentSuccsessValue: 0,
		taskImageIndexArray: [],
		behaviorImg: "https://i.loli.net/2020/09/25/GgWZfBpJclb6umv.png",
		istoogle: -1,
		toogleStar: [],
		data: ['1', '2'],
	}
	render() {
		return (
			<div className={styles.game}>
				{/** 任务发布 */}
				{
					!this.state.taskPopup ? this.renderTaskPopUp() : null
				}
				<div className={styles.game_back}>
					<div className={styles.game_status}>
						<div className={styles.main_top}>
							<p>今天状态如何？</p>
							<div onClick={() => this.setState({ userRewardPopup: true })} > <img src={require('assets/image/info.png')} /></div>
						</div>
					</div>
				</div>
				<div className={styles.game_content}>
					<ClassifyBar />
				</div>
				{/**内容展示区 */}
				<div className={styles.content}>
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
				</div>
				{/** 行动栏 */}
				<BehaviorBar
					assignmentSuccsessIndex={this.state.assignmentSuccsessIndex}
					assignmentSuccsessValue={this.state.assignmentSuccsessValue}
					behaviorImg={this.state.behaviorImg} />
				{/**底部搜索栏 */}
				<div className={styles.search}>
					<SearchBar />
				</div>
				{
					this.state.awardPopup ? this.renderAwardPopup() : null
				}
				{
					this.state.awardAllPopup ? this.renderAwardAllPopup() : null
				}
				{
					this.state.userRewardPopup ? this.renderUserReward() : null
				}
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
						<img src={require('assets/image/logo.png')} />
						{/**<p onClick={() => this.setState({ awardPopup: false })}>x</p>*/}
					</div>
					<div className={styles.modal_content_award}>
						<img src={require('assets/image/trophy.png')} />
						<h2>奖励名称</h2>
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
						<img src={require('assets/image/logo.png')} />
						{/**<p onClick={() => this.setState({ awardAllPopup: false })}>x</p>*/}
					</div>
					<div className={styles.modal_content_award}>
						<img src={require("assets/image/feedback.png")} />
						<h2>今日奖励已全部取得</h2>
						<p className={styles.modal_content_text}>明日再战吧！</p>
						<Button onClick={() => this.setState({ awardAllPopup: false })}>我知道了</Button>
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
			console.log(taskImageIndexArray)
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
		}



	}

	/**
	 * 我的奖励弹出框
	 */
	renderUserReward = () => {
		return (
			<div className={styles.popup}>
				<Modal
					visible={this.state.userRewardPopup}
					transparent={true}
					// maskClosable={false}
					onClose={() => this.setState({ userRewardPopup: false })}
					wrapClassName={styles.user_reward}>
					<div className={styles.modal_header}>
						<img src={require('assets/image/logo.png')} />
						<h2>我的奖励</h2>
					</div>
					<Carousel
						className={styles.space_carousel}
						frameOverflow="visible"
						cellSpacing={10}
						slideWidth={0.5}
						afterChange={index => this.setState({ slideIndex: index })}
					>
						<div className={styles.popup_reward}>
							<div className={styles.modal_content_award}>
								<img src={require('assets/image/trophy.png')} style={{ width: '53%' }} />
								<h2>奖励名称01</h2>
								<ul className={styles.carousel_ul}>
									<li> <p>酒店名称</p><p>001房</p> </li>
									<li> <p>2020.9.07</p><p>19：34</p> </li>
								</ul>
							</div>
						</div>
						<div className={styles.popup_reward}>
							<div className={styles.modal_content_award}>
								<img src={require('assets/image/group.png')} style={{ width: '53%' }} />
								<h3>奖励名称02</h3>
								<h4>还未获得</h4>
							</div>
						</div>
					</Carousel>


				</Modal>
			</div>
		)
	}

	componentDidMount() {
		let taskList = [
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
			}
		];
		let taskArray = [];
		let taskListLength = Math.round((taskList.length) / 2);
		for (let i = 0; i < taskListLength; i++) {
			taskArray[i] = taskList.splice(0, taskListLength);
		}
		this.setState({
			imageLeft: taskArray[0],
			imageRight: taskArray[1],
		})
	}
}

export default Index
