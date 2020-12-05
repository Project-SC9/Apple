import React, { Component } from 'react'
import styles from './index.css';
import Link from 'umi/link'

const img1 = 'https://i.loli.net/2020/12/01/RBi4zhXNoulypDO.png'
const img2 = 'https://i.loli.net/2020/12/01/KXcYofsrIB9SZG8.png'
const img3 = 'https://i.loli.net/2020/12/01/X9sjFlKxgLTWYMP.png'
const img4 = 'https://i.loli.net/2020/12/05/6h2A9xOPpSa5fUL.png'

export class index extends Component {
    state = {
        show: false
    }
    render() {
        return (
            <div className={styles.t_npxweb}>
                <header>
                    <div className={styles.t_npxheader}>
                        <div className={styles.top_left}> <img src={require('assets/web/Componentx.png')} /></div>
                        <div className={styles.top_right}>
                            <p className={this.state.show == true ? styles.active : ''} onClick={() => this.setState({ show: !this.state.show })}>关于我们</p>
                            <p>联系我们</p>
                        </div></div>
                </header>

                {

                    !!this.state.show ? (
                        <div className={styles.t_npxmain5}>
                            <p style={{ marginBottom: "28px" }}>珠海六个火科技有限公司是由一群年轻的工程师，设计师，市场营销组成的科技初创团队。Juuuce up （捷什）是我们旗下一个早期成长中的人工智能产品，通过日常生活中的商品展示与用户互动，并鼓励用户去线下发掘商品和探店等等。
                    </p>
                            <p>
                                Juuuce up （捷什）在早期主要服务于年轻消费者，希望通过有趣的方式带动新消费体验，提高商家与消费者之间的直接互动从而改变目前较为乏味的线下消费体验。
                    </p>
                            <p className={styles.close} onClick={() => this.setState({ show: false })}><img src={require('assets/web/close.svg')} /></p>
                        </div>
                    ) : null
                }
                <main>
                    <div className={styles.t_npxmain1}>
                        <div className={styles.content}>
                            <div className={styles.img}>
                                <img src={img3} />
                            </div>
                            <div className={styles.title}>
                                <h1>发掘有趣的商品</h1>
                                <div className={styles.imga}><img src={require('assets/web/Frame 82.png')} /></div>
                                <h5>无聊有趣，由你来定</h5>
                            </div>
                        </div>
                    </div>
                    <div className={styles.t_npxmain2}>
                        <div className={styles.content}>
                            <div className={styles.img} >
                                <img src={img2} />
                            </div>
                            <div className={styles.title} >
                                <p>用户到店扫码，即刻体验</p>
                                <h6>不啰嗦，让你与商品直接互动</h6>
                                <Link to="/"><p>开始互动</p></Link>
                            </div>
                            <div className={styles.imga} >
                                <img src={img1} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.t_npxmain3}>
                        <div className={styles.content}>
                            <div className={styles.trophy}><img src={require('assets/web/trophy 3.png')} /></div>

                            <div className={styles.title} >
                                <h1>需要能量 Juuuce Up</h1>
                                <div className={styles.imga}><img src={require('assets/web/Frame 82.png')} /></div>
                                <h5>发掘亮点，点亮家家薪火</h5>
                            </div>
                        </div>
                        <div className={styles.frame}><img src={img4} /></div>
                    </div>
                    <div className={styles.t_npxmain4}>
                        <div className={styles.line}></div>
                        <div className={styles.content}>
                            <div className={styles.left}>
                                <h5>01</h5>
                                <h4> 咖啡店 酒店 游乐园 </h4>
                                <h4>  书店 买手店： </h4>
                                <p>扫码探店发掘平时miss的</p>
                                <div className={styles.imga}><img src={require('assets/web/Dayflow Standing.png')} /></div>
                            </div>
                            <div className={styles.cont}>
                                <h5>02</h5>
                                <h4>看图做任务</h4>
                                <p>咖啡店里找川菜？</p>
                                <p style={{ marginLeft: "-2px" }}>酒店里找漫画？</p>
                                <p>买手店里找咖啡？ </p>
                                <div className={styles.imga}><img src={require('assets/web/Task bar.png')} /></div>
                            </div>
                            <div className={styles.right}>
                                <h5>03</h5>
                                <h4> 完成任务</h4>
                                <p>送川菜小吃</p>
                                <p style={{ marginLeft: "-8px" }}>免费阅读漫画</p>
                                <p>送小杯咖啡</p>
                                <div className={styles.imga}><img src={require('assets/web/Frame 92.png')} /></div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>


                    <div className={styles.left}>
                        Icons made by
                    <Link to="#" title="Freepik">Freepik </Link>
                    from
                    <Link to="www.flaticon.com/" title="Flaticon">www.flaticon.com</Link>

                    </div>

                    <div className={styles.content}>
                        <p>Juuuce Up © 2020   珠海六个火科技有限公司</p>
                        <p>工信部备案号</p>
                        <p> 公安备案</p>
                    </div>

                </footer>

            </div>
        )
    }
}

export default index
