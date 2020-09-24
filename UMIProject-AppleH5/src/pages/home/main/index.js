import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './index.css';
import { Button, Modal, Carousel as CarouselMobile } from 'antd-mobile';
import { Carousel } from 'antd';
/**
 * 首页
 */
class Index extends Component {
  state = {
    swiper: [
      {
        title: '拔草下一个',
        text: '人气美食',
        image: ['https://i.loli.net/2020/09/20/JCyk54i17WKxZMt.png', 'https://i.loli.net/2020/09/20/kj6Ga9QNnKO8XWA.png', 'https://i.loli.net/2020/09/20/GXtQrpUbkMEwsY8.png', 'https://i.loli.net/2020/09/20/JCyk54i17WKxZMt.png'],
      },
      {
        title: '发现当地',
        text: '特色美食',
        image: ['https://i.loli.net/2020/09/20/kj6Ga9QNnKO8XWA.png', 'https://i.loli.net/2020/09/20/owyeBOSnK8cAhiX.png', 'https://i.loli.net/2020/09/20/JCyk54i17WKxZMt.png', 'https://i.loli.net/2020/09/20/kj6Ga9QNnKO8XWA.png'],
      },
      {
        title: '还没想好',
        text: '要吃什么?',
        image: ['https://i.loli.net/2020/09/20/owyeBOSnK8cAhiX.png', 'https://i.loli.net/2020/09/20/kj6Ga9QNnKO8XWA.png', 'https://i.loli.net/2020/09/20/JCyk54i17WKxZMt.png', 'https://i.loli.net/2020/09/20/GXtQrpUbkMEwsY8.png'],
      },
      {
        title: '发现附近',
        text: '美食优惠',
        image: ['https://i.loli.net/2020/09/20/TFXPpQuWz7BIyAN.png', 'https://i.loli.net/2020/09/20/GXtQrpUbkMEwsY8.png', 'https://i.loli.net/2020/09/20/JCyk54i17WKxZMt.png', 'https://i.loli.net/2020/09/20/owyeBOSnK8cAhiX.png'],
      },
    ],
    slideIndex: 1,
    popup: true
  }
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.main_top}>
          <img src={require('assets/image/logo.png')} />
          <Link to='/home/game'><button className={styles.main_come_button}>开始游戏</button></Link>
        </div>

        <div className={styles.main_content}>
          {/**图片区 */}
          <Carousel className={styles.swiper} effect="fade" ref={el => (this.slider = el)}>
            {
              this.state.swiper.map((val, index) => {
                return (
                  <div className={styles.swiper_content} key={index}>
                    <p>{val.title}</p>
                    <h3 text={val.text}>{val.text}</h3>
                  </div>
                )
              })
            }
          </Carousel>

          <CarouselMobile
            className={styles.swiper_img}
            cellSpacing={10}
            slideWidth={0.5}
            afterChange={index => { this.setState({ slideIndex: index }); this.slider && this.slider.innerSlider.slickGoTo(index) }}>
            {
              this.state.swiper.map((val, index) => {
                return (
                  <div key={index} className={styles.swiper_content}>
                    {
                      val.image.map((item, index) => { return (<img src={item} key={index} style={{ width: '100%', verticalAlign: 'top' }} />) })
                    }
                  </div>
                )
              })
            }
          </CarouselMobile>
        </div>
        {
          !this.state.popup ? this.renderPopUpBoxPrompt() : null
        }
      </div>
    )
  }

  /**
   * 用户输入网址弹出框提示
   */
  renderPopUpBoxPrompt = () => {
    return (
      <div className={styles.popup}>
        <Modal
          visible={this.state.popup}
          transparent
          maskClosable={true}
          onClose={() => this.setState({ popup: false })}
          wrapClassName={styles.popup_modal}>
          <div className={styles.modal_header}>
            <img src={require('assets/image/logo.png')} />
            <p onClick={() => this.setState({ popup: false })}>x</p>
          </div>
          <div className={styles.modal_content}>
            <img src={require('assets/image/smartphone.png')} />
            <h2>扫描酒店内Juuuce二维码，玩游戏得奖励。</h2>
            <Button onClick={() => this.setState({ popup: false })}>我知道了</Button>
          </div>
        </Modal>
      </div>
    )
  }
  WrapTouchStartHandler = (e) => {
    // wrapProps = {{ onTouchStart: this.WrapTouchStartHandler }}
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  componentDidMount() {
    // console.log(this.props.location.query.total)
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
