import React, { Component } from 'react';
import styles from './index.css';
import Link from 'umi/link';
import { Button, Modal } from 'antd-mobile';
import ClassifyBar from '../compontents/classify-bar';
import SearchBar from '../compontents/search';
/**
 * 游戏内容页
 */
export class Index extends Component {
	state = {
		popup: true,
		imgurl: 'https://i.loli.net/2020/09/22/rnhTuLKPtU1J6Al.png',
		imageLeft: ['https://i.loli.net/2020/09/20/JCyk54i17WKxZMt.png', 'https://i.loli.net/2020/09/20/kj6Ga9QNnKO8XWA.png', 'https://i.loli.net/2020/09/20/GXtQrpUbkMEwsY8.png', 'https://i.loli.net/2020/09/20/JCyk54i17WKxZMt.png'],
		imageRight: ['https://i.loli.net/2020/09/20/kj6Ga9QNnKO8XWA.png', 'https://i.loli.net/2020/09/20/owyeBOSnK8cAhiX.png', 'https://i.loli.net/2020/09/20/JCyk54i17WKxZMt.png', 'https://i.loli.net/2020/09/20/GXtQrpUbkMEwsY8.png'],
	}
	render() {
		return (
			<div className={styles.game}>
				{
					!this.state.popup ? this.renderTaskPopUp() : null
				}
				<div className={styles.main_top}>
					<p>今天状态如何？</p>
					<Link to='/home/game'><img src={require('assets/image/info.png')} /></Link>
				</div>
				<div className={styles.content}>
					<ClassifyBar />
					<div className={styles.content_task}>
						<div className={styles.content_task_left}>
							{
								this.state.imageLeft.map((item, index) => { return (<img src={item} key={index} style={{ width: '100%', verticalAlign: 'top' }} />) })
							}
						</div>
						<div className={styles.content_task_right}>
							{
								this.state.imageRight.map((item, index) => { return (<img src={item} key={index} style={{ width: '100%', verticalAlign: 'top' }} />) })
							}
						</div>

					</div>
				</div>
				<div className={styles.search}>
					<SearchBar />
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
					visible={this.state.popup}
					transparent
					maskClosable={false}
					onClose={() => this.setState({ popup: false })}
					wrapClassName={styles.popup_modal}>
					<div className={styles.modal_header}>
						<div className={styles.modal_header_img}>
							<img src={this.state.imgurl} />
						</div>
					</div>
					<div className={styles.modal_content}>
						<h2>面包炒蛋</h2>
						<p>找到并点击3张对应的图片</p>
						<Button onClick={() => this.setState({ popup: false })}>OK</Button>
					</div>
				</Modal>
			</div>
		)
	}
}

export default Index
