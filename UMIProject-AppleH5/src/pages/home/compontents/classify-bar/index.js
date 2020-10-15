import React, { PureComponent } from 'react';

import styles from './index.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/**
 * 分类栏
 */
export class Index extends PureComponent {
    state = {
        data: ['宿醉', '夜猫', '路游', '宿醉', '夜猫', '路游', "夜猫"],
        imgHeight: 70,
        imgurl: 'https://i.loli.net/2020/09/22/f5GV8zsLFdcD4xw.png'
    }
    settings = {
        // dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3.7,
        slidesToScroll: 2.5
    }
    render() {
        const { taskLabelData } = this.props
        return (
            <Slider {...this.settings} ref={el => this.swiperRef = el} afterChange={(index) => this.slider && this.slider.innerSlider.slickGoTo(index)}>
                {taskLabelData.map((val, index) => (
                    <div key={index} className={styles.carousel} onClick={() => this.classifyBarClickedHandler(val)}>
                        <div className={styles.carousel_img}>
                            <img src={require('assets/image/ellipse-tp.png')} />
                            <p>{val}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        )
    }

    classifyBarClickedHandler = (val) => {
        const { onClickClassifyBar } = this.props
        onClickClassifyBar(val)
    }
}

export default Index
