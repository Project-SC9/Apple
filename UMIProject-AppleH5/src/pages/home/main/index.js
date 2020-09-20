import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './index.css';
import SearchTop from '../compontents/search';
import BottomBar from '../compontents/bottom-bar';
import { Carousel } from 'antd-mobile';
/**
 * 首页
 */
class Index extends Component {
  state = {
    data: ['Colors', 'Colors', 'Colors', "Colors", "Colors", "Colors", "Colors"],
    imgHeight: 70,
  }
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.main_top}>
          <h1>Choose What</h1>
          <p>to Play today?</p>
        </div>
        {/** 搜索栏 */}
        <SearchTop />
        <div className={styles.main_content}>
          {/** 分类栏 */}
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

          {/**图片区 */}
          <div className={styles.waterfall_plot}>
            <div className={styles.waterfall_plot_left}>
              <img src={require('../../../assets/image/cards02.png')} />
              <img src={require('../../../assets/image/cards03.png')} />
              <img src={require('../../../assets/image/cards01.png')} />
              <img src={require('../../../assets/image/cards04.png')} />
              <img src={require('../../../assets/image/cards05.png')} />
            </div>
            <div className={styles.waterfall_plot_right}>
              <img src={require('../../../assets/image/cards05.png')} />
              <img src={require('../../../assets/image/cards04.png')} />
              <img src={require('../../../assets/image/cards02.png')} />
              <img src={require('../../../assets/image/cards03.png')} />
              <img src={require('../../../assets/image/cards01.png')} />
            </div>
          </div>
        </div>
        {/** 行动栏 */}
        <BottomBar />
      </div>
    )
  }

}

/**
 * state整棵状态树
*/
const mapStateToProps = (state) => {
  return {
    state
  };
}

export default connect(mapStateToProps)(Index);
