import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import styles from './index.css';
/**
 * 分类栏
 */
export class Index extends PureComponent {
    state = {
        data: ['宿醉', '夜猫', '路游', '宿醉', '夜猫', '路游', "夜猫"],
        imgHeight: 70,
        imgurl: 'https://i.loli.net/2020/09/22/f5GV8zsLFdcD4xw.png'
    }
    render() {
        return (
            <Carousel
                className={styles.space_carousel}
                cellSpacing={10}
                slideWidth={0.25}
                autoplay={false}
                dots={false}
                infinite={false}
                selectedIndex={1}>
                {
                    this.state.data.map((val, index) => {
                        return (
                            <div className={styles.carousel} key={index}>
                                <div className={styles.carousel_img}>
                                    <img src={this.state.imgurl} />
                                    <p>{val}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
        )
    }
}

export default Index
