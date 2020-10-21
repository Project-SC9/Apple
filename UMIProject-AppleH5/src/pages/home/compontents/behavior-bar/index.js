import React, { PureComponent } from 'react'
import styles from './index.css';
import './aminted.css';
import { Progress } from 'antd';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
/**
 * 底部行动栏
 */
export class Index extends PureComponent {
    render() {
        const { starImgCheck, taskBar } = this.props;
        // const starImgurl = starImgCheck[starImgCheck.length - 1]
        // console.log(starImgCheck)http://babistep.com/media_static/${starImgurl.url}
        // 
        const starImgCheckLength = parseInt(starImgCheck.length)
        return (
            <div className={styles.bottom_bar}>
                <div className={styles.bottom_bar_img}>
                    {starImgCheck == "" ?
                        (<img src={require('assets/image/screen_shot.png')} />)
                        : (
                            <SwitchTransition mode="out-in">
                                <CSSTransition
                                    in={true}
                                    timeout={500}//动画时长
                                    classNames={styles.fade}//动画名称
                                    unmountOnExit//动画完成后DOM被移除
                                    appear={true}
                                    key={true}>
                                    <img src={`https://juuuce.com/media_static/${starImgCheck[starImgCheckLength - 1].url}`} />
                                </CSSTransition>
                            </SwitchTransition>)}
                </div>
                <div className={styles.bar_title}>
                    <h3>{taskBar.name}</h3>
                    <p>0{starImgCheckLength}/0{taskBar.goal} hits</p>
                </div>
                <div className={styles.bar_right}>
                    <div className={styles.progress}>
                        {
                            Math.round((starImgCheckLength) * (100 / taskBar.goal)) == 100 ?
                                (<img src={require('assets/image/trophy.png')} className={styles.bar_icon} style={{ marginTop: "0.08rem" }} />)
                                :
                                (<img src={require('assets/image/lightbulb.svg')} className={styles.bar_icon} />)
                        }

                        <Progress strokeColor={{
                            '0%': '#854aef',
                            '100%': '#f2bafe',
                        }} percent={Math.round((starImgCheckLength) * (100 / taskBar.goal))} type="circle" />
                    </div>
                </div>

            </div>
        )
    }
}

export default Index
