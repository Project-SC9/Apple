import React, { Component } from 'react'
import styles from './index.css';
import Link from 'umi/link'




const img1 = 'https://i.loli.net/2020/12/06/6SuWbDLUtsmgi7G.png'
const img2 = 'https://i.loli.net/2020/12/06/4R5DMSNnwPol7ep.png'
const img3 = 'https://i.loli.net/2020/12/06/ynBbTEhMk5ls37f.png'
const img4 = 'https://i.loli.net/2020/12/06/uhNcas4dnT6rEev.png'

const img5 = 'https://i.loli.net/2020/12/06/rItz3GmwViaZpyH.png'
const img6 = 'https://i.loli.net/2020/12/06/1zMA3PZ8VBKcvUd.png'
const img7 = 'https://i.loli.net/2020/12/06/uwlqW213745PnBR.png'

const img8 = 'https://i.loli.net/2020/12/06/25G4FQa3DtMX7jk.png'

const im10 = 'https://i.loli.net/2020/12/13/5sFjItQ1mrYRqUW.png'

const im11 = 'https://i.loli.net/2020/12/13/1Pv8Sz4JfRd7EnM.png'


export class index extends Component {
    state = {
        show: false,
        show1: false
    }
    render() {
        return (
            <div className={styles.t_npxweb}>
                <header>
                    <div className={styles.t_npxheader}>
                        <div className={styles.top_left}> <img src={require('assets/web/Componentx.png')} /></div>
                        <div className={styles.top_right}>
                            <p className={this.state.show == true ? styles.active : ''} onClick={() => this.setState({ show: !this.state.show, show1: false })}>关于我们</p>
                            <p className={this.state.show1 == true ? styles.active : ''} onClick={() => this.setState({ show1: !this.state.show1, show: false })}>联系我们</p>
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
                {

                    !!this.state.show1 ? (
                        <div className={styles.t_npxmain5} style={{ height: "79px" }}>
                            <div style={{ display: "flex", width: "74%", margin: 'auto', justifyContent: "space-around" }}>
                                <p> 非常感谢您，宝贵与真诚的建议！</p>
                                <p>smileonsmile2017@163.com </p>
                            </div>
                            <p className={styles.close} onClick={() => this.setState({ show1: false })}><img src={require('assets/web/close.svg')} /></p>
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
                                <h1> <img src={im10} width='100%' /></h1>
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
                                <Link to="/home/begin"><p>开始互动</p></Link>
                            </div>
                            <div className={styles.imga} >
                                <img src={img1} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.t_npxmain3}>
                        <div className={styles.content}>
                            <div className={styles.trophy} style={{ width: "122px" }}>
                                <img src={img8} style={{ width: "100%" }} /></div>

                            <div className={styles.title} >
                                <h1><img src={im11} width='100%' /></h1>
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
                                <div className={styles.imga}><img src={img7} /></div>
                            </div>
                            <div className={styles.cont}>
                                <h5>02</h5>
                                <h4>看图做任务</h4>
                                <p>咖啡店里找川菜？</p>
                                <p style={{
                                    width: "33%",
                                    margin: "auto",
                                    textLign: "left"
                                }}>酒店里找漫画？</p>
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


                    <div className={styles.left}>
                        Icons made by
                    <Link to="#" title="Freepik">Freepik </Link>
                    from
                    <Link to="#" title="Flaticon" onClick={() => window.location.href = "https://www.flaticon.com/"} > www.flaticon.com</Link>

                    </div>

                    <div className={styles.content} style={{ position: "absolute", right: "10%" }}>
                        <p>捷什网 Juuuce Up © 2020 &nbsp;&nbsp;&nbsp;&nbsp;珠海六个火科技有限公司</p>
                        <Link to="#" title="" onClick={() => window.location.href = "https://www.beian.miit.gov.cn/"} > <p>粤ICP备19147212号-2</p></Link>
                    </div>

                </footer>

            </div>
        )
    }
}

export default index
