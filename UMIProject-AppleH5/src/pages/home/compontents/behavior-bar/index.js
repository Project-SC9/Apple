import React, { PureComponent } from 'react'
import styles from './index.css';
import { Progress } from 'antd';

/**
 * 底部行动栏
 */
export class Index extends PureComponent {
    render() {
        const { assignmentSuccsessIndex, assignmentSuccsessValue, behaviorImg } = this.props;
        return (
            <div className={styles.behavior_bar}>
                <div className={styles.bottom_bar}>
                    <div className={styles.bottom_bar_img}> <img src={behaviorImg} /></div>
                    <div className={styles.bar_title}>
                        <h3>面包炒蛋</h3>
                        <p>0{assignmentSuccsessValue}/0{assignmentSuccsessIndex} hits</p>
                    </div>
                    <div className={styles.progress}>
                        {
                            Math.round(assignmentSuccsessValue * 33.3) == 100 ?
                                (<img src={require('assets/image/trophy.png')} className={styles.bar_icon} />)
                                :
                                (<img src={require('assets/image/lightbulb.svg')} className={styles.bar_icon} />)
                        }

                        <Progress percent={Math.round(assignmentSuccsessValue * 33.3)} type="circle" />
                    </div>
                </div>

            </div>
        )
    }
}

export default Index
