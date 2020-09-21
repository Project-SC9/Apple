import React, { Component } from 'react';
import styles from './index.css';
import { Button, Carousel, Modal } from 'antd-mobile';
/**
 * 游戏内容页
 */
export class Index extends Component {
    state = { popup: true }
    render() {
        return (
            <div>
                {
                    this.state.popup ? this.renderTaskPopUp() : null
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
                    visible={this.state.popup}
                    transparent
                    maskClosable={false}
                    onClose={() => this.setState({ popup: false })}
                    wrapClassName={styles.popup_modal}>
                    <div className={styles.modal_header}>
                        <div className={styles.modal_header_img}><img src={require('assets/image/task.png')} /></div>
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
