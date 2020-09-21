import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import styles from './index.css';

export class Index extends PureComponent {
    state = {
        data: ['Colors', 'Colors', 'Colors', "Colors", "Colors", "Colors", "Colors"],
        imgHeight: 70,
    }
    render() {
        return (
            <Carousel
                className={styles.space_carousel}
                cellSpacing={10}
                slideWidth='85px'
                autoplay={false}
                dots={false}
                infinite={false}
                selectedIndex={1}>
                {
                    this.state.data.map((val, index) => {
                        return (
                            <div className={styles.carousel} key={index}>
                                <div className={styles.carousel_img}>
                                    <img src={require('assets/image/robot.png')} />
                                </div>
                                <p>{val}</p>
                            </div>
                        )
                    })
                }
            </Carousel>
        )
    }
}

export default Index
