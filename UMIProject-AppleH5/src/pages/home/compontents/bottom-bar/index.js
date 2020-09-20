import React, { PureComponent } from 'react'
import styles from './index.css';
import { Progress } from 'antd';
import { PauseOutlined } from '@ant-design/icons';
/**
 * 底部行动栏
 */
export class Index extends PureComponent {
    render() {
        return (
            <div className={styles.bottom_bar}>
                <img src={require('assets/image/Ellipse.png')} />
                <div className={styles.bar_title}>
                    <h3>Toy parts</h3>
                    <p>15/100 hits</p>
                </div>
                <div className={styles.progress}>
                    <PauseOutlined className={styles.bar_icon} />
                    <Progress percent={15} type="circle" width={64} />
                </div>

            </div>
        )
    }
}

export default Index
