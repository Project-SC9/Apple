import React, { Component } from 'react'
import styles from './index.css';
import Link from 'umi/link'

const img1 = 'https://i.loli.net/2020/12/06/Kdrs9DO3JSHLWov.png'
const img2 = 'https://i.loli.net/2020/12/06/4R5DMSNnwPol7ep.png'
const img3 = 'https://i.loli.net/2020/12/06/ynBbTEhMk5ls37f.png'
const img4 = 'https://i.loli.net/2020/12/05/6h2A9xOPpSa5fUL.png'

const img5 = 'https://i.loli.net/2020/12/06/rItz3GmwViaZpyH.png'
const img6 = 'https://i.loli.net/2020/12/06/1zMA3PZ8VBKcvUd.png'
const img7 = 'https://i.loli.net/2020/12/06/uwlqW213745PnBR.png'

const img8 = 'https://i.loli.net/2020/12/06/25G4FQa3DtMX7jk.png'
export class index extends Component {
    render() {
        return (
            <div className={styles.web}>
                <header>
                    <div className={styles.header}>
                        <div className={styles.top_left}> <img src={require('assets/web/Componentx.png')} /></div>
                    </div>
                </header>
                <main>
                    <div className={styles.main1}>
                        <div className={styles.content}>
                            <div className={styles.title}>
                                <h1>发掘有趣的商品</h1>
                                <div className={styles.imga}><img src={require('assets/web/Frame 82.png')} /></div>
                                <h5>无聊有趣，由你来定</h5>
                            </div>
                            <div className={styles.img}>
                                <img src={img3} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.main2}>
                        <div className={styles.content}>
                            <div className={styles.img} >
                                <img src={img2} />
                            </div>
                            <div className={styles.title} >
                                <p>用户到店扫码</p>
                                <p>即刻体验</p>
                                <h6>不啰嗦，让你与商品直接互动</h6>
                                <Link to="/"><p>开始互动</p></Link>
                            </div>
                            <div className={styles.imga} >
                                <img src={require('../../assets/web/Dayflow Abstract 3.png')} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.main3}>
                        <div className={styles.content}>
                            <div className={styles.trophy} style={{ width: "1.5rem" }}>
                                <img src={img8} style={{ width: "100%" }} /></div>

                            <div className={styles.title} >
                                <h1>需要能量 </h1>
                                <h1>Juuuce Up </h1>
                                <div className={styles.imga}><img src={require('assets/web/Frame 82.png')} /></div>
                                <h5>发掘亮点，点亮家家薪火</h5>
                            </div>
                        </div>
                        <div className={styles.frame}><img src={img1} /></div>
                    </div>
                    <div className={styles.main4}>
                        <div className={styles.line}></div>
                        <div className={styles.content}>
                            <div className={styles.left}>
                                <h5>01</h5>
                                <div className={styles.title}>
                                    <h4> 咖啡店 酒店 游乐园 </h4>
                                    <h4>  书店 买手店： </h4>
                                    <p>扫码探店发掘平时miss的</p>
                                    <div className={styles.imga}><img src={img7} /></div>
                                </div>
                            </div>
                            <div className={styles.cont}>
                                <h5>02</h5>
                                <h4>看图做任务</h4>
                                <p>咖啡店里找川菜？</p>
                                <p>酒店里找漫画？</p>
                                <p>买手店里找咖啡？ </p>
                                <div className={styles.imga}><img src={img5} /></div>
                            </div>
                            <div className={styles.right}>
                                <h5>03</h5>
                                <h4> 完成任务</h4>
                                <p>送川菜小吃</p>
                                <p>免费阅读漫画</p>
                                <p>送小杯咖啡</p>
                                <div className={styles.imga}><img src={img6} /></div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>
                    <div className={styles.left} >
                        Icons made by
            <Link to="#" title="Freepik" > Freepik </Link >
                from
                <Link to="www.flaticon.com/" title="Flaticon" > www.flaticon.com</Link >

                    </div>
                    <p style={{ textAlign: "center", marginBottom: ".2rem" }}>Juuuce Up © 2020   珠海六个火科技有限公司</p>
                    <div className={styles.content}>
                        <p>工信部备案号</p>
                        <p> 公安备案</p>
                    </div>

                </footer>

            </div>
        )
    }
}

export default index



