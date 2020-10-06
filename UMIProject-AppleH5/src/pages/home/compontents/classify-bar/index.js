import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import styles from './index.css';
import ReactSwipes from 'react-swipes'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
/**
 * 分类栏
 */
export class Index extends PureComponent {
    state = {
        data: ['宿醉', '夜猫', '路游', '宿醉', '夜猫', '路游', "夜猫"],
        imgHeight: 70,
        imgurl: 'https://i.loli.net/2020/09/22/f5GV8zsLFdcD4xw.png'
    }
    opt = {
        distance: 175, // 每次移动的距离，卡片的真实宽度
        currentPoint: 0,// 初始位置，默认从0即第一个元素开始

        swTouchend: (ev) => {
            let data = {
                moved: ev.moved,
                originalPoint: ev.originalPoint,
                newPoint: ev.newPoint,
                cancelled: ev.cancelled
            }
            this.setState({
                curCard: ev.newPoint
            })
        }
    }
    render() {
        const { taskImgData: { labels } } = this.props
        return (

            <Swiper
                spaceBetween={0}
                slidesPerView={3.3}
                onSlideChange={(val) => this.slider && this.slider.innerSlider.slickGoTo(val.activeIndex)}
            >
                {labels.map((val, index) => (
                    <SwiperSlide key={index} className={styles.carousel}>
                        <div className={styles.carousel_img}>
                            <img src={require('assets/image/ellipse-tp.png')} />
                            <p>{val}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    }

    //          <div className={styles.viewport}>
    //     <div className={styles.flipsnap}>
    //         <ReactSwipes className={styles.card_slide} options={this.opt}>
    //             {this.state.data.map((val, index) => (
    //                 <div className={styles.carousel} key={index}>
    //                     <div className={styles.carousel_img}>
    //                         <img src={this.state.imgurl} />
    //                         <p>{val}</p>
    //                     </div>
    //                 </div>
    //             ))}
    //         </ReactSwipes>
    //     </div>
    // </div>
}

export default Index
